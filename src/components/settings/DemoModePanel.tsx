import React from 'react';
import { Play, FastForward, HelpCircle, ShieldAlert } from 'lucide-react';
import { Profile } from '../../firebase/firestore';

interface DemoModePanelProps {
  profile: Profile | null;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  fastForwardHours: (hours: number) => void;
  triggerDeadlineNow: () => Promise<void>;
}

export function DemoModePanel({
  profile,
  updateProfile,
  fastForwardHours,
  triggerDeadlineNow
}: DemoModePanelProps) {
  const isDemo = profile?.demoMode || false;
  const speed = profile?.demoSpeedMultiplier || 1;

  const handleToggle = async () => {
    await updateProfile({ demoMode: !isDemo });
  };

  const handleSpeedChange = async (val: number) => {
    await updateProfile({ demoSpeedMultiplier: val });
  };

  return (
    <div className="card-style bg-white border border-border border-0.5 space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-border border-0.5">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-text-primary flex items-center space-x-1.5">
            <ShieldAlert className="h-4 w-4 text-warning" />
            <span>Judge Demo Controls</span>
          </h3>
          <p className="text-[11px] text-text-secondary">Accelerate simulated clock speed to verify real-time scheduling warnings.</p>
        </div>

        {/* Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isDemo}
            onChange={handleToggle}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      {isDemo && (
        <div className="space-y-4 animate-fadeIn text-xs">
          {/* Speed Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span className="text-text-secondary">Time Simulation Speed</span>
              <span className="text-primary font-bold">{speed}x</span>
            </div>
            
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => handleSpeedChange(parseInt(e.target.value) || 1)}
              className="w-full h-1.5 bg-surface-alt rounded-lg appearance-none cursor-pointer accent-primary"
            />
            
            <span className="text-[10px] text-text-muted italic block">
              1 real second = {speed} simulated seconds ({ (speed / 60).toFixed(1) } simulated mins/sec)
            </span>
          </div>

          {/* Rapid Simulation Override Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => fastForwardHours(6)}
              className="btn-secondary h-10 flex items-center justify-center space-x-1.5 font-bold cursor-pointer text-xs"
            >
              <FastForward className="h-4 w-4 text-primary" />
              <span>Fast-Forward 6h</span>
            </button>

            <button
              onClick={triggerDeadlineNow}
              className="btn-danger h-10 flex items-center justify-center space-x-1.5 font-bold cursor-pointer text-xs"
            >
              <ShieldAlert className="h-4 w-4 text-white" />
              <span>Trigger Deadline NOW</span>
            </button>
          </div>

          <div className="bg-amber-50 border border-warning/10 border-0.5 p-3 rounded-lg flex items-start space-x-2 text-warning">
            <HelpCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] leading-relaxed">
              <strong>Demo Explanation:</strong> Fast forwarding 6h triggers warning notifications immediately in the toast stack. Trigger Deadline forces the closest task deadline to pass, opening the undismissable recovery planner modal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default DemoModePanel;
