import React, { useEffect } from 'react';
import { X, Undo, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export interface ToastItem {
  id: string;
  type: 'schedule-updated' | '24h' | '6h' | '1h';
  taskTitle: string;
  timestamp: number;
}

interface ToastStackProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  onUndo?: () => void;
}

export function ToastStack({ toasts, onDismiss, onUndo }: ToastStackProps) {
  // Take last 4 toasts
  const visibleToasts = toasts.slice(-4);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {visibleToasts.map((toast) => {
          let bgClass = 'bg-white border-0.5';
          let borderClass = 'border-border';
          let textClass = 'text-text-primary';
          let icon = <Info className="h-5 w-5 text-primary" />;

          switch (toast.type) {
            case 'schedule-updated':
              bgClass = 'bg-primary-light border-primary/20 border-0.5';
              borderClass = 'border-primary/20';
              icon = <Info className="h-5 w-5 text-primary" />;
              break;
            case '24h':
              bgClass = 'bg-amber-50 border-warning/20 border-0.5';
              borderClass = 'border-warning/20';
              icon = <AlertTriangle className="h-5 w-5 text-warning" />;
              break;
            case '6h':
              bgClass = 'bg-orange-50 border-orange-200 border-0.5';
              borderClass = 'border-orange-200';
              icon = <AlertTriangle className="h-5 w-5 text-orange-600" />;
              break;
            case '1h':
              bgClass = 'bg-red-50 border-danger/20 border-0.5';
              borderClass = 'border-danger/20';
              icon = <ShieldAlert className="h-5 w-5 text-danger" />;
              break;
          }

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`p-4 rounded-xl shadow-sm flex items-start space-x-3 pointer-events-auto ${bgClass} ${borderClass} ${textClass}`}
            >
              <div className="flex-shrink-0 mt-0.5">{icon}</div>
              
              <div className="flex-1 text-sm font-medium">
                {toast.type === 'schedule-updated' ? (
                  <div className="flex flex-col space-y-1.5">
                    <span>Schedule updated</span>
                    {onUndo && (
                      <button
                        onClick={() => {
                          onUndo();
                          onDismiss(toast.id);
                        }}
                        className="flex items-center space-x-1 text-xs text-primary hover:underline font-semibold cursor-pointer w-fit"
                      >
                        <Undo className="h-3 w-3" />
                        <span>Undo</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <span className="font-semibold block mb-0.5">
                      {toast.type === '1h'
                        ? '1h — CRITICAL WARNING'
                        : toast.type === '6h'
                        ? '6h Warning'
                        : '24h Warning'}
                    </span>
                    <span className="text-xs text-text-secondary line-clamp-2">
                      {toast.taskTitle}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="flex-shrink-0 text-text-muted hover:text-text-primary p-0.5 rounded-full hover:bg-black/5 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
export default ToastStack;
