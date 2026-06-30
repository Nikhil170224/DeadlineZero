import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Mail, Calendar, Loader2 } from 'lucide-react';
import { Task } from '../../firebase/firestore';
import { useGemini } from '../../hooks/useGemini';
import { AIDeadlineMissedResult } from '../../firebase/aiLogic';

interface DeadlineModalProps {
  task: Task;
  isOpen: boolean;
  simulatedNowMs: number;
  saveTask: (task: Task) => Promise<void>;
  triggerRebuildSchedule: () => Promise<void>;
  onClose: () => void;
}

export function DeadlineModal({
  task,
  isOpen,
  simulatedNowMs,
  saveTask,
  triggerRebuildSchedule,
  onClose
}: DeadlineModalProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [aiResult, setAiResult] = useState<AIDeadlineMissedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { handleDeadlineMissed } = useGemini();

  // Run AI Autonomous action immediately on load
  useEffect(() => {
    if (!isOpen) return;

    const runAction = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await handleDeadlineMissed(task.title, task.completionPct);
        if (result) {
          setAiResult(result);
        } else {
          setError('Could not reach Gemini assistant. Please try again.');
        }
      } catch (err) {
        console.error(err);
        setError('Error generating recovery details.');
      } finally {
        setLoading(false);
      }
    };

    runAction();
  }, [isOpen, task.id]);

  // Compute time since deadline
  const getTimeSinceDeadline = () => {
    const deltaMs = simulatedNowMs - task.deadlineTimestamp;
    if (deltaMs <= 0) return 'Just now';
    const minutes = Math.floor(deltaMs / 60000);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m ago`;
  };

  const handleReschedule = async () => {
    // Set new deadline to +24h from simulatedNowMs
    const newDeadline = simulatedNowMs + 24 * 3600000;
    const updated: Task = {
      ...task,
      deadlineTimestamp: newDeadline,
      status: 'extended',
      // Reset deadline warnings
      warningsFired: task.warningsFired.filter(w => w !== 'deadline' && w !== '1h' && w !== '6h' && w !== '24h')
    };

    await saveTask(updated);
    await triggerRebuildSchedule();
    onClose();
  };

  const handleSendEmail = () => {
    if (!aiResult) return;
    const { subject, body } = aiResult.emailDraft;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Undismissable Backdrop (no onClick) */}
          <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-8 max-w-lg mx-auto bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-danger/30 max-h-[90vh] flex flex-col"
          >
            {/* Red Alert Header */}
            <div className="bg-danger text-white p-5 flex items-center space-x-3 flex-shrink-0">
              <ShieldAlert className="h-6 w-6 animate-bounce" />
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase opacity-85">Deadline Missed</span>
                <h3 className="text-base font-bold leading-tight truncate max-w-[340px]" title={task.title}>
                  ⏰ {task.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Missed Details strip */}
              <div className="grid grid-cols-2 gap-4 bg-danger-light p-4 rounded-xl border border-danger/10 border-0.5 text-xs">
                <div>
                  <span className="text-text-secondary block mb-0.5">Missed by:</span>
                  <span className="font-bold text-danger">{getTimeSinceDeadline()}</span>
                </div>
                <div>
                  <span className="text-text-secondary block mb-0.5">Completed:</span>
                  <span className="font-bold text-danger">{task.completionPct}%</span>
                </div>
              </div>

              {/* Gemini Autonomous Recovery Loading/Result */}
              <div className="space-y-4">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-text-primary">
                  <span>AI Autonomous Recovery Plan</span>
                </div>

                {loading ? (
                  <div className="py-12 flex flex-col items-center justify-center space-y-3 bg-surface-alt rounded-xl border border-border border-dashed">
                    <Loader2 className="h-7 w-7 text-danger animate-spin" />
                    <span className="text-xs text-text-secondary font-medium">Gemini drafting recovery plan...</span>
                  </div>
                ) : error ? (
                  <div className="bg-amber-50 border border-warning/20 border-0.5 p-3 rounded-lg text-xs text-warning">
                    {error}
                  </div>
                ) : aiResult ? (
                  <div className="space-y-5 animate-fadeIn">
                    {/* Recovery list cards */}
                    <div className="space-y-2">
                      {aiResult.recoveryPlan.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 bg-danger-light/50 border border-danger/10 border-0.5 rounded-lg text-xs flex items-start space-x-3 text-danger"
                        >
                          <div className="bg-danger text-white h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                            {idx + 1}
                          </div>
                          <p className="text-text-secondary leading-relaxed font-semibold">{step}</p>
                        </div>
                      ))}
                    </div>

                    {/* Email Draft Card */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-text-primary">Stakeholder Update Letter</span>
                      <div className="card-style bg-surface-alt border border-border border-0.5 p-4 rounded-xl text-xs space-y-2">
                        <div className="border-b border-border border-0.5 pb-1.5 mb-1.5">
                          <span className="font-semibold text-text-muted">Subject:</span>{' '}
                          <span className="font-bold text-text-primary">{aiResult.emailDraft.subject}</span>
                        </div>
                        <p className="whitespace-pre-line text-text-secondary leading-relaxed leading-6">
                          {aiResult.emailDraft.body}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleSendEmail}
                        className="w-full btn-secondary border-primary/20 text-primary hover:bg-primary-light text-xs h-10 flex items-center justify-center space-x-1.5"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Send via Gmail</span>
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Footer containing single Acknowledge button */}
            <div className="p-4 border-t border-border border-0.5 bg-surface-alt flex flex-col space-y-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleReschedule}
                className="w-full btn-danger h-11 flex items-center justify-center space-x-2 text-xs font-bold shadow-md cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Acknowledge & Reschedule (+24h Emergency Slot)</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
export default DeadlineModal;
