import React from 'react';
import { Goal } from '../../firebase/firestore';
import { Calendar } from 'lucide-react';

interface HabitTrackerProps {
  goals: Goal[];
}

export function HabitTracker({ goals }: HabitTrackerProps) {
  const habits = goals.filter(g => g.isHabit);

  // Generate last 84 days (12 weeks)
  const getHeatmapData = () => {
    const data: { date: Date; count: number }[] = [];
    const now = new Date();
    
    // Set to 83 days ago to render exactly 12 weeks
    for (let i = 83; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      
      // Count completions across all habits for this date
      let count = 0;
      habits.forEach(habit => {
        if (!habit.completedDates) return;
        const matches = habit.completedDates.some(timestamp => {
          const compDate = new Date(timestamp);
          return compDate.getDate() === d.getDate() &&
                 compDate.getMonth() === d.getMonth() &&
                 compDate.getFullYear() === d.getFullYear();
        });
        if (matches) count++;
      });

      data.push({ date: d, count });
    }
    return data;
  };

  const heatmapCells = getHeatmapData();

  // Color intensities
  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-gray-100 border-gray-200';
    if (count === 1) return 'bg-emerald-200 border-emerald-300';
    if (count === 2) return 'bg-emerald-400 border-emerald-500';
    return 'bg-emerald-700 border-emerald-800'; // 3+ completions
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="card-style bg-white border-0.5 space-y-4">
      <div className="flex items-center space-x-2 pb-2 border-b border-border border-0.5">
        <Calendar className="h-5 w-5 text-success" />
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-text-primary">Habit Streak Heatmap</h3>
          <p className="text-[11px] text-text-secondary">Tracking daily completions over the last 12 weeks.</p>
        </div>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-6 text-xs text-text-muted bg-surface-alt rounded-lg border border-border border-dashed">
          Create a habit and log completion today to fill this heatmap.
        </div>
      ) : (
        <div className="space-y-3">
          {/* Grid Container */}
          <div className="flex flex-wrap gap-1 justify-center max-w-lg mx-auto">
            {heatmapCells.map((cell, idx) => {
              const tooltip = `${formatDate(cell.date)}: ${cell.count} habit${cell.count !== 1 ? 's' : ''} completed`;
              return (
                <div
                  key={idx}
                  title={tooltip}
                  className={`h-4 w-4 rounded-sm border border-0.5 transition-all duration-200 hover:scale-125 cursor-help ${getColorClass(
                    cell.count
                  )}`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-2 text-[10px] text-text-secondary font-medium pt-1">
            <span>Less</span>
            <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded-sm" />
            <div className="w-3 h-3 bg-emerald-200 border border-emerald-300 rounded-sm" />
            <div className="w-3 h-3 bg-emerald-400 border border-emerald-500 rounded-sm" />
            <div className="w-3 h-3 bg-emerald-700 border border-emerald-800 rounded-sm" />
            <span>More</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default HabitTracker;
