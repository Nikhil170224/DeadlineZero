import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange, signInWithGoogle } from './firebase/auth';
import { isFirebaseConfigured, firebaseProjectID } from './firebase/config';
import { useProfile } from './hooks/useProfile';
import { useTasks } from './hooks/useTasks';
import { useSchedule } from './hooks/useSchedule';
import { useCountdown } from './hooks/useCountdown';
import { useGemini } from './hooks/useGemini';
import { Task, Goal, CalEvent } from './firebase/firestore';

// Layout & Navigation
import Navbar from './components/layout/Navbar';
import FAB from './components/layout/FAB';
import ToastStack, { ToastItem } from './components/layout/ToastStack';

// Pages
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Insights from './pages/Insights';
import Goals from './pages/Goals';
import Settings from './pages/Settings';

// Modals / Panels
import AddTaskPanel from './components/addtask/AddTaskPanel';
import CheckInModal from './components/checkin/CheckInModal';
import DeadlineModal from './components/checkin/DeadlineModal';

// Icons
import { Hourglass, AlertCircle, WifiOff } from 'lucide-react';

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  // Panel & Modal States
  const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false);
  const [checkInTask, setCheckInTask] = useState<Task | null>(null);
  const [deadlineTask, setDeadlineTask] = useState<Task | null>(null);

  // Global Toast State
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Listen for online status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen for auth change
  useEffect(() => {
    setAuthLoading(true);
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Custom Hooks
  const uid = user ? user.uid : null;
  const { profile, updateProfile } = useProfile(uid);
  const { tasks, goals, saveTask, deleteTask, saveGoal } = useTasks(uid);
  const { schedule, updateScheduleEvents, triggerRebuildSchedule, undoScheduleChange, canUndo, setCanUndo } = useSchedule(uid, tasks, profile);
  const { simulatedNowMs, fastForwardHours, triggerDeadlineNow } = useCountdown(
    uid,
    tasks,
    profile,
    saveTask,
    // Warning Toast trigger
    (type, task) => {
      const id = `${task.id}-${type}-${Date.now()}`;
      setToasts(prev => [...prev, { id, type, taskTitle: task.title, timestamp: Date.now() }]);
      // Auto dismiss after 8 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 8000);
    },
    // Deadline trigger
    (task) => {
      setDeadlineTask(task);
    },
    triggerRebuildSchedule
  );

  const addToast = (type: 'schedule-updated' | '24h' | '6h' | '1h', taskTitle: string) => {
    const id = `${type}-${Date.now()}`;
    setToasts(prev => [...prev, { id, type, taskTitle, timestamp: Date.now() }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 8000);
  };

  const handleUndo = async () => {
    await undoScheduleChange();
    addToast('schedule-updated', 'Schedule reverted successfully.');
  };

  // Google OAuth Login
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  // Safe checks for unconfigured Firebase
  if (!isFirebaseConfigured) {
    return (
      <div className="min-h-screen bg-surface-alt flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full bg-white border border-border border-0.5 rounded-2xl p-8 shadow-sm text-center">
          <AlertCircle className="h-12 w-12 text-danger mx-auto mb-4" />
          <h1 className="text-xl font-semibold mb-2">Firebase Config Missing</h1>
          <p className="text-text-secondary text-sm mb-6 leading-relaxed">
            Please add your Firebase environment variables to the <strong>.env.local</strong> file in the project root to run the application.
          </p>
          <div className="bg-surface-alt p-4 rounded-xl text-left font-mono text-xs text-text-secondary border border-border border-0.5 space-y-2">
            <div>VITE_FIREBASE_API_KEY=your-api-key</div>
            <div>VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain</div>
            <div>VITE_FIREBASE_PROJECT_ID=your-project-id</div>
            <div>VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket</div>
            <div>VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id</div>
            <div>VITE_FIREBASE_APP_ID=your-app-id</div>
          </div>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-surface-alt flex flex-col justify-center items-center">
        <Hourglass className="h-10 w-10 text-primary animate-spin mb-4" />
        <span className="text-sm font-medium text-text-secondary">Securing workspace session...</span>
      </div>
    );
  }

  // Auth Wall screen
  if (!user) {
    return (
      <div className="min-h-screen bg-surface-alt flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Hourglass className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-extrabold text-text-primary tracking-tight">
            DeadlineZero
          </h2>
          <p className="mt-2 text-sm text-text-secondary px-4">
            The Last-Minute Life Saver. Schedules, prioritises, and acts before tasks are missed.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
          <div className="bg-white py-8 px-6 border border-border border-0.5 rounded-2xl shadow-sm space-y-6">
            <p className="text-sm text-text-secondary text-center leading-relaxed">
              Welcome back! Please sign in with your Google account to access your AI productivity companion.
            </p>
            
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center space-x-3 bg-white border border-border border-0.5 py-2.5 rounded-lg text-text-primary font-medium hover:bg-surface-alt transition-colors shadow-sm cursor-pointer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.04c1.67 0 3.2.58 4.38 1.71l3.27-3.27C17.67 1.6 15 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.86 3C6.3 7.55 8.94 5.04 12 5.04z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.8-.07-1.56-.2-2.3H12v4.35h6.44c-.28 1.47-1.1 2.72-2.35 3.56l3.66 2.84c2.14-1.98 3.39-4.88 3.39-8.45z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.36 10.5C5.12 11.23 5 12 5 12s.12.77.36 1.5l-3.86 3C.56 15.02 0 13.58 0 12s.56-3.02 1.5-4.5l3.86 3z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.66-2.84c-1.1.74-2.5 1.18-4.3 1.18-3.06 0-5.7-2.51-6.63-5.46l-3.86 3C3.4 20.35 7.35 23 12 23z"
                />
              </svg>
              <span>Sign In with Google</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-border border-0.5"></div>
              <span className="flex-shrink mx-4 text-text-muted text-xs font-medium">OR</span>
              <div className="flex-grow border-t border-border border-0.5"></div>
            </div>

            <button
              type="button"
              id="btn-guest-login"
              onClick={() => {
                setUser({
                  uid: 'demo-judge-user',
                  displayName: 'Judge Evaluator',
                  email: 'judge@example.com',
                  photoURL: '',
                  emailVerified: true
                } as any);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-2.5 rounded-lg text-text-primary font-medium hover:bg-primary-dark transition-colors shadow-sm cursor-pointer text-sm"
            >
              <span>Instant Guest/Judge Sign-In</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <Dashboard
            tasks={tasks}
            goals={goals}
            profile={profile}
            simulatedNowMs={simulatedNowMs}
            onCheckIn={(task) => setCheckInTask(task)}
            onToggleDone={async (task) => {
              const updated = {
                ...task,
                completionPct: task.completionPct === 100 ? 0 : 100,
                status: task.completionPct === 100 ? ('active' as const) : ('done' as const)
              };
              await saveTask(updated);
              await triggerRebuildSchedule(simulatedNowMs);
              addToast('schedule-updated', `Task "${task.title}" updated.`);
            }}
            onAddTaskClick={() => setIsAddTaskOpen(true)}
          />
        );
      case 'schedule':
        return (
          <Schedule
            tasks={tasks}
            calendarEvents={schedule?.calendarEvents || []}
            profile={profile}
            simulatedNowMs={simulatedNowMs}
          />
        );
      case 'insights':
        return (
          <Insights
            tasks={tasks}
          />
        );
      case 'goals':
        return (
          <Goals
            tasks={tasks}
            goals={goals}
            saveGoal={saveGoal}
            saveTask={saveTask}
          />
        );
      case 'settings':
        return (
          <Settings
            user={user}
            profile={profile}
            schedule={schedule}
            updateProfile={updateProfile}
            updateScheduleEvents={updateScheduleEvents}
            fastForwardHours={fastForwardHours}
            triggerDeadlineNow={triggerDeadlineNow}
            triggerRebuildSchedule={() => triggerRebuildSchedule(simulatedNowMs)}
          />
        );
      default:
        return <div className="p-8">Screen not found</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-danger text-white text-xs text-center py-1.5 flex items-center justify-center space-x-1.5 font-medium z-50">
          <WifiOff className="h-3.5 w-3.5" />
          <span>You're offline — changes will sync when reconnected</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        user={user}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        profileName={profile?.name}
        profilePhotoURL={profile?.photoURL}
      />

      {/* Main Layout Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {renderActiveTab()}
      </main>

      {/* Floating Action Button */}
      <FAB onClick={() => setIsAddTaskOpen(true)} />

      {/* Toast Warnings & Undos */}
      <ToastStack
        toasts={toasts}
        onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
        onUndo={canUndo ? handleUndo : undefined}
      />

      {/* Screen 2: Add Task Panel (Right-side drawer) */}
      <AddTaskPanel
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        uid={uid}
        goals={goals}
        saveTask={saveTask}
        triggerRebuildSchedule={async () => {
          await triggerRebuildSchedule(simulatedNowMs);
          addToast('schedule-updated', 'Schedule updated with new task.');
        }}
      />

      {/* Screen 4: Check-in Overlay Modal */}
      {checkInTask && (
        <CheckInModal
          task={checkInTask}
          isOpen={!!checkInTask}
          onClose={() => setCheckInTask(null)}
          uid={uid}
          saveTask={saveTask}
          simulatedNowMs={simulatedNowMs}
          triggerRebuildSchedule={async (hasEscalated) => {
            await triggerRebuildSchedule(simulatedNowMs);
            if (hasEscalated) {
              addToast('1h', checkInTask.title);
            } else {
              addToast('schedule-updated', `Progress saved on "${checkInTask.title}".`);
            }
          }}
        />
      )}

      {/* Screen 4: Deadline Reached Modal (Full screen overlay) */}
      {deadlineTask && (
        <DeadlineModal
          task={deadlineTask}
          isOpen={!!deadlineTask}
          simulatedNowMs={simulatedNowMs}
          saveTask={saveTask}
          triggerRebuildSchedule={async () => {
            await triggerRebuildSchedule(simulatedNowMs);
            addToast('schedule-updated', `Schedule rebuilt. Deadline extended.`);
          }}
          onClose={() => setDeadlineTask(null)}
        />
      )}
    </div>
  );
}
export default App;
