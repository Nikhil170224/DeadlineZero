import React from 'react';
import { Profile, Task, Goal } from '../firebase/firestore';
import GreetingCard from '../components/dashboard/GreetingCard';
import UrgencyStrip from '../components/dashboard/UrgencyStrip';
import TaskList from '../components/dashboard/TaskList';

interface DashboardProps {
  tasks: Task[];
  goals: Goal[];
  profile: Profile | null;
  simulatedNowMs: number;
  onCheckIn: (task: Task) => void;
  onToggleDone: (task: Task) => void;
  onAddTaskClick: () => void;
}

export function Dashboard({
  tasks,
  goals,
  profile,
  simulatedNowMs,
  onCheckIn,
  onToggleDone,
  onAddTaskClick
}: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* 1. Greeting Card */}
      <GreetingCard
        profile={profile}
        tasks={tasks}
        simulatedNowMs={simulatedNowMs}
      />

      {/* 2. Urgency Strip (for tasks due in under 24h) */}
      <UrgencyStrip
        tasks={tasks}
        simulatedNowMs={simulatedNowMs}
        onCheckIn={onCheckIn}
      />

      {/* 3. Main Queue Tasks List */}
      <TaskList
        tasks={tasks}
        goals={goals}
        simulatedNowMs={simulatedNowMs}
        onCheckIn={onCheckIn}
        onToggleDone={onToggleDone}
        onAddTaskClick={onAddTaskClick}
      />
    </div>
  );
}
export default Dashboard;
