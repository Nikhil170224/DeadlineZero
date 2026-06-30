import { Task } from '../firebase/firestore';

export interface HabitNudge {
  id: string;
  icon: 'calendar' | 'clock' | 'alert' | 'check';
  insight: string;
  suggestion: string;
}

export function detectHabitPatterns(tasks: Task[]): HabitNudge[] {
  const nudges: HabitNudge[] = [];

  // If there are very few tasks, provide default helpful startup nudges
  if (tasks.length === 0) {
    return [
      {
        id: 'nudge-morning',
        icon: 'clock',
        insight: "Morning planning is a highly effective habit.",
        suggestion: "Log in before 10:00 AM to review your scheduled slots."
      },
      {
        id: 'nudge-split',
        icon: 'check',
        insight: "Large tasks lead to procrastination.",
        suggestion: "Try breaking down goals into 30-minute subtasks."
      }
    ];
  }

  // 1. Blocked day detection
  const blockedDaysCount: { [key: number]: number } = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  let hasBlocked = false;
  tasks.forEach(t => {
    if (t.status === 'blocked') {
      hasBlocked = true;
      const date = new Date(t.createdAt);
      blockedDaysCount[date.getDay()]++;
    }
  });

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let maxBlockedDay = 1; // Default to Monday
  let maxBlockedCount = 0;
  for (let d = 0; d < 7; d++) {
    if (blockedDaysCount[d] > maxBlockedCount) {
      maxBlockedCount = blockedDaysCount[d];
      maxBlockedDay = d;
    }
  }

  if (hasBlocked && maxBlockedCount > 0) {
    nudges.push({
      id: 'nudge-blocked-day',
      icon: 'alert',
      insight: `You experience the most task blockers on ${dayNames[maxBlockedDay]}s.`,
      suggestion: "Schedule alignment and check-ins with your team a day before to prevent blockers."
    });
  }

  // 2. Best completion time of day (Mocked logic based on tasks created/completed timestamps)
  // Let's assume morning tasks (created/scheduled in morning) have higher completion rates
  const doneTasks = tasks.filter(t => t.completionPct === 100);
  const morningDone = doneTasks.filter(t => {
    const hour = new Date(t.createdAt).getHours();
    return hour < 12;
  }).length;

  const pct = doneTasks.length > 0 ? Math.round((morningDone / doneTasks.length) * 100) : 75;
  
  nudges.push({
    id: 'nudge-completion-time',
    icon: 'clock',
    insight: `You complete ${pct > 0 ? pct : 80}% of tasks started before 12 PM.`,
    suggestion: "Try scheduling high-priority or complex work in your morning slots."
  });

  // 3. Task types most missed or extended
  const extendedTasks = tasks.filter(t => t.status === 'extended');
  if (extendedTasks.length > 0) {
    nudges.push({
      id: 'nudge-extended-tasks',
      icon: 'calendar',
      insight: `You extended ${extendedTasks.length} deadlines recently.`,
      suggestion: "Increase your initial time estimations by 20% on complex tasks."
    });
  } else {
    nudges.push({
      id: 'nudge-streak',
      icon: 'check',
      insight: "You have kept all deadlines on track this week!",
      suggestion: "Keep up the momentum by planning your next week's goal links today."
    });
  }

  return nudges;
}
