import { useState, useEffect, useRef } from 'react';
import { Task, Profile } from '../firebase/firestore';
import { tickTasks } from '../engine/countdown';

export function useCountdown(
  uid: string | null,
  tasks: Task[],
  profile: Profile | null,
  saveTask: (task: Task) => Promise<void>,
  onWarningToast: (type: '24h' | '6h' | '1h', task: Task) => void,
  onDeadlineReached: (task: Task) => void,
  triggerRebuildSchedule: (simulatedNowMs: number) => Promise<void>
) {
  const [simulatedNowMs, setSimulatedNowMs] = useState<number>(Date.now());
  const prevDemoMode = useRef<boolean>(false);
  const timeOffset = useRef<number>(0); // Store fast-forward offset in ms

  // Calculate simulatedNowMs
  useEffect(() => {
    if (!profile) return;

    if (profile.demoMode) {
      // If we just enabled demoMode, reset offset
      if (!prevDemoMode.current) {
        timeOffset.current = 0;
        prevDemoMode.current = true;
      }
    } else {
      if (prevDemoMode.current) {
        timeOffset.current = 0;
        prevDemoMode.current = false;
      }
    }
  }, [profile]);

  // Clock tick interval (every 1000ms real time)
  useEffect(() => {
    const interval = setInterval(() => {
      let currentSimulated: number;

      if (profile && profile.demoMode) {
        // Increment by multiplier
        const step = 1000 * (profile.demoSpeedMultiplier || 1);
        setSimulatedNowMs(prev => {
          const next = prev + step;
          // Check task warnings for the new simulated time
          runTimeChecks(next);
          return next;
        });
      } else {
        // Sync with real clock + fast-forward offset
        currentSimulated = Date.now() + timeOffset.current;
        setSimulatedNowMs(currentSimulated);
        runTimeChecks(currentSimulated);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks, profile, uid]);

  // Run warning triggers
  const runTimeChecks = async (timeMs: number) => {
    if (!uid || tasks.length === 0) return;

    const result = tickTasks(tasks, timeMs);

    // 1. Process warnings to write to Firestore
    for (const taskId of Object.keys(result.updatedTasks)) {
      const task = tasks.find(t => t.id === taskId);
      const updates = result.updatedTasks[taskId];
      if (task) {
        const updatedTask = { ...task, ...updates } as Task;

        // If the task got escalated to priority 999 (1h mark), assign NOW slot
        const minutesLeft = (task.deadlineTimestamp - timeMs) / 60000;
        if (updates.warningsFired?.includes('1h') && !task.warningsFired.includes('1h')) {
          updatedTask.priorityScore = 999;
        }

        await saveTask(updatedTask);

        // Rerun scheduling engine at 6h and 1h thresholds
        if (
          (updates.warningsFired?.includes('6h') && !task.warningsFired.includes('6h')) ||
          (updates.warningsFired?.includes('1h') && !task.warningsFired.includes('1h'))
        ) {
          await triggerRebuildSchedule(timeMs);
        }
      }
    }

    // 2. Fire warning UI toasts
    result.toastsToFire.forEach(t => {
      onWarningToast(t.type, t.task);
    });

    // 3. Trigger deadline modal
    if (result.deadlineTask) {
      onDeadlineReached(result.deadlineTask);
    }
  };

  const fastForwardHours = (hours: number) => {
    const deltaMs = hours * 3600 * 1000;
    timeOffset.current += deltaMs;
    setSimulatedNowMs(prev => {
      const next = prev + deltaMs;
      runTimeChecks(next);
      return next;
    });
  };

  const triggerDeadlineNow = async () => {
    // Find the most urgent active task (closest deadline > now)
    const activeTasks = tasks.filter(t => t.status === 'active' || t.status === 'extended');
    if (activeTasks.length === 0) return;

    const mostUrgent = [...activeTasks].sort((a, b) => a.deadlineTimestamp - b.deadlineTimestamp)[0];
    
    // Set its deadline to simulatedNowMs - 1000ms (already passed)
    const updatedTask = {
      ...mostUrgent,
      deadlineTimestamp: simulatedNowMs - 1000
    };
    await saveTask(updatedTask);
  };

  return {
    simulatedNowMs,
    fastForwardHours,
    triggerDeadlineNow
  };
}
