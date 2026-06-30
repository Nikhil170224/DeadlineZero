import React from 'react';
import { Task } from '../firebase/firestore';
import WeeklySummary from '../components/insights/WeeklySummary';
import AIReview from '../components/insights/AIReview';
import HabitNudges from '../components/insights/HabitNudges';
import HistoryTable from '../components/insights/HistoryTable';

interface InsightsProps {
  tasks: Task[];
}

export function Insights({ tasks }: InsightsProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-text-primary">Performance Analytics & Insights</h2>
        <p className="text-xs text-text-secondary">
          DeadlineZero scans your deadline compliance and generates AI recommendations to help you optimize work habits.
        </p>
      </div>

      {/* 1. Weekly summary metric cards */}
      <WeeklySummary tasks={tasks} />

      {/* 2. Gemini weekly performance audit */}
      <AIReview tasks={tasks} />

      {/* 3. Habit optimizer patterns */}
      <HabitNudges tasks={tasks} />

      {/* 4. Task history log table */}
      <HistoryTable tasks={tasks} />
    </div>
  );
}
export default Insights;
