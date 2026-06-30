import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, Goal } from '../../firebase/firestore';
import TaskCard from './TaskCard';
import { Sparkles, CalendarPlus, Trophy } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  goals: Goal[];
  simulatedNowMs: number;
  onCheckIn: (task: Task) => void;
  onToggleDone: (task: Task) => void;
  onAcceptAISuggestion?: (task: Task) => void;
  onDismissAISuggestion?: (task: Task) => void;
  onAddTaskClick: () => void;
}

export function TaskList({
  tasks,
  goals,
  simulatedNowMs,
  onCheckIn,
  onToggleDone,
  onAcceptAISuggestion,
  onDismissAISuggestion,
  onAddTaskClick
}: TaskListProps) {
  // Sort tasks by priorityScore descending
  const sortedTasks = [...tasks]
    .filter(t => t.status !== 'done')
    .sort((a, b) => b.priorityScore - a.priorityScore);

  const doneTasks = tasks.filter(t => t.status === 'done');

  // Empty State: zero tasks total
  if (tasks.length === 0) {
    return (
      <div className="card-style bg-white p-12 text-center border-dashed border-2 flex flex-col items-center justify-center space-y-4">
        <div className="bg-primary-light p-4 rounded-full text-primary">
          <CalendarPlus className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-bold text-text-primary">Track your first task</h2>
        <p className="text-sm text-text-secondary max-w-sm mx-auto">
          Add a goal or deadline and DeadlineZero's AI will schedule it for you automatically.
        </p>
        <button onClick={onAddTaskClick} className="btn-primary flex items-center space-x-2 text-xs">
          <span>+ Add Task</span>
        </button>
      </div>
    );
  }

  // Celebration state: tasks exist but all tasks are complete
  if (sortedTasks.length === 0 && doneTasks.length > 0) {
    return (
      <div className="card-style bg-success-light/50 border border-success/20 border-0.5 p-8 text-center flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
        {/* Simple confetti particles */}
        <div className="absolute top-2 left-6 text-xl animate-bounce">🎉</div>
        <div className="absolute top-6 right-8 text-lg animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
        <div className="absolute bottom-4 left-10 text-xl animate-bounce" style={{ animationDelay: '0.4s' }}>🥳</div>
        <div className="absolute bottom-2 right-12 text-lg animate-bounce" style={{ animationDelay: '0.1s' }}>🎈</div>

        <div className="bg-success-light p-4 rounded-full text-success">
          <Trophy className="h-8 w-8 animate-pulse" />
        </div>
        <h2 className="text-lg font-bold text-success flex items-center justify-center space-x-1.5">
          <span>All Clear! You're on top of everything</span>
        </h2>
        <p className="text-xs text-text-secondary max-w-md leading-relaxed">
          Amazing work. Every task is finished and your schedule is clean. Enjoy the free time!
        </p>
        <button onClick={onAddTaskClick} className="btn-primary text-xs bg-success hover:bg-emerald-800">
          <span>Add New Goal or Task</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-text-secondary flex items-center space-x-1.5">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>Action Queue (Prioritised by AI & Urgency)</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {sortedTasks.map((task) => {
            const linkedGoal = goals.find(g => g.id === task.goalId);
            return (
              <TaskCard
                key={task.id}
                task={task}
                simulatedNowMs={simulatedNowMs}
                onCheckIn={onCheckIn}
                onToggleDone={onToggleDone}
                onAcceptAISuggestion={onAcceptAISuggestion}
                onDismissAISuggestion={onDismissAISuggestion}
                goalName={linkedGoal?.title}
                goalColor={linkedGoal?.color}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
export default TaskList;
