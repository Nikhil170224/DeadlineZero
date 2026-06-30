import React from 'react';
import { Goal, Task } from '../../firebase/firestore';
import StreakBadge from './StreakBadge';
import { Target, Check, Calendar, RotateCcw } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  tasks: Task[];
  onLogCompletion: (goal: Goal) => void;
}

export function GoalCard({ goal, tasks, onLogCompletion }: GoalCardProps) {
  // 1. Calculate stats
  const linkedTasks = tasks.filter(t => t.goalId === goal.id);
  const totalTasks = linkedTasks.length;

  let completionPct = 0;
  if (goal.isHabit) {
    // Habit completion = e.g., current streak out of a 7-day target (or percentage of completions)
    completionPct = Math.min(Math.round((goal.currentStreak / 7) * 100), 100);
  } else {
    // Goal completion = average completion % of linked tasks
    if (totalTasks > 0) {
      const sum = linkedTasks.reduce((acc, t) => acc + t.completionPct, 0);
      completionPct = Math.round(sum / totalTasks);
    }
  }

  // Formatting date
  const targetDateString = new Date(goal.targetDate).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // SVG Progress Ring calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPct / 100) * circumference;

  // Hex color default
  const color = goal.color || '#185FA5';

  const isTodayCompleted = () => {
    if (!goal.completedDates || goal.completedDates.length === 0) return false;
    const lastCompleted = new Date(goal.completedDates[goal.completedDates.length - 1]);
    const today = new Date();
    return lastCompleted.getDate() === today.getDate() &&
           lastCompleted.getMonth() === today.getMonth() &&
           lastCompleted.getFullYear() === today.getFullYear();
  };

  const completedToday = isTodayCompleted();

  return (
    <div
      style={{ borderLeftColor: color, borderLeftWidth: '5px' }}
      className="card-style bg-white border border-border border-0.5 flex flex-col justify-between hover:shadow-sm transition-all duration-200 gap-4"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center space-x-1.5">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: color }}
            >
              {goal.isHabit ? 'Habit' : 'Milestone'}
            </span>
            {goal.isHabit && (
              <span className="text-[10px] text-text-secondary bg-surface-alt border border-border border-0.5 px-2 py-0.5 rounded-full font-semibold capitalize">
                {goal.habitFrequency}
              </span>
            )}
          </div>
          
          <h3 className="text-sm font-bold text-text-primary mt-1 line-clamp-1">{goal.title}</h3>
          
          <div className="flex items-center space-x-1 text-[11px] text-text-secondary">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span>Target: {targetDateString}</span>
          </div>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative flex items-center justify-center flex-shrink-0 h-12 w-12">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle
              className="text-surface-alt"
              strokeWidth="3"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="24"
              cy="24"
            />
            <circle
              style={{ stroke: color }}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="24"
              cy="24"
              className="transition-all duration-300"
            />
          </svg>
          <span className="absolute text-[10px] font-mono font-bold text-text-primary">
            {completionPct}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {/* Linked tasks count */}
        {!goal.isHabit && (
          <div className="text-xs text-text-secondary font-medium">
            🎯 {totalTasks} linked tasks ({linkedTasks.filter(t => t.status === 'done').length} complete)
          </div>
        )}

        {/* Habit Streaks details */}
        {goal.isHabit && (
          <div className="flex items-center justify-between">
            <StreakBadge currentStreak={goal.currentStreak} longestStreak={goal.longestStreak} compact />
            
            <button
              type="button"
              disabled={completedToday}
              onClick={() => onLogCompletion(goal)}
              className={`text-[10px] font-bold px-2.5 py-1.5 rounded-md flex items-center space-x-1 cursor-pointer transition-colors ${
                completedToday
                  ? 'bg-success-light border border-success/30 border-0.5 text-success'
                  : 'bg-white border border-border border-0.5 text-text-primary hover:bg-surface-alt'
              }`}
            >
              {completedToday ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>Logged Today</span>
                </>
              ) : (
                <span>Log Completion</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default GoalCard;
