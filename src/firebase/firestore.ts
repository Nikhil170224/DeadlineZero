import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

// Interface definitions matching the Firestore data model
export interface Profile {
  name: string;
  photoURL: string;
  workStartHour: number;
  workEndHour: number;
  demoMode: boolean;
  demoSpeedMultiplier: number;
  onboardingDone: boolean;
}

export interface Subtask {
  id: string;
  name: string;
  estimatedMinutes: number;
  done: boolean;
}

export interface ScheduledBlock {
  taskId: string;
  startTimestamp: number;
  endTimestamp: number;
  subtaskIndex: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  deadlineTimestamp: number;
  importanceSetByUser: 'low' | 'medium' | 'high';
  importanceDetectedByAI: 'low' | 'medium' | 'high' | null;
  aiImportanceDismissed: boolean;
  aiImportanceReason: string;
  estimatedHours: number;
  completionPct: number;
  status: 'active' | 'done' | 'blocked' | 'extended';
  blockerText: string;
  subtasks: Subtask[];
  scheduledBlocks: ScheduledBlock[];
  priorityScore: number;
  warningsFired: string[];
  goalId: string | null;
  createdAt: number;
}

export interface CalEvent {
  id: string;
  title: string;
  startTimestamp: number;
  endTimestamp: number;
  source: 'mock' | 'google';
}

export interface Schedule {
  calendarEvents: CalEvent[];
  lastUpdated: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: number;
  isHabit: boolean;
  habitFrequency: 'daily' | 'weekly' | null;
  completedDates: number[]; // unix ms
  currentStreak: number;
  longestStreak: number;
  linkedTaskIds: string[];
  color: string;
  createdAt: number;
}

// Check if database is ready
const checkDb = () => {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firestore is not configured. Please add VITE_FIREBASE_* variables to .env.local.');
  }
};

// Seed Data helper
export const checkAndSeedData = async (uid: string, userDisplayName?: string, userPhotoURL?: string) => {
  checkDb();
  const tasksRef = collection(db, 'users', uid, 'tasks');
  const taskSnap = await getDocs(tasksRef);

  if (taskSnap.empty) {
    console.log('No tasks found. Seeding initial data for user:', uid);
    const batch = writeBatch(db);

    // 1. Seed Profile
    const profileRef = doc(db, 'users', uid, 'profile', 'main');
    const profileData: Profile = {
      name: userDisplayName || 'Developer',
      photoURL: userPhotoURL || '',
      workStartHour: 9,
      workEndHour: 18,
      demoMode: false,
      demoSpeedMultiplier: 1,
      onboardingDone: true
    };
    batch.set(profileRef, profileData);

    // 2. Seed Goals
    const goalId1 = 'goal-blog';
    const goalId2 = 'habit-planning';

    const seedGoal: Goal = {
      id: goalId1,
      title: "Launch Personal Blog",
      description: "Build and launch a portfolio website with blog posts",
      targetDate: Date.now() + 30 * 24 * 3600000,
      isHabit: false,
      habitFrequency: null,
      completedDates: [],
      currentStreak: 0,
      longestStreak: 0,
      linkedTaskIds: [],
      color: "#185FA5",
      createdAt: Date.now()
    };

    const seedHabit: Goal = {
      id: goalId2,
      title: "Morning planning — review today's tasks",
      description: "Start each day reviewing scheduled items",
      isHabit: true,
      habitFrequency: "daily",
      completedDates: [
        Date.now() - 86400000,
        Date.now() - 2 * 86400000,
        Date.now() - 3 * 86400000
      ],
      currentStreak: 3,
      longestStreak: 7,
      linkedTaskIds: [],
      targetDate: Date.now() + 365 * 24 * 3600000,
      color: "#3B6D11",
      createdAt: Date.now()
    };

    batch.set(doc(db, 'users', uid, 'goals', goalId1), seedGoal);
    batch.set(doc(db, 'users', uid, 'goals', goalId2), seedHabit);

    // 3. Seed Tasks
    const seedTasks = [
      {
        id: "task-report",
        title: "Submit Q3 Marketing Report",
        description: "Analyse quarterly marketing metrics and format final slide deck.",
        deadlineTimestamp: Date.now() + 26 * 3600000,
        importanceSetByUser: "high" as const,
        importanceDetectedByAI: null,
        aiImportanceDismissed: false,
        aiImportanceReason: "",
        estimatedHours: 4,
        completionPct: 35,
        status: "active" as const,
        blockerText: "",
        subtasks: [
          { id: "sub-1", name: "Research competitor data", estimatedMinutes: 30, done: true },
          { id: "sub-2", name: "Write executive summary", estimatedMinutes: 45, done: true },
          { id: "sub-3", name: "Build slide deck", estimatedMinutes: 60, done: false },
          { id: "sub-4", name: "Proofread and format", estimatedMinutes: 30, done: false },
          { id: "sub-5", name: "Email to manager", estimatedMinutes: 15, done: false }
        ],
        scheduledBlocks: [],
        priorityScore: 0,
        warningsFired: [],
        goalId: goalId1,
        createdAt: Date.now()
      },
      {
        id: "task-presentation",
        title: "Prepare Client Presentation",
        description: "Create slides and talking points for the pitch.",
        deadlineTimestamp: Date.now() + 6.5 * 3600000,
        importanceSetByUser: "high" as const,
        importanceDetectedByAI: null,
        aiImportanceDismissed: false,
        aiImportanceReason: "",
        estimatedHours: 2,
        completionPct: 70,
        status: "active" as const,
        blockerText: "",
        subtasks: [
          { id: "sub-6", name: "Finalise agenda", estimatedMinutes: 20, done: true },
          { id: "sub-7", name: "Polish slide visuals", estimatedMinutes: 40, done: true },
          { id: "sub-8", name: "Rehearse talking points", estimatedMinutes: 30, done: false }
        ],
        scheduledBlocks: [],
        priorityScore: 0,
        warningsFired: [],
        goalId: null,
        createdAt: Date.now()
      },
      {
        id: "task-tax",
        title: "Complete Online Tax Filing",
        description: "Submit tax forms and invoices on the government portal.",
        deadlineTimestamp: Date.now() + 72 * 3600000,
        importanceSetByUser: "medium" as const,
        importanceDetectedByAI: null,
        aiImportanceDismissed: false,
        aiImportanceReason: "",
        estimatedHours: 1.5,
        completionPct: 0,
        status: "active" as const,
        blockerText: "",
        subtasks: [
          { id: "sub-9", name: "Gather income documents", estimatedMinutes: 20, done: false },
          { id: "sub-10", name: "Log into tax portal", estimatedMinutes: 5, done: false },
          { id: "sub-11", name: "Fill sections 1–4", estimatedMinutes: 40, done: false },
          { id: "sub-12", name: "Review and submit", estimatedMinutes: 15, done: false }
        ],
        scheduledBlocks: [],
        priorityScore: 0,
        warningsFired: [],
        goalId: null,
        createdAt: Date.now()
      }
    ];

    seedTasks.forEach(task => {
      batch.set(doc(db, 'users', uid, 'tasks', task.id), task);
    });

    // 4. Seed Schedule (Calendar events)
    // Generate recurring calendar events for the next 7 days
    const calendarEvents: CalEvent[] = [];
    const now = new Date();
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(now);
      day.setDate(now.getDate() + i);
      const year = day.getFullYear();
      const month = day.getMonth();
      const date = day.getDate();

      // Standup 9:30 - 10:00
      const standupStart = new Date(year, month, date, 9, 30).getTime();
      const standupEnd = new Date(year, month, date, 10, 0).getTime();

      // Lunch 12:30 - 13:30
      const lunchStart = new Date(year, month, date, 12, 30).getTime();
      const lunchEnd = new Date(year, month, date, 13, 30).getTime();

      // 1:1 Manager 15:00 - 15:30
      const oneToOneStart = new Date(year, month, date, 15, 0).getTime();
      const oneToOneEnd = new Date(year, month, date, 15, 30).getTime();

      calendarEvents.push({
        id: `cal-standup-${i}`,
        title: "Team standup",
        startTimestamp: standupStart,
        endTimestamp: standupEnd,
        source: "mock"
      });

      calendarEvents.push({
        id: `cal-lunch-${i}`,
        title: "Lunch break",
        startTimestamp: lunchStart,
        endTimestamp: lunchEnd,
        source: "mock"
      });

      calendarEvents.push({
        id: `cal-1to1-${i}`,
        title: "1:1 with manager",
        startTimestamp: oneToOneStart,
        endTimestamp: oneToOneEnd,
        source: "mock"
      });
    }

    const scheduleRef = doc(db, 'users', uid, 'schedule', 'main');
    batch.set(scheduleRef, {
      calendarEvents,
      lastUpdated: Date.now()
    });

    await batch.commit();
    console.log('Seeding finished successfully');
  }
};

// Profile Listeners & Mutations
export const subscribeProfile = (uid: string, callback: (profile: Profile | null) => void) => {
  checkDb();
  return onSnapshot(doc(db, 'users', uid, 'profile', 'main'), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as Profile);
    } else {
      callback(null);
    }
  });
};

export const updateProfile = async (uid: string, data: Partial<Profile>) => {
  checkDb();
  const profileRef = doc(db, 'users', uid, 'profile', 'main');
  const snap = await getDoc(profileRef);
  if (!snap.exists()) {
    await setDoc(profileRef, data, { merge: true });
  } else {
    await updateDoc(profileRef, data);
  }
};

// Tasks Listeners & Mutations
export const subscribeTasks = (uid: string, callback: (tasks: Task[]) => void) => {
  checkDb();
  const tasksRef = collection(db, 'users', uid, 'tasks');
  return onSnapshot(tasksRef, (querySnap) => {
    const tasks: Task[] = [];
    querySnap.forEach((doc) => {
      tasks.push(doc.data() as Task);
    });
    callback(tasks);
  });
};

export const saveTask = async (uid: string, task: Task) => {
  checkDb();
  const taskRef = doc(db, 'users', uid, 'tasks', task.id);
  await setDoc(taskRef, task);
};

export const deleteTask = async (uid: string, taskId: string) => {
  checkDb();
  const taskRef = doc(db, 'users', uid, 'tasks', taskId);
  await deleteDoc(taskRef);
};

// Goals Listeners & Mutations
export const subscribeGoals = (uid: string, callback: (goals: Goal[]) => void) => {
  checkDb();
  const goalsRef = collection(db, 'users', uid, 'goals');
  return onSnapshot(goalsRef, (querySnap) => {
    const goals: Goal[] = [];
    querySnap.forEach((doc) => {
      goals.push(doc.data() as Goal);
    });
    callback(goals);
  });
};

export const saveGoal = async (uid: string, goal: Goal) => {
  checkDb();
  const goalRef = doc(db, 'users', uid, 'goals', goal.id);
  await setDoc(goalRef, goal);
};

// Schedule Listeners & Mutations
export const subscribeSchedule = (uid: string, callback: (schedule: Schedule | null) => void) => {
  checkDb();
  return onSnapshot(doc(db, 'users', uid, 'schedule', 'main'), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as Schedule);
    } else {
      callback(null);
    }
  });
};

export const saveSchedule = async (uid: string, calendarEvents: CalEvent[]) => {
  checkDb();
  const scheduleRef = doc(db, 'users', uid, 'schedule', 'main');
  await setDoc(scheduleRef, {
    calendarEvents,
    lastUpdated: Date.now()
  });
};
