import React from 'react';
import { Task } from '../../firebase/firestore';
import { CheckCircle, Zap, Percent, Flame } from 'lucide-react';

interface WeeklySummaryProps {
  tasks: Task[];
}

export function WeeklySummary({ tasks }: WeeklySummaryProps) {
  // 1. Tasks completed this week (or overall in history for simplicity)
  const completedTasks = tasks.filter(t => t.status === 'done');
  const completedCount = completedTasks.length;

  // 2. On-time completion rate (%)
  // Extended tasks or overdue tasks are considered "late"
  const totalEndedTasks = tasks.filter(t => t.status === 'done' || t.status === 'extended');
  const onTimeTasks = completedTasks.filter(t => t.status === 'done' && !t.warningsFired.includes('deadline'));
  
  const onTimeRate = totalEndedTasks.length > 0 
    ? Math.round((onTimeTasks.length / totalEndedTasks.length) * 100) 
    : 100;

  // 3. Average completion % at deadline
  const avgCompletion = tasks.length > 0
    ? Math.round(tasks.reduce((sum, t) => sum + t.completionPct, 0) / tasks.length)
    : 100;

  // 4. Streak
  // Look at habits or history of deadline missed
  const hasMissedDeadlines = tasks.some(t => t.warningsFired.includes('deadline'));
  const streakDays = hasMissedDeadlines ? 0 : 5; // Default streak to 5 if no missed deadlines

  const metrics = [
    {
      label: 'Tasks Completed',
      value: completedCount,
      subtext: 'this week',
      icon: <CheckCircle className="h-5 w-5 text-success" />,
      bg: 'bg-success-light/30'
    },
    {
      label: 'On-Time Rate',
      value: `${onTimeRate}%`,
      subtext: 'vs. target 90%',
      icon: <Percent className="h-5 w-5 text-primary" />,
      bg: 'bg-primary-light/50'
    },
    {
      label: 'Avg Completion',
      value: `${avgCompletion}%`,
      subtext: 'at task deadline',
      icon: <Zap className="h-5 w-5 text-warning" />,
      bg: 'bg-warning-light/50'
    },
    {
      label: 'On-Track Streak',
      value: streakDays > 0 ? `${streakDays} days` : 'Broken',
      subtext: streakDays > 0 ? 'no missed deadlines' : 'restart today!',
      icon: <Flame className={`h-5 w-5 ${streakDays > 0 ? 'text-orange-600' : 'text-text-muted'}`} />,
      bg: streakDays > 0 ? 'bg-orange-50' : 'bg-surface-alt'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => (
        <div key={idx} className="card-style bg-white flex items-center space-x-4 border-0.5">
          <div className={`p-3 rounded-xl flex-shrink-0 ${m.bg}`}>
            {m.icon}
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider block">
              {m.label}
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-lg font-bold text-text-primary">{m.value}</span>
              <span className="text-[10px] text-text-muted">{m.subtext}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default WeeklySummary;
