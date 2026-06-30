import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../../firebase/firestore';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface UrgencyStripProps {
  tasks: Task[];
  simulatedNowMs: number;
  onCheckIn: (task: Task) => void;
}

export function UrgencyStrip({ tasks, simulatedNowMs, onCheckIn }: UrgencyStripProps) {
  // Filter active tasks due within 24h (1440 minutes)
  const urgencyTasks = tasks.filter(task => {
    if (task.status === 'done') return false;
    const msLeft = task.deadlineTimestamp - simulatedNowMs;
    // Include overdue tasks (msLeft <= 0) and tasks due within 24h
    return msLeft <= 24 * 3600000;
  });

  // Sort by deadline ascending
  const sortedTasks = [...urgencyTasks].sort((a, b) => a.deadlineTimestamp - b.deadlineTimestamp);

  const getUrgencyDetails = (msLeft: number) => {
    if (msLeft <= 0) {
      return {
        label: 'Overdue',
        badgeClass: 'bg-red-900/10 text-red-900 border-red-900/20',
        borderClass: 'border-l-4 border-l-red-900',
        textClass: 'text-red-900'
      };
    }
    const minsLeft = msLeft / 60000;
    if (minsLeft <= 60) {
      return {
        label: 'Critical',
        badgeClass: 'bg-danger-light text-danger border-danger/20',
        borderClass: 'border-l-4 border-l-danger',
        textClass: 'text-danger'
      };
    }
    if (minsLeft <= 360) {
      return {
        label: 'At Risk',
        badgeClass: 'bg-warning-light text-warning border-warning/20',
        borderClass: 'border-l-4 border-l-warning',
        textClass: 'text-warning'
      };
    }
    return {
      label: 'On Track',
      badgeClass: 'bg-success-light text-success border-success/20',
      borderClass: 'border-l-4 border-l-success',
      textClass: 'text-success'
    };
  };

  const formatCountdown = (msLeft: number) => {
    if (msLeft <= 0) {
      const absMs = Math.abs(msLeft);
      const hours = Math.floor(absMs / 3600000);
      const mins = Math.floor((absMs % 3600000) / 60000);
      return `Overdue by ${hours}h ${mins}m`;
    }
    const hours = Math.floor(msLeft / 3600000);
    const mins = Math.floor((msLeft % 3600000) / 60000);
    const secs = Math.floor((msLeft % 60000) / 1000);

    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
  };

  if (sortedTasks.length === 0) {
    return (
      <div className="card-style bg-white flex items-center justify-center p-6 text-center border-dashed">
        <div className="flex flex-col items-center space-y-2">
          <CheckCircle2 className="h-8 w-8 text-success" />
          <span className="text-sm font-semibold text-text-primary">All clear for now</span>
          <span className="text-xs text-text-secondary">No active tasks are due in the next 24 hours.</span>
        </div>
      </div>
    );
  }

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }
  };

  return (
    <div className="space-y-2.5">
      <h3 className="text-sm font-semibold text-text-secondary flex items-center space-x-1.5">
        <AlertCircle className="h-4 w-4 text-warning" />
        <span>Urgent Deadlines (Next 24h)</span>
      </h3>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex space-x-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-border"
      >
        {sortedTasks.map((task) => {
          const msLeft = task.deadlineTimestamp - simulatedNowMs;
          const details = getUrgencyDetails(msLeft);

          return (
            <motion.div
              key={task.id}
              variants={cardVariants}
              onClick={() => onCheckIn(task)}
              className={`flex-shrink-0 w-72 card-style cursor-pointer hover:shadow-md transition-all duration-200 ${details.borderClass} flex flex-col justify-between`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-semibold text-text-primary truncate max-w-[170px]" title={task.title}>
                    {task.title}
                  </h4>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${details.badgeClass}`}>
                    {details.label}
                  </span>
                </div>

                <div className="text-xl font-bold tracking-tabular font-mono text-text-primary">
                  {formatCountdown(msLeft)}
                </div>
              </div>

              {/* Completion percentage bar */}
              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-[10px] font-medium text-text-secondary">
                  <span>Completion</span>
                  <span>{task.completionPct}%</span>
                </div>
                <div className="w-full bg-surface-alt rounded-full h-1.5 overflow-hidden border border-border border-0.5">
                  <div
                    className="bg-primary h-full transition-all duration-200"
                    style={{ width: `${task.completionPct}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
export default UrgencyStrip;
