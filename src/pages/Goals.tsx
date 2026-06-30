import React, { useState } from 'react';
import { Goal, Task } from '../firebase/firestore';
import GoalCard from '../components/goals/GoalCard';
import HabitTracker from '../components/goals/HabitTracker';
import StreakBadge from '../components/goals/StreakBadge';
import { Target, Plus, X, Calendar, Flame, AlertCircle } from 'lucide-react';

interface GoalsProps {
  tasks: Task[];
  goals: Goal[];
  saveGoal: (goal: Goal) => Promise<void>;
  saveTask: (task: Task) => Promise<void>;
}

export function Goals({ tasks, goals, saveGoal, saveTask }: GoalsProps) {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Form states
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [targetDate, setTargetDate] = useState<string>('');
  const [isHabit, setIsHabit] = useState<boolean>(false);
  const [habitFrequency, setHabitFrequency] = useState<'daily' | 'weekly'>('daily');
  const [selectedColor, setSelectedColor] = useState<string>('#185FA5');

  const presetColors = [
    '#185FA5', // Primary Blue
    '#3B6D11', // Success Green
    '#A32D2D', // Danger Red
    '#BA7517', // Warning Amber
    '#6b21a8', // Purple
    '#0f766e'  // Teal
  ];

  const handleSaveGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetDate) return;

    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title,
      description,
      targetDate: new Date(targetDate).getTime(),
      isHabit,
      habitFrequency: isHabit ? habitFrequency : null,
      completedDates: [],
      currentStreak: 0,
      longestStreak: 0,
      linkedTaskIds: [],
      color: selectedColor,
      createdAt: Date.now()
    };

    try {
      await saveGoal(newGoal);
      setIsFormOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTargetDate('');
    setIsHabit(false);
    setHabitFrequency('daily');
    setSelectedColor('#185FA5');
  };

  // Log completion helper for habits
  const handleLogCompletion = async (goal: Goal) => {
    const today = new Date();
    const todayMs = today.getTime();
    
    const completedDates = [...(goal.completedDates || [])];
    
    // Check if already completed today
    const alreadyCompleted = completedDates.some(timestamp => {
      const d = new Date(timestamp);
      return d.getDate() === today.getDate() &&
             d.getMonth() === today.getMonth() &&
             d.getFullYear() === today.getFullYear();
    });

    if (alreadyCompleted) return;

    completedDates.push(todayMs);

    // Calculate streak
    let newStreak = goal.currentStreak + 1;
    let newLongest = Math.max(goal.longestStreak, newStreak);

    // Update goal
    const updatedGoal: Goal = {
      ...goal,
      completedDates,
      currentStreak: newStreak,
      longestStreak: newLongest
    };

    await saveGoal(updatedGoal);
  };

  const habits = goals.filter(g => g.isHabit);
  const milestones = goals.filter(g => !g.isHabit);

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-text-primary">Goals & Habits Tracker</h2>
          <p className="text-xs text-text-secondary">
            Set long-term milestones or recurring daily/weekly habits.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary text-xs flex items-center space-x-1.5 h-9 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Habit contribution grid */}
      <HabitTracker goals={goals} />

      {/* Active Streak Section */}
      {habits.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-text-secondary flex items-center space-x-1.5">
            <Flame className="h-4 w-4 text-orange-500" />
            <span>Active Habits & Streaks</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <div key={habit.id} className="card-style bg-white border-0.5 p-4 flex items-center justify-between">
                <div className="space-y-1 flex-1 pr-3">
                  <span className="text-xs font-bold text-text-primary line-clamp-1">{habit.title}</span>
                  <span className="text-[10px] text-text-muted capitalize block">Fires {habit.habitFrequency}</span>
                </div>
                <StreakBadge currentStreak={habit.currentStreak} longestStreak={habit.longestStreak} compact />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Goals/Habits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            tasks={tasks}
            onLogCompletion={handleLogCompletion}
          />
        ))}
      </div>

      {/* Add Goal Modal Dialog */}
      {isFormOpen && (
        <>
          <div className="fixed inset-0 bg-black/45 z-40" onClick={() => setIsFormOpen(false)} />
          
          <div className="fixed inset-x-4 top-14 max-w-md mx-auto bg-white rounded-2xl shadow-xl z-50 overflow-hidden border border-border border-0.5 max-h-[85vh] flex flex-col">
            <div className="p-4 border-b border-border border-0.5 flex justify-between items-center bg-surface-alt">
              <h3 className="text-sm font-bold text-text-primary flex items-center space-x-1.5">
                <Target className="h-4 w-4 text-primary" />
                <span>Add Goal / Habit</span>
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 rounded-full hover:bg-black/5 text-text-secondary cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveGoal} className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-text-secondary">Goal Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Launch Personal Blog"
                  required
                  className="w-full input-field text-xs"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-text-secondary">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details and motivation..."
                  className="w-full input-field h-[60px] p-3 text-xs leading-relaxed resize-none"
                />
              </div>

              {/* Target Date */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-text-secondary">Target Completion Date</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  required
                  className="w-full input-field text-xs"
                />
              </div>

              {/* Habit Toggle */}
              <div className="flex items-center justify-between py-2 border-y border-border border-0.5 border-dashed">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-text-primary block">Is this a habit?</span>
                  <span className="text-[10px] text-text-secondary block">Track recurring progress streaks.</span>
                </div>
                <input
                  type="checkbox"
                  checked={isHabit}
                  onChange={(e) => setIsHabit(e.target.checked)}
                  className="h-4 w-4 rounded text-primary focus:ring-primary cursor-pointer"
                />
              </div>

              {/* Habit frequency (if habit) */}
              {isHabit && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="text-xs font-medium text-text-secondary">Frequency</label>
                  <div className="flex bg-surface-alt rounded-lg p-0.5 border border-border border-0.5 w-fit">
                    <button
                      type="button"
                      onClick={() => setHabitFrequency('daily')}
                      className={`px-3 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-colors ${
                        habitFrequency === 'daily' ? 'bg-white text-text-primary shadow-sm' : 'text-text-secondary'
                      }`}
                    >
                      Daily
                    </button>
                    <button
                      type="button"
                      onClick={() => setHabitFrequency('weekly')}
                      className={`px-3 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-colors ${
                        habitFrequency === 'weekly' ? 'bg-white text-text-primary shadow-sm' : 'text-text-secondary'
                      }`}
                    >
                      Weekly
                    </button>
                  </div>
                </div>
              )}

              {/* Color Picker */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-text-secondary block">Card Theme Color</label>
                <div className="flex items-center space-x-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`h-6 w-6 rounded-full border border-0.5 cursor-pointer transition-all duration-150 ${
                        selectedColor === color ? 'scale-125 ring-2 ring-primary ring-offset-1' : 'opacity-70 hover:opacity-100'
                      }`}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 btn-secondary text-xs h-10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary text-xs h-10"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
export default Goals;
