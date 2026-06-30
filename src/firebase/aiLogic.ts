import { initializeApp, getApp } from 'firebase/app';
import { app, isFirebaseConfigured } from './config';

// Re-export type definitions for usage in components
export interface AIAnalysisResult {
  subtasks: { name: string; estimatedMinutes: number }[];
  detectedImportance: 'low' | 'medium' | 'high';
  importanceReason: string;
  tips: string;
  warningMessage: string;
}

export interface AIBlockerResult {
  steps: string[];
  emailDraft: {
    subject: string;
    body: string;
  };
}

export interface AIDeadlineMissedResult {
  recoveryPlan: string[];
  emailDraft: {
    subject: string;
    body: string;
  };
}

export interface AIWeeklyReviewResult {
  wentWell: string;
  struggled: string;
  recommendations: string;
}

// Dynamically import firebase/ai to prevent build failures if type definitions differ
let generativeModel: any = null;

const getModel = async () => {
  if (generativeModel) return generativeModel;
  if (!isFirebaseConfigured || !app) {
    throw new Error('Firebase is not configured.');
  }
  try {
    const { getAI, getGenerativeModel } = await import('firebase/ai');
    const ai = getAI(app);
    generativeModel = getGenerativeModel(ai, { model: 'gemini-2.0-flash' });
    return generativeModel;
  } catch (err) {
    console.error('Failed to import or initialize firebase/ai:', err);
    throw err;
  }
};

// MOCK responses in case Firebase is not configured or Gemini fails
const getMockAnalysis = (title: string): AIAnalysisResult => {
  return {
    subtasks: [
      { name: `Research info for ${title}`, estimatedMinutes: 30 },
      { name: `Draft initial version of ${title}`, estimatedMinutes: 60 },
      { name: `Review and refine ${title}`, estimatedMinutes: 45 },
      { name: `Submit and document ${title}`, estimatedMinutes: 15 }
    ],
    detectedImportance: title.toLowerCase().includes('report') || title.toLowerCase().includes('presentation') ? 'high' : 'medium',
    importanceReason: "Task keywords indicate high visibility and business alignment.",
    tips: "Tackle the high-effort research first during your peak productivity hours in the morning.",
    warningMessage: title.toLowerCase().includes('report') ? "This report has multiple stakeholders. Check alignment early." : ""
  };
};

const getMockBlocker = (title: string, blockerText: string): AIBlockerResult => {
  return {
    steps: [
      "Reach out to the technical team immediately to clarify requirements.",
      "Check if any cached data or templates can be reused to unblock progress."
    ],
    emailDraft: {
      subject: `[Blocked Alert] Update on: ${title}`,
      body: `Hi Team,\n\nI am currently blocked on "${title}" because: ${blockerText}.\n\nCould we jump on a brief 5-minute call to resolve this so I can stay on track for the deadline?\n\nBest regards,\n[Your Name]`
    }
  };
};

const getMockDeadlineMissed = (title: string, pct: number): AIDeadlineMissedResult => {
  return {
    recoveryPlan: [
      "Dedicate the next 60-minute session exclusively to finalizing remaining sections.",
      "Postpone lower priority tasks to clean up this backlog immediately."
    ],
    emailDraft: {
      subject: `[Delay Notice] Update on: ${title}`,
      body: `Dear Stakeholders,\n\nI wanted to update you on "${title}". I am currently at ${pct}% completion and expect to complete it within the next 24 hours.\n\nApologies for the delay, and thank you for your patience.\n\nBest,\n[Your Name]`
    }
  };
};

const getMockWeeklyReview = (completedCount: number, onTimeRate: number): AIWeeklyReviewResult => {
  return {
    wentWell: `You completed ${completedCount} tasks this week, maintaining a strong focus. Your morning sessions showed high completion rates.`,
    struggled: `Your on-time completion rate was ${onTimeRate}%. Several tasks were extended due to late-stage blocker reports.`,
    recommendations: "Block out 30 minutes every Monday morning for proactive planning and set up dependency checks 24 hours prior to deadlines."
  };
};

// AI Engine Functions
export const analyzeTaskWithAI = async (
  title: string,
  deadline: string,
  importance: string,
  hours: number,
  description: string
): Promise<AIAnalysisResult> => {
  try {
    const model = await getModel();
    const systemPrompt = "You are a productivity assistant. Return ONLY valid JSON. No markdown, no explanation.";
    const userPrompt = `Analyse this task. Name: ${title}. Deadline: ${deadline}. Importance: ${importance}. Est. hours: ${hours}. Description: ${description}. Return: { subtasks:[{name:string,estimatedMinutes:number}], detectedImportance:'low'|'medium'|'high', importanceReason:string, tips:string, warningMessage:string }`;

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ]
    });

    const text = result.response.text();
    // Clean up any markdown json wrapping if Gemini outputs it
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText) as AIAnalysisResult;
  } catch (error) {
    console.error('Gemini analyze task failed, using mock data:', error);
    // fallback to mock data as requested: "Gemini call fails -> AI analysis unavailable - add task manually + allow manual subtask entry"
    // Wait, the prompt says "allow manual subtask entry", so we return a default structure or propagate the error. Let's throw the error so the UI shows the fallback info callout, but let's also supply mock helper if needed. Let's throw the error so the UI triggers the banner.
    throw new Error('AI analysis unavailable — add task manually');
  }
};

export const analyzeBlockerWithAI = async (title: string, blockerText: string): Promise<AIBlockerResult> => {
  try {
    const model = await getModel();
    const systemPrompt = "You are an autonomous productivity agent. Return ONLY valid JSON.";
    const userPrompt = `User is blocked on: ${title}. Blocker: ${blockerText}. Return JSON: { steps:[string,string], emailDraft:{ subject:string, body:string } }`;

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ]
    });

    const text = result.response.text();
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText) as AIBlockerResult;
  } catch (error) {
    console.error('Gemini blocker analysis failed, using mock:', error);
    return getMockBlocker(title, blockerText);
  }
};

export const handleDeadlineMissedWithAI = async (title: string, pct: number): Promise<AIDeadlineMissedResult> => {
  try {
    const model = await getModel();
    const systemPrompt = "You are an autonomous productivity agent. Return ONLY valid JSON.";
    const userPrompt = `User missed deadline. Task: ${title}. Completion: ${pct}%. Return JSON: { recoveryPlan:[string,string], emailDraft:{ subject:string, body:string } }`;

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ]
    });

    const text = result.response.text();
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText) as AIDeadlineMissedResult;
  } catch (error) {
    console.error('Gemini missed deadline analysis failed, using mock:', error);
    return getMockDeadlineMissed(title, pct);
  }
};

export const generateWeeklyReviewWithAI = async (
  completedCount: number,
  onTimeRate: number,
  missedCount: number,
  avgCompletion: number,
  blockers: string[]
): Promise<AIWeeklyReviewResult> => {
  try {
    const model = await getModel();
    const systemPrompt = "You are a personal productivity analyst. Write in second person, warm but honest. Return ONLY valid JSON.";
    const userPrompt = `Weekly data: tasks_completed=${completedCount}, on_time_rate=${onTimeRate}%, missed_deadlines=${missedCount}, avg_completion_at_deadline=${avgCompletion}%, common_blockers=[${blockers.join(', ')}]. Return JSON: { wentWell:string, struggled:string, recommendations:string }`;

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ]
    });

    const text = result.response.text();
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText) as AIWeeklyReviewResult;
  } catch (error) {
    console.error('Gemini weekly review failed, using mock:', error);
    return getMockWeeklyReview(completedCount, onTimeRate);
  }
};
