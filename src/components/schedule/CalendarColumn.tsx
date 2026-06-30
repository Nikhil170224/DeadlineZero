import React from 'react';
import { CalEvent } from '../../firebase/firestore';

interface CalendarColumnProps {
  events: CalEvent[];
}

export function CalendarColumn({ events }: CalendarColumnProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const getDurationText = (start: number, end: number) => {
    const durationMins = (end - start) / 60000;
    if (durationMins >= 60) {
      return `${(durationMins / 60).toFixed(1)}h`;
    }
    return `${durationMins}m`;
  };

  return (
    <div className="space-y-3">
      {events.length === 0 ? (
        <div className="text-center py-6 text-xs text-text-muted bg-surface-alt rounded-lg border border-border border-dashed">
          No external meetings today.
        </div>
      ) : (
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-3 bg-surface-alt border border-border border-0.5 rounded-lg text-xs flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="font-semibold text-text-secondary truncate max-w-[130px]">
                  {event.title}
                </span>
                <span className="bg-gray-200/80 text-[9px] font-bold px-1.5 py-0.5 rounded text-text-secondary uppercase tracking-wider">
                  {event.source === 'google' ? 'Google' : 'Mock'}
                </span>
              </div>
              
              <div className="mt-2 flex justify-between text-[9px] font-mono text-text-muted">
                <span>{formatTime(event.startTimestamp)} - {formatTime(event.endTimestamp)}</span>
                <span>{getDurationText(event.startTimestamp, event.endTimestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default CalendarColumn;
