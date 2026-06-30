import { useState } from 'react';
import {
  analyzeTaskWithAI,
  analyzeBlockerWithAI,
  handleDeadlineMissedWithAI,
  generateWeeklyReviewWithAI,
  AIAnalysisResult,
  AIBlockerResult,
  AIDeadlineMissedResult,
  AIWeeklyReviewResult
} from '../firebase/aiLogic';

export function useGemini() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeTask = async (
    title: string,
    deadline: string,
    importance: string,
    hours: number,
    description: string
  ): Promise<AIAnalysisResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeTaskWithAI(title, deadline, importance, hours, description);
      return result;
    } catch (err: any) {
      console.error('useGemini analyzeTask failed:', err);
      setError(err.message || 'AI analysis failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const analyzeBlocker = async (title: string, blockerText: string): Promise<AIBlockerResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeBlockerWithAI(title, blockerText);
      return result;
    } catch (err: any) {
      console.error('useGemini analyzeBlocker failed:', err);
      setError(err.message || 'AI blocker analysis failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleDeadlineMissed = async (title: string, pct: number): Promise<AIDeadlineMissedResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await handleDeadlineMissedWithAI(title, pct);
      return result;
    } catch (err: any) {
      console.error('useGemini handleDeadlineMissed failed:', err);
      setError(err.message || 'AI deadline recovery failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateWeeklyReview = async (
    completedCount: number,
    onTimeRate: number,
    missedCount: number,
    avgCompletion: number,
    blockers: string[]
  ): Promise<AIWeeklyReviewResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateWeeklyReviewWithAI(completedCount, onTimeRate, missedCount, avgCompletion, blockers);
      return result;
    } catch (err: any) {
      console.error('useGemini generateWeeklyReview failed:', err);
      setError(err.message || 'AI weekly review failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    analyzeTask,
    analyzeBlocker,
    handleDeadlineMissed,
    generateWeeklyReview
  };
}
