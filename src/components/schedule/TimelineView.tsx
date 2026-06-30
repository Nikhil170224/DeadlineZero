import React, { useState } from 'react';
import { Task, CalEvent, Profile } from '../../firebase/firestore';
import DayColumn from './DayColumn';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface TimelineViewProps {
  tasks: Task[];
  calendarEvents: CalEvent[];
  profile: Profile | null;
  simulatedNowMs: number;
}

export function TimelineView({
  tasks,
  calendarEvents,
  profile,
  simulatedNowMs
}: TimelineViewProps) {
  // We keep track of the start date of the visible week
  const [weekStartDate, setWeekStartDate] = useState<Date>(new Date(simulatedNowMs));

  // Shift start date by days
  const handleNavigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(weekStartDate);
    const delta = direction === 'prev' ? -7 : 7;
    newDate.setDate(weekStartDate.getDate() + delta);
    setWeekStartDate(newDate);
  };

  const handleGoToToday = () => {
    setWeekStartDate(new Date(simulatedNowMs));
  };

  // Generate 7 days starting from weekStartDate
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStartDate);
    day.setDate(weekStartDate.getDate() + i);
    days.push(day);
  }

  return (
    <div className="space-y-6">
      {/* Google Calendar Connected Banner */}
      <div className="bg-primary-light border border-primary/20 border-0.5 rounded-xl p-3 flex items-center space-x-2 text-primary">
        <Calendar className="h-4 w-4 flex-shrink-0" />
        <span className="text-xs font-semibold">
          Google Calendar connected (demo mode) — tap Settings to activate real sync
        </span>
      </div>

      {/* Week Navigator */}
      <div className="flex justify-between items-center bg-white border border-border border-0.5 p-3 rounded-xl shadow-sm">
        <button
          onClick={() => handleNavigateWeek('prev')}
          className="btn-secondary py-1 px-3 text-xs flex items-center space-x-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Prev week</span>
        </button>

        <button
          onClick={handleGoToToday}
          className="btn-secondary py-1 px-4 text-xs font-bold"
        >
          Today
        </button>

        <button
          onClick={() => handleNavigateWeek('next')}
          className="btn-secondary py-1 px-3 text-xs flex items-center space-x-1"
        >
          <span>Next week</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Days Stack */}
      <div className="space-y-4">
        {days.map((day, idx) => (
          <DayColumn
            key={idx}
            date={day}
            tasks={tasks}
            calendarEvents={calendarEvents}
            profile={profile}
            simulatedNowMs={simulatedNowMs}
          />
        ))}
      </div>
    </div>
  );
}
export default TimelineView;
