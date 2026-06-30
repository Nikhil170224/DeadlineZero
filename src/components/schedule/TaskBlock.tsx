import React from 'react';

interface TaskBlockProps {
  title: string;
  subtaskName?: string;
  durationMs: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  isCurrentHour: boolean;
  startTimestamp: number;
  endTimestamp: number;
}

export function TaskBlock({
  title,
  subtaskName,
  durationMs,
  urgency,
  isCurrentHour,
  startTimestamp,
  endTimestamp
}: TaskBlockProps) {
  // Format hours and duration
  const start = new Date(startTimestamp);
  const end = new Date(endTimestamp);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const durationHours = durationMs / 3600000;
  const durationText = durationHours >= 1 
    ? `${durationHours.toFixed(1)} hrs` 
    : `${(durationHours * 60).toFixed(0)} mins`;

  // Color mappings based on urgency
  const colorMap = {
    low: 'bg-gray-50 border-gray-200 text-gray-700',
    medium: 'bg-primary-light border-primary/20 text-primary',
    high: 'bg-warning-light border-warning/20 text-warning',
    critical: 'bg-danger-light border-danger/20 text-danger'
  };

  const currentColors = colorMap[urgency] || colorMap.medium;

  return (
    <div
      className={`p-3 rounded-lg border border-0.5 text-xs flex flex-col justify-between transition-all duration-200 ${currentColors} ${
        isCurrentHour ? 'animate-pulse-border ring-2 ring-primary/20' : ''
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-1">
          <span className="font-bold truncate max-w-[140px]" title={title}>
            {title}
          </span>
          <span className="text-[9px] font-mono opacity-80 font-semibold">{durationText}</span>
        </div>
        
        {subtaskName && (
          <p className="text-[10px] opacity-90 truncate max-w-[170px]" title={subtaskName}>
            👉 {subtaskName}
          </p>
        )}
      </div>

      <div className="mt-2 text-[9px] font-mono opacity-70 flex justify-between">
        <span>{formatTime(start)} - {formatTime(end)}</span>
        {isCurrentHour && <span className="font-bold text-primary animate-pulse">● ACTIVE SLOT</span>}
      </div>
    </div>
  );
}
export default TaskBlock;
