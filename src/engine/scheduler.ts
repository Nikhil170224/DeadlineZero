import { Task, CalEvent, Profile, ScheduledBlock } from '../firebase/firestore';

export function computePriorityScore(task: Task, nowMs: number): number {
  const minutesUntilDeadline = (task.deadlineTimestamp - nowMs) / 60000;

  let urgencyScore: number;
  if (minutesUntilDeadline <= 0) {
    urgencyScore = 999; // overdue always tops the queue
  } else if (minutesUntilDeadline < 1440) {
    urgencyScore = 1440 / minutesUntilDeadline;
  } else {
    urgencyScore = 1;
  }

  const importanceMap = { low: 1, medium: 2, high: 3 };
  let importanceScore = importanceMap[task.importanceSetByUser];
  if (!task.aiImportanceDismissed && task.importanceDetectedByAI) {
    importanceScore = Math.max(importanceScore, importanceMap[task.importanceDetectedByAI]);
  }

  const remainingScore = (100 - task.completionPct) / 100;

  return (urgencyScore * 0.5) + (importanceScore * 0.3) + (remainingScore * 0.2);
}

// Check if two intervals overlap
function overlaps(start1: number, end1: number, start2: number, end2: number): boolean {
  return start1 < end2 && start2 < end1;
}

// Walks forward in work-hours time until a contiguous gap is found
export function findNextFreeSlot(
  fromMs: number,
  durationMs: number,
  busy: { startTimestamp: number; endTimestamp: number }[],
  profile: Profile
): { startTimestamp: number; endTimestamp: number } | null {
  // If the duration is 0, return null or a quick slot
  if (durationMs <= 0) return null;

  let currentSearchStart = fromMs;
  const maxSearchDays = 30; // Don't search infinitely if schedule is full
  const workStartHour = profile.workStartHour;
  const workEndHour = profile.workEndHour;

  for (let dayOffset = 0; dayOffset < maxSearchDays; dayOffset++) {
    // Target date
    const targetDate = new Date(currentSearchStart + dayOffset * 24 * 3600000);
    
    // Set to workStartHour for that day
    const workStart = new Date(targetDate);
    workStart.setHours(workStartHour, 0, 0, 0);
    
    // Set to workEndHour for that day
    const workEnd = new Date(targetDate);
    workEnd.setHours(workEndHour, 0, 0, 0);

    let start = Math.max(currentSearchStart, workStart.getTime());
    let end = start + durationMs;

    // Search within this day's work hours
    while (end <= workEnd.getTime()) {
      // Check if [start, end] overlaps with any busy event
      const isOverlap = busy.some(b => overlaps(start, end, b.startTimestamp, b.endTimestamp));

      if (!isOverlap) {
        return { startTimestamp: start, endTimestamp: end };
      }

      // If overlap, step forward by 30 mins (1800000 ms)
      start += 30 * 60000;
      end = start + durationMs;
    }
  }

  // Fallback if no slot is found within work hours (allocate outside work hours starting now)
  return { startTimestamp: fromMs, endTimestamp: fromMs + durationMs };
}

export function rebuildSchedule(
  tasks: Task[],
  calendarEvents: CalEvent[],
  profile: Profile,
  nowMs: number
): ScheduledBlock[] {
  // 1. Sort active tasks by priorityScore descending
  const sorted = tasks
    .filter(t => t.status === 'active' && t.completionPct < 100)
    .map(t => ({
      ...t,
      priorityScore: computePriorityScore(t, nowMs)
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore);

  // 2. Build list of busy slots (calendar events)
  const busySlots: { startTimestamp: number; endTimestamp: number }[] = calendarEvents.map(e => ({
    startTimestamp: e.startTimestamp,
    endTimestamp: e.endTimestamp
  }));

  // 3. For each task in priority order
  const allBlocks: ScheduledBlock[] = [];
  for (const task of sorted) {
    // Estimated remaining time for task in milliseconds
    const remainingMs = ((100 - task.completionPct) / 100) * task.estimatedHours * 3600000;

    if (remainingMs <= 0) continue;

    // CRITICAL: urgencyScore > 1.5 (which is computed when deadline is close or priority is escalated)
    // or minutes until deadline < 60
    const minutesUntilDeadline = (task.deadlineTimestamp - nowMs) / 60000;
    const isCritical = task.priorityScore > 999 || minutesUntilDeadline < 60;

    // For critical tasks, we want to start allocating IMMEDIATELY (nowMs), overriding standard work slots if needed.
    // If not critical, search from nowMs but subject to workStart/workEnd hours.
    const startSearch = nowMs;
    
    const block = findNextFreeSlot(startSearch, remainingMs, busySlots, profile);

    if (block) {
      // Find the first incomplete subtask index to schedule
      const subtaskIndex = task.subtasks.findIndex(s => !s.done);
      allBlocks.push({
        taskId: task.id,
        startTimestamp: block.startTimestamp,
        endTimestamp: block.endTimestamp,
        subtaskIndex: subtaskIndex !== -1 ? subtaskIndex : 0
      });
      // Mark as busy for subsequent tasks
      busySlots.push(block);
    }
  }
  return allBlocks;
}
