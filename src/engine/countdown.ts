import { Task } from '../firebase/firestore';

export interface CountdownTickResult {
  updatedTasks: { [taskId: string]: Partial<Task> };
  toastsToFire: { type: '24h' | '6h' | '1h'; task: Task }[];
  deadlineTask: Task | null;
}

export function tickTasks(
  tasks: Task[],
  simulatedNowMs: number
): CountdownTickResult {
  const updatedTasks: { [taskId: string]: Partial<Task> } = {};
  const toastsToFire: { type: '24h' | '6h' | '1h'; task: Task }[] = [];
  let deadlineTask: Task | null = null;

  for (const task of tasks) {
    if (task.status !== 'active' && task.status !== 'extended') continue;
    
    const minutesLeft = (task.deadlineTimestamp - simulatedNowMs) / 60000;
    const warnings = task.warningsFired || [];
    const newWarnings = [...warnings];
    let needsUpdate = false;
    let newStatus = task.status;

    // 1. 24h Warning
    if (minutesLeft <= 1440 && minutesLeft > 0 && !warnings.includes('24h')) {
      newWarnings.push('24h');
      toastsToFire.push({ type: '24h', task });
      needsUpdate = true;
    }

    // 2. 6h Warning
    if (minutesLeft <= 360 && minutesLeft > 0 && !warnings.includes('6h')) {
      newWarnings.push('6h');
      toastsToFire.push({ type: '6h', task });
      needsUpdate = true;
    }

    // 3. 1h Critical Warning
    if (minutesLeft <= 60 && minutesLeft > 0 && !warnings.includes('1h')) {
      newWarnings.push('1h');
      toastsToFire.push({ type: '1h', task });
      needsUpdate = true;
    }

    // 4. Deadline Reached (minutesLeft <= 0)
    if (minutesLeft <= 0 && !warnings.includes('deadline')) {
      newWarnings.push('deadline');
      deadlineTask = task;
      needsUpdate = true;
    }

    if (needsUpdate) {
      updatedTasks[task.id] = {
        warningsFired: newWarnings,
        status: newStatus
      };
    }
  }

  return {
    updatedTasks,
    toastsToFire,
    deadlineTask
  };
}
