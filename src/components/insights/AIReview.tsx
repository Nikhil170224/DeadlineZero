import React, { useState } from 'react';
import { Sparkles, Clipboard, Check, Loader2 } from 'lucide-react';
import { Task } from '../../firebase/firestore';
import { useGemini } from '../../hooks/useGemini';
import { AIWeeklyReviewResult } from '../../firebase/aiLogic';

interface AIReviewProps {
  tasks: Task[];
}

export function AIReview({ tasks }: AIReviewProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [review, setReview] = useState<AIWeeklyReviewResult | null>(null);
  const [copiedCard, setCopiedCard] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { generateWeeklyReview } = useGemini();

  const handleGenerateReview = async () => {
    setLoading(true);
    setError(null);

    // Compute metrics
    const completedTasks = tasks.filter(t => t.status === 'done');
    const totalEnded = tasks.filter(t => t.status === 'done' || t.status === 'extended');
    const onTimeTasks = completedTasks.filter(t => !t.warningsFired.includes('deadline'));
    
    const completedCount = completedTasks.length;
    const onTimeRate = totalEnded.length > 0 ? Math.round((onTimeTasks.length / totalEnded.length) * 100) : 100;
    const missedCount = tasks.filter(t => t.warningsFired.includes('deadline')).length;
    const avgCompletion = tasks.length > 0 ? Math.round(tasks.reduce((sum, t) => sum + t.completionPct, 0) / tasks.length) : 100;
    
    const blockers = tasks.filter(t => t.blockerText).map(t => t.blockerText);

    try {
      const result = await generateWeeklyReview(
        completedCount,
        onTimeRate,
        missedCount,
        avgCompletion,
        blockers
      );
      if (result) {
        setReview(result);
      } else {
        setError('Unable to generate weekly review. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error invoking Gemini model.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, cardId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCard(cardId);
    setTimeout(() => setCopiedCard(null), 2000);
  };

  return (
    <div className="card-style bg-white space-y-4 border-0.5">
      <div className="flex justify-between items-center pb-2 border-b border-border border-0.5">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-text-primary">AI Weekly Performance Review</h3>
          <p className="text-[11px] text-text-secondary">Get custom, warm recommendations based on your task history.</p>
        </div>
        {!review && !loading && (
          <button
            onClick={handleGenerateReview}
            className="btn-primary text-xs flex items-center space-x-1.5 h-8 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Generate review</span>
          </button>
        )}
      </div>

      {loading && (
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-text-secondary animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span>Gemini is compiling your weekly logs...</span>
          </div>
          {/* Skeleton Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-32 bg-surface-alt border border-border border-0.5 rounded-xl p-4 space-y-3 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-danger font-medium">{error}</p>
      )}

      {review && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Went Well Card */}
          <div className="border border-success/30 border-0.5 rounded-xl p-4 bg-success-light/20 flex flex-col justify-between space-y-3 relative">
            <div className="space-y-1">
              <span className="text-xs font-bold text-success">What went well</span>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                {review.wentWell}
              </p>
            </div>
            <button
              onClick={() => handleCopy(review.wentWell, 'well')}
              className="self-end p-1 text-text-muted hover:text-success rounded hover:bg-black/5 flex items-center space-x-1 text-[10px] cursor-pointer"
            >
              {copiedCard === 'well' ? <Check className="h-3.5 w-3.5 text-success" /> : <Clipboard className="h-3.5 w-3.5" />}
              <span>{copiedCard === 'well' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Struggled Card */}
          <div className="border border-warning/30 border-0.5 rounded-xl p-4 bg-warning-light/20 flex flex-col justify-between space-y-3 relative">
            <div className="space-y-1">
              <span className="text-xs font-bold text-warning">Where you struggled</span>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                {review.struggled}
              </p>
            </div>
            <button
              onClick={() => handleCopy(review.struggled, 'struggled')}
              className="self-end p-1 text-text-muted hover:text-warning rounded hover:bg-black/5 flex items-center space-x-1 text-[10px] cursor-pointer"
            >
              {copiedCard === 'struggled' ? <Check className="h-3.5 w-3.5 text-warning" /> : <Clipboard className="h-3.5 w-3.5" />}
              <span>{copiedCard === 'struggled' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Recommendations Card */}
          <div className="border border-primary/30 border-0.5 rounded-xl p-4 bg-primary-light/30 flex flex-col justify-between space-y-3 relative">
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary">Next week's plan</span>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                {review.recommendations}
              </p>
            </div>
            <button
              onClick={() => handleCopy(review.recommendations, 'plan')}
              className="self-end p-1 text-text-muted hover:text-primary rounded hover:bg-black/5 flex items-center space-x-1 text-[10px] cursor-pointer"
            >
              {copiedCard === 'plan' ? <Check className="h-3.5 w-3.5 text-primary" /> : <Clipboard className="h-3.5 w-3.5" />}
              <span>{copiedCard === 'plan' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default AIReview;
