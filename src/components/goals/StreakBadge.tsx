import React from 'react';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  currentStreak: number;
  longestStreak: number;
  compact?: boolean;
}

export function StreakBadge({ currentStreak, longestStreak, compact = false }: StreakBadgeProps) {
  if (compact) {
    return (
      <div className="flex items-center space-x-1 text-xs font-semibold text-orange-600">
        <Flame className="h-4 w-4 fill-current text-orange-500 animate-pulse" />
        <span>{currentStreak}d streak</span>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 border border-orange-200 border-0.5 rounded-lg px-3 py-1.5 flex items-center space-x-2 text-xs">
      <Flame className="h-5 w-5 fill-current text-orange-500 animate-pulse flex-shrink-0" />
      <div className="flex flex-col">
        <span className="font-bold text-orange-700">Streak: {currentStreak} days</span>
        <span className="text-[10px] text-text-secondary font-medium">Personal Best: {longestStreak} days</span>
      </div>
    </div>
  );
}
export default StreakBadge;
