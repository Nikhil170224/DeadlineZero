import React from 'react';
import { Profile, Task } from '../../firebase/firestore';
import { AlertCircle } from 'lucide-react';

interface GreetingCardProps {
  profile: Profile | null;
  tasks: Task[];
  simulatedNowMs: number;
}

export function GreetingCard({ profile, tasks, simulatedNowMs }: GreetingCardProps) {
  // Compute greeting based on simulated time
  const time = new Date(simulatedNowMs);
  const hour = time.getHours();
  let greetingText = 'Good evening';
  if (hour >= 5 && hour < 12) greetingText = 'Good morning';
  else if (hour >= 12 && hour < 17) greetingText = 'Good afternoon';

  const name = profile?.name || '';
  const greeting = name ? `${greetingText}, ${name}` : `${greetingText}`;

  // Date format e.g. "Sunday, 29 June 2025"
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  const dateString = time.toLocaleDateString('en-US', options);

  // Overall progress bar: X of Y tasks completed / on track today
  // Let's filter tasks that are scheduled/due today or active today
  const activeTasks = tasks.filter(t => t.status !== 'done');
  const doneTasks = tasks.filter(t => t.status === 'done');
  const totalCount = tasks.length;
  const completedCount = doneTasks.length;

  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="w-full space-y-4">
      {/* Demo Mode Banner */}
      {profile?.demoMode && (
        <div className="bg-amber-50 border border-warning/20 border-0.5 rounded-xl p-3 flex items-center space-x-3 text-warning">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-xs font-semibold">
            Demo mode active — time running at {profile.demoSpeedMultiplier}x speed (Simulated: {time.toLocaleTimeString()})
          </span>
        </div>
      )}

      {/* Greeting Card UI */}
      <div className="card-style flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-text-primary">{greeting}</h1>
          <p className="text-xs text-text-secondary">{dateString}</p>
        </div>

        {/* Progress bar */}
        <div className="flex-1 max-w-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-text-secondary">Progress track today</span>
            <span className="text-success">{completedCount} of {totalCount} tasks completed</span>
          </div>
          <div className="w-full bg-surface-alt rounded-full h-2 overflow-hidden border border-border border-0.5">
            <div
              className="bg-success h-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default GreetingCard;
