import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, Subtask } from '../../firebase/firestore';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Star, Target } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  simulatedNowMs: number;
  onCheckIn: (task: Task) => void;
  onToggleDone: (task: Task) => void;
  onAcceptAISuggestion?: (task: Task) => void;
  onDismissAISuggestion?: (task: Task) => void;
  goalName?: string;
  goalColor?: string;
}

export function TaskCard({
  task,
  simulatedNowMs,
  onCheckIn,
  onToggleDone,
  onAcceptAISuggestion,
  onDismissAISuggestion,
  goalName,
  goalColor
}: TaskCardProps) {
  const [showAiTooltip, setShowAiTooltip] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  // Importance values and styling
  const importanceMap = {
    low: { label: 'Low', class: 'bg-gray-100 text-gray-600 border-gray-200' },
    medium: { label: 'Medium', class: 'bg-primary-light text-primary border-primary/20' },
    high: { label: 'High', class: 'bg-warning-light text-warning border-warning/20' }
  };

  const currentImportance = importanceMap[task.importanceSetByUser] || importanceMap.medium;

  // AI Detected higher importance chip check
  // Show chip if: AI detected higher importance, user settings is lower than AI suggestions, and not dismissed
  const showAiChip =
    !task.aiImportanceDismissed &&
    task.importanceDetectedByAI &&
    (task.importanceDetectedByAI === 'high' && task.importanceSetByUser !== 'high' ||
     task.importanceDetectedByAI === 'medium' && task.importanceSetByUser === 'low');

  // Smart Deadline Formatting
  const getSmartDeadlineText = () => {
    const msLeft = task.deadlineTimestamp - simulatedNowMs;
    const minutesLeft = msLeft / 60000;

    if (minutesLeft <= 0) {
      const hoursOverdue = Math.floor(Math.abs(minutesLeft) / 60);
      if (hoursOverdue < 1) {
        return `Overdue by ${Math.floor(Math.abs(minutesLeft))}m`;
      }
      return `Overdue by ${hoursOverdue}h`;
    }

    if (minutesLeft < 60) {
      return `Due in ${Math.round(minutesLeft)}m`;
    }

    if (minutesLeft < 1440) {
      const hrs = Math.floor(minutesLeft / 60);
      const mins = Math.round(minutesLeft % 60);
      return `Due in ${hrs}h ${mins}m`;
    }

    const deadlineDate = new Date(task.deadlineTimestamp);
    const today = new Date(simulatedNowMs);
    const tomorrow = new Date(simulatedNowMs + 24 * 3600000);

    const isTomorrow =
      deadlineDate.getDate() === tomorrow.getDate() &&
      deadlineDate.getMonth() === tomorrow.getMonth() &&
      deadlineDate.getFullYear() === tomorrow.getFullYear();

    const formatTime = (date: Date) => {
      const hours = date.getHours();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const displayHours = hours % 12 || 12;
      return `${displayHours}${ampm}`;
    };

    if (isTomorrow) {
      return `Due tomorrow ${formatTime(deadlineDate)}`;
    }

    // Format week day and hour e.g. "Due Friday 5pm"
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `Due ${days[deadlineDate.getDay()]} ${formatTime(deadlineDate)}`;
  };

  // Completion Percentage Colors
  const getPctColor = (pct: number) => {
    if (pct >= 70) return 'text-success';
    if (pct >= 30) return 'text-warning';
    return 'text-danger';
  };

  // Subtask progress
  const doneSubtasks = (task.subtasks || []).filter(s => s.done).length;
  const totalSubtasks = (task.subtasks || []).length;
  const subtasksPct = totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className={`card-style flex flex-col justify-between hover:shadow-sm transition-all duration-200 border-0.5 ${
        task.status === 'blocked' ? 'bg-red-50/20 border-danger/30' : ''
      }`}
    >
      <div className="space-y-3">
        {/* Top row: title & importance pill */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-[15px] font-bold text-text-primary leading-tight">
                {task.title}
              </h3>
              {task.status === 'blocked' && (
                <span className="bg-danger/10 text-danger text-[10px] font-semibold px-2 py-0.5 rounded-full border border-danger/20">
                  Blocked
                </span>
              )}
            </div>
            {/* Goal link indicator */}
            {goalName && (
              <div className="flex items-center space-x-1.5 text-xs text-text-secondary">
                <Target className="h-3 w-3" style={{ color: goalColor || '#185FA5' }} />
                <span className="font-medium truncate max-w-[150px]">{goalName}</span>
              </div>
            )}
          </div>
          <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border flex-shrink-0 ${currentImportance.class}`}>
            {currentImportance.label}
          </span>
        </div>

        {/* AI Suggestion Alert Chip */}
        {showAiChip && (
          <div className="relative">
            <button
              onClick={() => setShowAiTooltip(!showAiTooltip)}
              className="w-full text-left bg-primary-light/50 border border-primary/20 border-0.5 hover:bg-primary-light rounded-lg p-2.5 flex items-center justify-between text-xs text-primary font-medium transition-colors cursor-pointer"
            >
              <span className="flex items-center space-x-1.5">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>AI suggests: {importanceMap[task.importanceDetectedByAI!].label} — tap to see why</span>
              </span>
              {showAiTooltip ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showAiTooltip && (
              <div className="mt-1 bg-white border border-primary/20 border-0.5 rounded-lg p-3 shadow-md z-10 space-y-2 text-xs absolute left-0 right-0">
                <p className="text-text-secondary leading-relaxed font-normal">
                  {task.aiImportanceReason || 'Gemini suggests higher urgency and workload priorities.'}
                </p>
                <div className="flex justify-end space-x-2 pt-1.5 border-t border-border border-0.5">
                  <button
                    onClick={() => {
                      if (onDismissAISuggestion) onDismissAISuggestion(task);
                      setShowAiTooltip(false);
                    }}
                    className="px-2 py-1 rounded border border-border text-text-secondary hover:bg-surface-alt font-medium cursor-pointer"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => {
                      if (onAcceptAISuggestion) onAcceptAISuggestion(task);
                      setShowAiTooltip(false);
                    }}
                    className="px-2 py-1 rounded bg-primary text-white hover:bg-primary-dark font-medium cursor-pointer"
                  >
                    Accept
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Middle row: smart deadline + subtask metrics */}
        <div className="flex justify-between items-center text-xs font-medium text-text-secondary">
          <span className="text-text-primary font-semibold">{getSmartDeadlineText()}</span>
          {totalSubtasks > 0 && (
            <span>{doneSubtasks} of {totalSubtasks} subtasks done</span>
          )}
        </div>

        {/* Subtask mini-progress bar */}
        {totalSubtasks > 0 && (
          <div className="w-full bg-surface-alt rounded-full h-1 overflow-hidden border border-border border-0.5">
            <div
              className="bg-primary h-full transition-all duration-200"
              style={{ width: `${subtasksPct}%` }}
            />
          </div>
        )}

        {/* Large completion % and expand button */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-text-muted">Completion</span>
            <span className={`text-base font-bold ${getPctColor(task.completionPct)}`}>
              {task.completionPct}%
            </span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-text-muted hover:text-text-primary flex items-center space-x-0.5 cursor-pointer"
          >
            <span>{expanded ? 'Less' : 'More'}</span>
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>

        {/* Description & subtasks detail list (collapsed by default) */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-2.5 pt-2 border-t border-border border-0.5 text-xs text-text-secondary"
            >
              {task.description && (
                <div className="space-y-1">
                  <span className="font-semibold text-text-primary">Description</span>
                  <p className="leading-relaxed bg-surface-alt p-2 rounded-lg border border-border border-0.5">
                    {task.description}
                  </p>
                </div>
              )}

              {totalSubtasks > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold text-text-primary">Subtasks Checklist</span>
                  <div className="space-y-1 bg-surface-alt p-2 rounded-lg border border-border border-0.5">
                    {task.subtasks.map((s) => (
                      <div key={s.id} className="flex items-center space-x-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            s.done ? 'bg-success' : 'bg-border'
                          }`}
                        />
                        <span className={s.done ? 'line-through text-text-muted font-normal' : 'font-medium text-text-secondary'}>
                          {s.name} ({s.estimatedMinutes}m)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action row button tools */}
      <div className="mt-4 pt-3 border-t border-border border-0.5 flex justify-between gap-2">
        <button
          onClick={() => onCheckIn(task)}
          className="flex-1 btn-secondary text-xs py-1.5 h-8 flex items-center justify-center space-x-1"
        >
          <span>Check In</span>
        </button>

        <button
          onClick={() => onToggleDone(task)}
          className={`flex-1 text-xs py-1.5 h-8 flex items-center justify-center space-x-1 rounded-lg font-medium border border-0.5 cursor-pointer transition-colors ${
            task.completionPct === 100
              ? 'bg-success-light border-success/30 text-success hover:bg-success/10'
              : 'bg-white border-border text-text-secondary hover:bg-surface-alt'
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{task.completionPct === 100 ? 'Completed' : '✓ Done'}</span>
        </button>
      </div>
    </motion.div>
  );
}
export default TaskCard;
