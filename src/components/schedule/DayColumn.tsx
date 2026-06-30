import React from 'react';
import { Task, CalEvent, Profile } from '../../firebase/firestore';
import TaskBlock from './TaskBlock';
import CalendarColumn from './CalendarColumn';
import { Calendar, Briefcase } from 'lucide-react';

interface DayColumnProps {
  date: Date;
  tasks: Task[];
  calendarEvents: CalEvent[];
  profile: Profile | null;
  simulatedNowMs: number;
}

export function DayColumn({
  date,
  tasks,
  calendarEvents,
  profile,
  simulatedNowMs
}: DayColumnProps) {
  
  const isSameDay = (t1: number, t2: Date) => {
    const d1 = new Date(t1);
    return d1.getDate() === t2.getDate() &&
           d1.getMonth() === t2.getMonth() &&
           d1.getFullYear() === t2.getFullYear();
  };

  // 1. Filter calendar events for this day
  const dailyEvents = calendarEvents
    .filter(e => isSameDay(e.startTimestamp, date))
    .sort((a, b) => a.startTimestamp - b.startTimestamp);

  // 2. Filter tasks scheduled blocks for this day
  const dailyBlocks: {
    block: any;
    task: Task;
  }[] = [];

  tasks.forEach(task => {
    if (task.status === 'done' || !task.scheduledBlocks) return;
    task.scheduledBlocks.forEach(b => {
      if (isSameDay(b.startTimestamp, date)) {
        dailyBlocks.push({ block: b, task });
      }
    });
  });

  // Sort daily blocks by start time
  const sortedBlocks = dailyBlocks.sort((a, b) => a.block.startTimestamp - b.block.startTimestamp);

  const getUrgency = (task: Task) => {
    const msLeft = task.deadlineTimestamp - simulatedNowMs;
    const minsLeft = msLeft / 60000;
    if (msLeft <= 0) return 'critical' as const; // Overdue
    if (minsLeft <= 60) return 'critical' as const;
    if (minsLeft <= 360) return 'high' as const;
    if (task.importanceSetByUser === 'high') return 'high' as const;
    if (task.importanceSetByUser === 'medium') return 'medium' as const;
    return 'low' as const;
  };

  const isCurrentHourBlock = (start: number, end: number) => {
    return simulatedNowMs >= start && simulatedNowMs < end;
  };

  // Day Name formatting e.g. "Monday, Jun 29"
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const isToday = isSameDay(Date.now(), date);

  return (
    <div className="border border-border border-0.5 rounded-2xl bg-white p-5 space-y-4">
      {/* Sticky date header */}
      <div className="sticky top-[64px] bg-white pt-1 pb-2 border-b border-border border-0.5 flex justify-between items-center z-10">
        <h3 className="text-sm font-bold text-text-primary flex items-center space-x-2">
          <span>{dayName}</span>
          <span className="text-xs text-text-secondary font-medium bg-surface-alt px-2 py-0.5 rounded-full">
            {dayDate}
          </span>
        </h3>
        {isToday && (
          <span className="bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
            Today
          </span>
        )}
      </div>

      {/* Side-by-Side columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Tasks */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-text-secondary flex items-center space-x-1.5 pb-1 border-b border-border border-0.5 border-dashed">
            <Briefcase className="h-3.5 w-3.5 text-primary" />
            <span>Scheduled Work Blocks</span>
          </h4>

          {sortedBlocks.length === 0 ? (
            <div className="text-center py-8 text-xs text-text-muted bg-surface-alt rounded-lg border border-border border-dashed">
              No tasks scheduled today.
            </div>
          ) : (
            <div className="space-y-2">
              {sortedBlocks.map(({ block, task }) => {
                const subtask = task.subtasks && task.subtasks[block.subtaskIndex];
                return (
                  <TaskBlock
                    key={`${task.id}-${block.startTimestamp}`}
                    title={task.title}
                    subtaskName={subtask ? subtask.name : undefined}
                    durationMs={block.endTimestamp - block.startTimestamp}
                    urgency={getUrgency(task)}
                    isCurrentHour={isCurrentHourBlock(block.startTimestamp, block.endTimestamp)}
                    startTimestamp={block.startTimestamp}
                    endTimestamp={block.endTimestamp}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Google Calendar events */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-text-secondary flex items-center space-x-1.5 pb-1 border-b border-border border-0.5 border-dashed">
            <Calendar className="h-3.5 w-3.5 text-text-muted" />
            <span>Google Calendar Sync</span>
          </h4>

          <CalendarColumn events={dailyEvents} />
        </div>
      </div>
    </div>
  );
}
export default DayColumn;
