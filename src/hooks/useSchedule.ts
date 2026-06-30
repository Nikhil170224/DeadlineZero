import { useState, useEffect, useRef } from 'react';
import { Schedule, CalEvent, subscribeSchedule, saveSchedule as dbSaveSchedule, Task, Profile } from '../firebase/firestore';
import { isFirebaseConfigured } from '../firebase/config';
import { rebuildSchedule } from '../engine/scheduler';
import { saveTask } from '../firebase/firestore';

export function useSchedule(
  uid: string | null,
  tasks: Task[],
  profile: Profile | null
) {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // To support undo
  const lastScheduleSnapshot = useRef<{ [taskId: string]: any[] }>({});
  const [canUndo, setCanUndo] = useState<boolean>(false);

  useEffect(() => {
    if (!uid || !isFirebaseConfigured) {
      setSchedule(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeSchedule(uid, (data) => {
      setSchedule(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  const updateScheduleEvents = async (events: CalEvent[]) => {
    if (!uid) return;
    try {
      await dbSaveSchedule(uid, events);
    } catch (err: any) {
      console.error('Update schedule events error:', err);
      setError(err.message || 'Failed to update schedule events');
      throw err;
    }
  };

  const triggerRebuildSchedule = async (simulatedNowMs: number) => {
    if (!uid || !profile || !schedule) return;

    // 1. Snapshot all task scheduledBlocks
    const snapshot: { [taskId: string]: any[] } = {};
    tasks.forEach(t => {
      snapshot[t.id] = t.scheduledBlocks || [];
    });
    lastScheduleSnapshot.current = snapshot;
    setCanUndo(true);

    // 2. Compute new blocks
    const newBlocks = rebuildSchedule(tasks, schedule.calendarEvents || [], profile, simulatedNowMs);

    // 3. Group blocks by taskId
    const blocksByTask: { [taskId: string]: any[] } = {};
    tasks.forEach(t => {
      blocksByTask[t.id] = [];
    });
    newBlocks.forEach(b => {
      if (blocksByTask[b.taskId]) {
        blocksByTask[b.taskId].push({
          taskId: b.taskId,
          startTimestamp: b.startTimestamp,
          endTimestamp: b.endTimestamp,
          subtaskIndex: b.subtaskIndex
        });
      }
    });

    // 4. Update tasks in Firestore with new scheduledBlocks
    const activeTasks = tasks.filter(t => t.status === 'active' && t.completionPct < 100);
    for (const task of activeTasks) {
      const currentBlocks = task.scheduledBlocks || [];
      const calculatedBlocks = blocksByTask[task.id] || [];
      
      // Only write if blocks differ to avoid infinite loops
      const hasChanged = JSON.stringify(currentBlocks) !== JSON.stringify(calculatedBlocks);
      if (hasChanged) {
        await saveTask(uid, {
          ...task,
          scheduledBlocks: calculatedBlocks
        });
      }
    }
  };

  const undoScheduleChange = async () => {
    if (!uid || !canUndo) return;
    try {
      const snapshot = lastScheduleSnapshot.current;
      for (const taskId of Object.keys(snapshot)) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
          await saveTask(uid, {
            ...task,
            scheduledBlocks: snapshot[taskId]
          });
        }
      }
      setCanUndo(false);
    } catch (err: any) {
      console.error('Undo schedule change failed:', err);
      setError('Undo failed: ' + err.message);
    }
  };

  return {
    schedule,
    loading,
    error,
    updateScheduleEvents,
    triggerRebuildSchedule,
    undoScheduleChange,
    canUndo,
    setCanUndo
  };
}
