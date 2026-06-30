import React from 'react';
import { Task, CalEvent, Profile } from '../firebase/firestore';
import TimelineView from '../components/schedule/TimelineView';

interface ScheduleProps {
  tasks: Task[];
  calendarEvents: CalEvent[];
  profile: Profile | null;
  simulatedNowMs: number;
}

export function Schedule({
  tasks,
  calendarEvents,
  profile,
  simulatedNowMs
}: ScheduleProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-text-primary">Interactive 7-Day Timeline</h2>
        <p className="text-xs text-text-secondary">
          DeadlineZero schedules work blocks for active tasks around your Google Calendar commitments.
        </p>
      </div>

      <TimelineView
        tasks={tasks}
        calendarEvents={calendarEvents}
        profile={profile}
        simulatedNowMs={simulatedNowMs}
      />
    </div>
  );
}
export default Schedule;
