import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, AlertTriangle, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';
import { Task, Subtask } from '../../firebase/firestore';
import BlockerPanel from './BlockerPanel';

interface CheckInModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  uid: string | null;
  saveTask: (task: Task) => Promise<void>;
  simulatedNowMs: number;
  triggerRebuildSchedule: (hasEscalated: boolean) => Promise<void>;
}

export function CheckInModal({
  task,
  isOpen,
  onClose,
  uid,
  saveTask,
  simulatedNowMs,
  triggerRebuildSchedule
}: CheckInModalProps) {
  const [view, setView] = useState<'checkin' | 'extend' | 'blocked'>('checkin');
  
  // Progress states
  const [pct, setPct] = useState<number>(task.completionPct || 0);
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks || []);

  // Deadline extend states
  const [extendDate, setExtendDate] = useState<string>('');
  const [extendTime, setExtendTime] = useState<string>('');

  // Countdown timer for task in check-in
  const [timeRemainingText, setTimeRemainingText] = useState<string>('');

  useEffect(() => {
    const updateTimer = () => {
      const msLeft = task.deadlineTimestamp - simulatedNowMs;
      if (msLeft <= 0) {
        setTimeRemainingText('Overdue');
        return;
      }
      const hrs = Math.floor(msLeft / 3600000);
      const mins = Math.floor((msLeft % 3600000) / 60000);
      const secs = Math.floor((msLeft % 60000) / 1000);
      
      const pad = (n: number) => String(n).padStart(2, '0');
      setTimeRemainingText(`${hrs}h ${pad(mins)}m ${pad(secs)}s left`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [task.deadlineTimestamp, simulatedNowMs]);

  // Sync subtasks checkbox checking with pct slider
  const handleSubtaskToggle = (id: string, done: boolean) => {
    const updated = subtasks.map(s => (s.id === id ? { ...s, done } : s));
    setSubtasks(updated);

    const total = updated.length;
    if (total > 0) {
      const doneCount = updated.filter(s => s.done).length;
      setPct(Math.round((doneCount / total) * 100));
    }
  };

  const handleSliderChange = (newPct: number) => {
    setPct(newPct);
    const total = subtasks.length;
    if (total > 0) {
      // Calculate how many subtasks should be done
      const shouldBeDone = Math.round((newPct / 100) * total);
      const updated = subtasks.map((s, idx) => ({
        ...s,
        done: idx < shouldBeDone
      }));
      setSubtasks(updated);
    }
  };

  // Save Progress Action
  const handleSaveProgress = async () => {
    if (!uid) return;

    const remainingHours = (1 - pct / 100) * task.estimatedHours;
    const remainingMinutes = remainingHours * 60;
    const minutesUntilDeadline = (task.deadlineTimestamp - simulatedNowMs) / 60000;
    const urgencyScore = minutesUntilDeadline > 0 ? remainingMinutes / minutesUntilDeadline : 999;

    const isEscalating = urgencyScore > 0.85 || minutesUntilDeadline < 60;

    const updatedTask: Task = {
      ...task,
      completionPct: pct,
      subtasks,
      status: pct === 100 ? 'done' : task.status === 'blocked' ? 'active' : task.status,
      priorityScore: isEscalating ? 999 : task.priorityScore
    };

    await saveTask(updatedTask);
    await triggerRebuildSchedule(isEscalating);
    onClose();
  };

  // Extend Deadline Confirm Action
  const handleExtendConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid || !extendDate || !extendTime) return;

    const newDeadlineTimestamp = new Date(`${extendDate}T${extendTime}`).getTime();

    const updatedTask: Task = {
      ...task,
      deadlineTimestamp: newDeadlineTimestamp,
      status: 'extended',
      // Reset deadline warnings so they trigger again if applicable
      warningsFired: task.warningsFired.filter(w => w !== 'deadline' && w !== '1h' && w !== '6h' && w !== '24h')
    };

    await saveTask(updatedTask);
    await triggerRebuildSchedule(false);
    onClose();
  };

  // Blocker panel trigger
  const handleSaveBlocker = async (blockerText: string) => {
    if (!uid) return;
    const updatedTask: Task = {
      ...task,
      status: 'blocked',
      blockerText
    };
    await saveTask(updatedTask);
    // Don't close modal immediately, let blocker show steps first
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-10 max-w-md mx-auto bg-white rounded-2xl shadow-xl z-50 overflow-hidden border border-border border-0.5 max-h-[85vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-border border-0.5 flex justify-between items-center bg-surface-alt">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Task Check-In</span>
                <h3 className="text-sm font-bold text-text-primary truncate max-w-[280px]" title={task.title}>
                  {task.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-black/5 text-text-secondary cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Ticking Countdown Timer */}
              <div className="bg-primary-light/30 border border-primary/10 border-0.5 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2 text-primary font-medium text-xs">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Time remaining:</span>
                </div>
                <span className="font-mono text-xs font-bold text-primary tracking-wide">
                  {timeRemainingText}
                </span>
              </div>

              {/* Views */}
              {view === 'checkin' && (
                <div className="space-y-5">
                  {/* Completion percentage slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-text-primary">
                      <span>Task Completion</span>
                      <span className="text-primary">{pct}%</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={pct}
                      onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-surface-alt rounded-lg appearance-none cursor-pointer accent-primary"
                    />

                    {subtasks.length > 0 && (
                      <div className="text-[10px] text-text-secondary font-medium">
                        ≈ {Math.round((pct / 100) * subtasks.length)} of {subtasks.length} subtasks done
                      </div>
                    )}
                  </div>

                  {/* Subtask checklist */}
                  {subtasks.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-text-primary">Breakdown Checklist</span>
                      <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                        {subtasks.map((sub) => (
                          <label
                            key={sub.id}
                            className="flex items-center space-x-2.5 bg-surface-alt p-2 rounded-lg border border-border border-0.5 cursor-pointer hover:bg-black/5 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={sub.done}
                              onChange={(e) => handleSubtaskToggle(sub.id, e.target.checked)}
                              className="h-3.5 w-3.5 rounded text-primary focus:ring-primary cursor-pointer"
                            />
                            <span className={`text-xs ${sub.done ? 'line-through text-text-muted font-normal' : 'font-medium text-text-secondary'}`}>
                              {sub.name} ({sub.estimatedMinutes}m)
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons (stacked full-width) */}
                  <div className="pt-2 flex flex-col space-y-2">
                    <button
                      onClick={handleSaveProgress}
                      className="w-full btn-primary text-xs h-10 flex items-center justify-center space-x-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Save Progress</span>
                    </button>

                    <button
                      onClick={() => setView('extend')}
                      className="w-full btn-secondary text-xs h-10 flex items-center justify-center space-x-2"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Need More Time</span>
                    </button>

                    <button
                      onClick={() => setView('blocked')}
                      className="w-full btn-secondary border-danger/30 text-danger hover:bg-danger-light text-xs h-10 flex items-center justify-center space-x-2"
                    >
                      <AlertTriangle className="h-4 w-4 text-danger" />
                      <span>I'm Blocked</span>
                    </button>
                  </div>
                </div>
              )}

              {view === 'extend' && (
                <form onSubmit={handleExtendConfirm} className="space-y-4">
                  <div className="flex items-center space-x-2 text-primary pb-1 border-b border-border border-0.5">
                    <Calendar className="h-5 w-5" />
                    <h4 className="text-xs font-semibold">Extend Task Deadline</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-text-secondary">New Date</label>
                      <input
                        type="date"
                        value={extendDate}
                        onChange={(e) => setExtendDate(e.target.value)}
                        required
                        className="w-full input-field text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-text-secondary">New Time</label>
                      <input
                        type="time"
                        value={extendTime}
                        onChange={(e) => setExtendTime(e.target.value)}
                        required
                        className="w-full input-field text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setView('checkin')}
                      className="flex-1 btn-secondary text-xs h-9"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-primary text-xs h-9"
                    >
                      Confirm Extension
                    </button>
                  </div>
                </form>
              )}

              {view === 'blocked' && (
                <BlockerPanel
                  taskTitle={task.title}
                  onSaveBlocker={handleSaveBlocker}
                  onClose={() => setView('checkin')}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
export default CheckInModal;
