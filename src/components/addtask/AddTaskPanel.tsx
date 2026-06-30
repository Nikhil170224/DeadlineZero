import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertCircle, HelpCircle, Loader2 } from 'lucide-react';
import { Goal, Task, Subtask } from '../../firebase/firestore';
import VoiceInput from './VoiceInput';
import SubtaskEditor from './SubtaskEditor';
import { useGemini } from '../../hooks/useGemini';

interface AddTaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  uid: string | null;
  goals: Goal[];
  saveTask: (task: Task) => Promise<void>;
  triggerRebuildSchedule: () => Promise<void>;
}

export function AddTaskPanel({
  isOpen,
  onClose,
  uid,
  goals,
  saveTask,
  triggerRebuildSchedule
}: AddTaskPanelProps) {
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  
  // Step 2 Form States
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [deadlineDate, setDeadlineDate] = useState<string>('');
  const [deadlineTime, setDeadlineTime] = useState<string>('');
  const [importance, setImportance] = useState<'low' | 'medium' | 'high'>('medium');
  const [estimatedHours, setEstimatedHours] = useState<number>(2);
  const [linkedGoalId, setLinkedGoalId] = useState<string>('');

  // Voice/Text input transcript storage
  const [textInputText, setTextInputText] = useState<string>('');
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');

  // AI analysis results
  const [aiAnalyzing, setAiAnalyzing] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [detectedImportance, setDetectedImportance] = useState<'low' | 'medium' | 'high' | null>(null);
  const [importanceReason, setImportanceReason] = useState<string>('');
  const [aiTips, setAiTips] = useState<string>('');
  const [aiWarning, setAiWarning] = useState<string>('');
  const [dismissedDetectedImportance, setDismissedDetectedImportance] = useState<boolean>(false);

  const { analyzeTask } = useGemini();

  // Sync Voice/Text to title field when they update
  useEffect(() => {
    if (inputMode === 'voice' && voiceTranscript) {
      setTitle(voiceTranscript);
    } else if (inputMode === 'text' && textInputText) {
      setTitle(textInputText);
    }
  }, [voiceTranscript, textInputText, inputMode]);

  const handleAIAnalyse = async () => {
    if (!title) {
      setAiError('Please enter a task name or description first.');
      return;
    }
    setAiAnalyzing(true);
    setAiError(null);

    const deadlineStr = `${deadlineDate} ${deadlineTime}`.trim() || 'Not specified';
    const result = await analyzeTask(title, deadlineStr, importance, estimatedHours, description);

    if (result) {
      // Set subtasks
      const mappedSubtasks: Subtask[] = result.subtasks.map((s, idx) => ({
        id: `sub-ai-${idx}-${Date.now()}`,
        name: s.name,
        estimatedMinutes: s.estimatedMinutes,
        done: false
      }));
      setSubtasks(mappedSubtasks);
      setDetectedImportance(result.detectedImportance);
      setImportanceReason(result.importanceReason);
      setAiTips(result.tips);
      setAiWarning(result.warningMessage);
      setDismissedDetectedImportance(false);
    } else {
      setAiError('AI analysis unavailable — add task manually');
    }
    setAiAnalyzing(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid || !title || !deadlineDate || !deadlineTime) return;

    // Combine date and time
    const deadlineTimestamp = new Date(`${deadlineDate}T${deadlineTime}`).getTime();

    // Final priority score computed by engine
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description,
      deadlineTimestamp,
      importanceSetByUser: importance,
      importanceDetectedByAI: detectedImportance,
      aiImportanceDismissed: dismissedDetectedImportance,
      aiImportanceReason: importanceReason,
      estimatedHours,
      completionPct: 0,
      status: 'active',
      blockerText: '',
      subtasks,
      scheduledBlocks: [],
      priorityScore: 0,
      warningsFired: [],
      goalId: linkedGoalId || null,
      createdAt: Date.now()
    };

    try {
      await saveTask(newTask);
      await triggerRebuildSchedule();
      onClose();
      resetForm();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadlineDate('');
    setDeadlineTime('');
    setImportance('medium');
    setEstimatedHours(2);
    setLinkedGoalId('');
    setTextInputText('');
    setVoiceTranscript('');
    setSubtasks([]);
    setDetectedImportance(null);
    setImportanceReason('');
    setAiTips('');
    setAiWarning('');
    setAiError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col h-full border-l border-border border-0.5"
          >
            {/* Header */}
            <div className="p-4 border-b border-border border-0.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-base font-bold text-text-primary">Add AI-Guided Task</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-surface-alt text-text-secondary cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Step 1: Input Mode */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-text-secondary">Step 1: Input Mode</label>
                  <div className="flex bg-surface-alt rounded-lg p-0.5 border border-border border-0.5">
                    <button
                      type="button"
                      onClick={() => setInputMode('text')}
                      className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                        inputMode === 'text' ? 'bg-white text-text-primary shadow-sm' : 'text-text-secondary'
                      }`}
                    >
                      Text
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputMode('voice')}
                      className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                        inputMode === 'voice' ? 'bg-white text-text-primary shadow-sm' : 'text-text-secondary'
                      }`}
                    >
                      Voice
                    </button>
                  </div>
                </div>

                {inputMode === 'voice' ? (
                  <VoiceInput
                    transcript={voiceTranscript}
                    onTranscriptChange={setVoiceTranscript}
                  />
                ) : (
                  <textarea
                    value={textInputText}
                    onChange={(e) => setTextInputText(e.target.value)}
                    placeholder="e.g. Submit quarterly marketing report by Friday 5pm"
                    className="w-full input-field h-[80px] p-3 text-xs leading-relaxed resize-none"
                  />
                )}
              </div>

              {/* Step 2: Task Details Form */}
              <div className="space-y-4 pt-4 border-t border-border border-0.5">
                <h3 className="text-xs font-semibold text-text-secondary">Step 2: Task Parameters</h3>

                {/* Task Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-text-secondary">Task Name</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Task name"
                    className="w-full input-field text-xs"
                  />
                </div>

                {/* Deadline: Date + Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-text-secondary">Deadline Date</label>
                    <input
                      type="date"
                      value={deadlineDate}
                      onChange={(e) => setDeadlineDate(e.target.value)}
                      required
                      className="w-full input-field text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-text-secondary">Deadline Time</label>
                    <input
                      type="time"
                      value={deadlineTime}
                      onChange={(e) => setDeadlineTime(e.target.value)}
                      required
                      className="w-full input-field text-xs"
                    />
                  </div>
                </div>

                {/* Importance + Estimated Hours */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-text-secondary">Importance</label>
                    <select
                      value={importance}
                      onChange={(e: any) => setImportance(e.target.value)}
                      className="w-full input-field text-xs bg-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-text-secondary">Est. Hours</label>
                    <input
                      type="number"
                      value={estimatedHours}
                      onChange={(e) => setEstimatedHours(parseFloat(e.target.value) || 0.5)}
                      min="0.5"
                      step="0.5"
                      required
                      className="w-full input-field text-xs"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-text-secondary">Description (Optional)</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details about requirements, links, or stakeholders..."
                    className="w-full input-field h-[60px] p-3 text-xs leading-relaxed resize-none"
                  />
                </div>

                {/* Link to goal */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-text-secondary">Link to Goal / Habit</label>
                  <select
                    value={linkedGoalId}
                    onChange={(e) => setLinkedGoalId(e.target.value)}
                    className="w-full input-field text-xs bg-white"
                  >
                    <option value="">None</option>
                    {goals.map((goal) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.isHabit ? '🔁 ' : '🎯 '} {goal.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Analyse with AI */}
              <div className="space-y-4 pt-4 border-t border-border border-0.5">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-semibold text-text-secondary">Step 3: AI Breakdown</h3>
                  <button
                    type="button"
                    onClick={handleAIAnalyse}
                    disabled={aiAnalyzing || !title}
                    className="btn-secondary text-xs flex items-center space-x-1.5 h-8 bg-primary-light hover:bg-primary/10 border-primary/20 text-primary disabled:opacity-50 cursor-pointer"
                  >
                    {aiAnalyzing ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" />
                    )}
                    <span>Analyse with AI</span>
                  </button>
                </div>

                {/* AI Warning Banner */}
                {aiWarning && (
                  <div className="bg-amber-50 border border-warning/20 border-0.5 text-warning p-3 rounded-lg text-xs flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{aiWarning}</span>
                  </div>
                )}

                {/* AI Importance Discrepancy Box */}
                {detectedImportance && detectedImportance !== importance && !dismissedDetectedImportance && (
                  <div className="bg-primary-light/50 border border-primary/20 border-0.5 p-3 rounded-lg text-xs space-y-2">
                    <div className="flex items-start space-x-2 text-primary">
                      <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="font-semibold">AI Suggests {importanceMap[detectedImportance].label} Importance</span>
                        <p className="text-text-secondary leading-relaxed font-normal">
                          {importanceReason || "Due to deadlines and workload, AI suggests higher priority."}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setDismissedDetectedImportance(true)}
                        className="px-2 py-1 rounded border border-border text-text-secondary hover:bg-surface-alt font-medium cursor-pointer"
                      >
                        Keep Mine
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setImportance(detectedImportance);
                          setDismissedDetectedImportance(true);
                        }}
                        className="px-2 py-1 rounded bg-primary text-white hover:bg-primary-dark font-medium cursor-pointer"
                      >
                        Accept Suggestion
                      </button>
                    </div>
                  </div>
                )}

                {/* AI Error */}
                {aiError && (
                  <div className="bg-amber-50 border border-warning/20 border-0.5 text-warning p-3 rounded-lg text-xs flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-semibold block">{aiError}</span>
                      <span className="text-[10px] text-text-secondary block">You can manually break down and configure the task details below.</span>
                    </div>
                  </div>
                )}

                {/* Subtask list */}
                <SubtaskEditor
                  subtasks={subtasks}
                  onChange={setSubtasks}
                />

                {/* AI Tips info box */}
                {aiTips && (
                  <div className="bg-primary-light/30 border border-primary/10 border-0.5 p-3 rounded-lg text-xs space-y-1 text-primary">
                    <span className="font-semibold block">AI Optimization Tips</span>
                    <p className="text-text-secondary leading-relaxed font-normal">{aiTips}</p>
                  </div>
                )}
              </div>
            </form>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-border border-0.5 flex justify-end space-x-2 bg-surface-alt">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary text-xs h-9"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSave}
                disabled={!title || !deadlineDate || !deadlineTime}
                className="btn-primary text-xs h-9 flex items-center space-x-1.5 disabled:opacity-50"
              >
                <span>Schedule It</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const importanceMap = {
  low: { label: 'Low' },
  medium: { label: 'Medium' },
  high: { label: 'High' }
};

export default AddTaskPanel;
