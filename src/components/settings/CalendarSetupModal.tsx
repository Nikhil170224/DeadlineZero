import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, AlertTriangle } from 'lucide-react';

interface CalendarSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendarSetupModal({ isOpen, onClose }: CalendarSetupModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-20 max-w-md mx-auto bg-white rounded-2xl shadow-xl z-50 overflow-hidden border border-border border-0.5"
          >
            <div className="p-4 border-b border-border border-0.5 flex justify-between items-center bg-surface-alt">
              <h3 className="text-sm font-bold text-text-primary flex items-center space-x-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Connect Google Calendar</span>
              </h3>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5 text-text-secondary cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="bg-primary-light/45 border border-primary/20 border-0.5 p-3 rounded-lg flex items-start space-x-2 text-primary font-medium">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Google Calendar synchronization is pre-wired in the core scheduling architecture.</span>
              </div>

              <div className="space-y-3">
                <span className="font-bold text-text-primary">Required steps to activate production sync:</span>
                
                <ol className="list-decimal list-inside space-y-2 text-text-secondary leading-relaxed pl-1 font-medium">
                  <li>
                    Enable the <strong className="text-text-primary">Google Calendar API</strong> in your Google Cloud Developer Console.
                  </li>
                  <li>
                    Create an OAuth 2.0 Client ID and add it to your <strong className="text-text-primary">.env.local</strong> config:
                    <div className="bg-surface-alt p-2 rounded-lg font-mono text-[10px] mt-1 border border-border border-0.5">
                      VITE_GOOGLE_CALENDAR_CLIENT_ID=your-client-id
                    </div>
                  </li>
                  <li>
                    Trigger authentication using the Google Calendar Connect flow. Task slots will then synchronize in real-time.
                  </li>
                </ol>
              </div>

              <div className="pt-2 border-t border-border border-0.5 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-primary text-xs"
                >
                  Close Setup
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
export default CalendarSetupModal;
