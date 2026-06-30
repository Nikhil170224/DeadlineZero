import { useState, useEffect } from 'react';
import { Task, Goal, subscribeTasks, subscribeGoals, saveTask as dbSaveTask, deleteTask as dbDeleteTask, saveGoal as dbSaveGoal } from '../firebase/firestore';
import { isFirebaseConfigured } from '../firebase/config';

export function useTasks(uid: string | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid || !isFirebaseConfigured) {
      setTasks([]);
      setGoals([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribeTasks = subscribeTasks(uid, (data) => {
      setTasks(data);
    });

    const unsubscribeGoals = subscribeGoals(uid, (data) => {
      setGoals(data);
      setLoading(false);
    });

    return () => {
      unsubscribeTasks();
      unsubscribeGoals();
    };
  }, [uid]);

  const saveTask = async (task: Task) => {
    if (!uid) return;
    try {
      await dbSaveTask(uid, task);
    } catch (err: any) {
      console.error('Save task error:', err);
      setError(err.message || 'Failed to save task');
      throw err;
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!uid) return;
    try {
      await dbDeleteTask(uid, taskId);
    } catch (err: any) {
      console.error('Delete task error:', err);
      setError(err.message || 'Failed to delete task');
      throw err;
    }
  };

  const saveGoal = async (goal: Goal) => {
    if (!uid) return;
    try {
      await dbSaveGoal(uid, goal);
    } catch (err: any) {
      console.error('Save goal error:', err);
      setError(err.message || 'Failed to save goal');
      throw err;
    }
  };

  return { tasks, goals, loading, error, saveTask, deleteTask, saveGoal };
}
