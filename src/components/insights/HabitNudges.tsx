import React from 'react';
import { Task } from '../../firebase/firestore';
import { detectHabitPatterns } from '../../engine/patterns';
import { Clock, Calendar, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';

interface HabitNudgesProps {
  tasks: Task[];
}

export function HabitNudges({ tasks }: HabitNudgesProps) {
  const nudges = detectHabitPatterns(tasks);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'clock':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'calendar':
        return <Calendar className="h-5 w-5 text-success" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-danger" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-warning" />;
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-secondary flex items-center space-x-1.5">
        <Lightbulb className="h-4 w-4 text-warning" />
        <span>Habit Pattern Nudges (AI Optimizer Insights)</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nudges.map((nudge) => (
          <div key={nudge.id} className="card-style bg-white flex items-start space-x-3 border-0.5">
            <div className="p-2 bg-surface-alt rounded-lg mt-0.5 flex-shrink-0">
              {getIcon(nudge.icon)}
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-text-primary block">
                {nudge.insight}
              </span>
              <p className="text-[11px] text-text-secondary leading-relaxed font-normal">
                {nudge.suggestion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HabitNudges;
