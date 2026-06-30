import React, { useState } from 'react';
import { Sparkles, Mail, AlertTriangle, Loader2 } from 'lucide-react';
import { useGemini } from '../../hooks/useGemini';
import { AIBlockerResult } from '../../firebase/aiLogic';

interface BlockerPanelProps {
  taskTitle: string;
  onSaveBlocker: (blockerText: string, status: 'blocked') => Promise<void>;
  onClose: () => void;
}

export function BlockerPanel({ taskTitle, onSaveBlocker, onClose }: BlockerPanelProps) {
  const [blockerText, setBlockerText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AIBlockerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { analyzeBlocker } = useGemini();

  const handleEngageAI = async () => {
    if (!blockerText.trim()) {
      setError('Please describe what is blocking you first.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeBlocker(taskTitle, blockerText);
      if (result) {
        setAiResult(result);
        // Save the blocker state to Firestore
        await onSaveBlocker(blockerText, 'blocked');
      } else {
        setError('Failed to engage AI Agent. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error engaging AI agent.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = () => {
    if (!aiResult) return;
    const { subject, body } = aiResult.emailDraft;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-danger pb-1 border-b border-border border-0.5">
        <AlertTriangle className="h-5 w-5" />
        <h4 className="text-xs font-semibold">Report Task Blocker</h4>
      </div>

      {!aiResult ? (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-secondary">What's blocking you?</label>
            <textarea
              value={blockerText}
              onChange={(e) => setBlockerText(e.target.value)}
              placeholder="e.g. Waiting on design feedback, server is down, or missing database access..."
              className="w-full input-field h-[90px] p-3 text-xs leading-relaxed resize-none"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-danger font-medium">{error}</p>
          )}

          <button
            type="button"
            onClick={handleEngageAI}
            disabled={loading || !blockerText.trim()}
            className="w-full btn-primary text-xs flex items-center justify-center space-x-2 h-9 bg-danger hover:bg-red-800 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span>Engage AI Agent</span>
          </button>
        </div>
      ) : (
        <div className="space-y-5 animate-fadeIn">
          {/* Unblocking steps cards */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-text-primary">Recommended Action Plan</span>
            <div className="space-y-2">
              {aiResult.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-primary-light/30 border border-primary/10 border-0.5 rounded-lg text-xs flex items-start space-x-2.5 text-primary"
                >
                  <div className="bg-primary text-white h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-text-secondary leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Email Draft Card */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-text-primary">Stakeholder Email Draft</span>
            <div className="card-style bg-surface-alt border border-border border-0.5 p-4 rounded-xl text-xs space-y-2">
              <div className="border-b border-border border-0.5 pb-1.5 mb-1.5">
                <span className="font-semibold text-text-muted">Subject:</span>{' '}
                <span className="font-bold text-text-primary">{aiResult.emailDraft.subject}</span>
              </div>
              <p className="whitespace-pre-line text-text-secondary leading-relaxed leading-6">
                {aiResult.emailDraft.body}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAiResult(null)}
                className="flex-1 btn-secondary text-xs h-9"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSendEmail}
                className="flex-1 btn-primary text-xs h-9 flex items-center justify-center space-x-1.5"
              >
                <Mail className="h-4 w-4" />
                <span>Send via Gmail</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default BlockerPanel;
