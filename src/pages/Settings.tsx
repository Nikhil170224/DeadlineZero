import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { Profile, Schedule, CalEvent } from '../firebase/firestore';
import DemoModePanel from '../components/settings/DemoModePanel';
import CalendarSetupModal from '../components/settings/CalendarSetupModal';
import { User as UserIcon, Clock, Bell, Calendar, HelpCircle, Save, Plus, Trash2 } from 'lucide-react';
import { firebaseProjectID, buildTimestamp, appVersion } from '../firebase/config';

interface SettingsProps {
  user: User | null;
  profile: Profile | null;
  schedule: Schedule | null;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  updateScheduleEvents: (events: CalEvent[]) => Promise<void>;
  fastForwardHours: (hours: number) => void;
  triggerDeadlineNow: () => Promise<void>;
  triggerRebuildSchedule: () => Promise<void>;
}

export function Settings({
  user,
  profile,
  schedule,
  updateProfile,
  updateScheduleEvents,
  fastForwardHours,
  triggerDeadlineNow,
  triggerRebuildSchedule
}: SettingsProps) {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(profile?.name || user?.displayName || '');
  const [startHour, setStartHour] = useState<number>(profile?.workStartHour || 9);
  const [endHour, setEndHour] = useState<number>(profile?.workEndHour || 18);

  // Warning sliders (warning thresholds in minutes)
  const [warn24, setWarn24] = useState<number>(1440); // 24h
  const [warn6, setWarn6] = useState<number>(360);   // 6h
  const [warn1, setWarn1] = useState<number>(60);    // 1h

  // Add mock event states
  const [mockTitle, setMockTitle] = useState<string>('');
  const [mockDate, setMockDate] = useState<string>('');
  const [mockStartTime, setMockStartTime] = useState<string>('');
  const [mockEndTime, setMockEndTime] = useState<string>('');

  const handleNameBlur = async () => {
    if (userName.trim() && userName !== profile?.name) {
      await updateProfile({ name: userName.trim() });
    }
  };

  const handleWorkHoursSave = async () => {
    await updateProfile({
      workStartHour: startHour,
      workEndHour: endHour
    });
    // Trigger rebuild of schedule with new work hours
    await triggerRebuildSchedule();
  };

  const handleAddMockEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mockTitle || !mockDate || !mockStartTime || !mockEndTime) return;

    const startTimestamp = new Date(`${mockDate}T${mockStartTime}`).getTime();
    const endTimestamp = new Date(`${mockDate}T${mockEndTime}`).getTime();

    const newEvent: CalEvent = {
      id: `mock-event-${Date.now()}`,
      title: mockTitle,
      startTimestamp,
      endTimestamp,
      source: 'mock'
    };

    const currentEvents = schedule?.calendarEvents || [];
    const updatedEvents = [...currentEvents, newEvent];

    await updateScheduleEvents(updatedEvents);
    await triggerRebuildSchedule();

    // Reset fields
    setMockTitle('');
    setMockDate('');
    setMockStartTime('');
    setMockEndTime('');
  };

  const handleDeleteMockEvent = async (id: string) => {
    const currentEvents = schedule?.calendarEvents || [];
    const updatedEvents = currentEvents.filter(e => e.id !== id);
    await updateScheduleEvents(updatedEvents);
    await triggerRebuildSchedule();
  };

  const formatEventDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-text-primary">System Settings</h2>
        <p className="text-xs text-text-secondary">Configure profile, work slots, mocks, and warnings thresholds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Personal details & Work settings */}
        <div className="space-y-6">
          {/* Personal Settings */}
          <div className="card-style bg-white border border-border border-0.5 space-y-4">
            <h3 className="text-xs font-bold text-text-primary flex items-center space-x-1.5 pb-2 border-b border-border border-0.5">
              <UserIcon className="h-4 w-4 text-primary" />
              <span>Personal Details</span>
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-text-secondary block">Display Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onBlur={handleNameBlur}
                  placeholder="e.g. John Doe"
                  className="w-full input-field text-xs"
                />
                <span className="text-[10px] text-text-muted italic block">Saves automatically on field blur.</span>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={userName}
                    className="h-10 w-10 rounded-full border border-border border-0.5"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-base">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-[11px]">
                  <span className="font-semibold text-text-primary block">Profile Picture</span>
                  <span className="text-text-muted font-normal block">Google OAuth synchronized (read-only).</span>
                </div>
              </div>
            </div>
          </div>

          {/* Work Hours Settings */}
          <div className="card-style bg-white border border-border border-0.5 space-y-4">
            <h3 className="text-xs font-bold text-text-primary flex items-center space-x-1.5 pb-2 border-b border-border border-0.5">
              <Clock className="h-4 w-4 text-primary" />
              <span>Working Hours Slots</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-text-secondary">Work Start Hour (24h)</label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={startHour}
                    onChange={(e) => setStartHour(parseInt(e.target.value) || 9)}
                    className="w-full input-field text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-text-secondary">Work End Hour (24h)</label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={endHour}
                    onChange={(e) => setEndHour(parseInt(e.target.value) || 18)}
                    className="w-full input-field text-xs"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleWorkHoursSave}
                className="btn-primary text-xs flex items-center justify-center space-x-1 w-full h-9"
              >
                <Save className="h-4 w-4" />
                <span>Save Work Slots</span>
              </button>
            </div>
          </div>

          {/* Notification Warning Thresholds */}
          <div className="card-style bg-white border border-border border-0.5 space-y-4">
            <h3 className="text-xs font-bold text-text-primary flex items-center space-x-1.5 pb-2 border-b border-border border-0.5">
              <Bell className="h-4 w-4 text-primary" />
              <span>Thresholds & Warning Signals</span>
            </h3>

            <div className="space-y-4 text-xs">
              {/* Slider 1 */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-text-secondary">24h Alert Warning</span>
                  <span className="text-warning">{(warn24 / 60).toFixed(0)} hours</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="2880"
                  step="60"
                  value={warn24}
                  onChange={(e) => setWarn24(parseInt(e.target.value) || 1440)}
                  className="w-full h-1 bg-surface-alt accent-warning rounded"
                />
                <span className="text-[9px] text-text-muted italic block">
                  Triggers warning at {(warn24 / 60).toFixed(0)} hours prior to task deadline.
                </span>
              </div>

              {/* Slider 2 */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-text-secondary">6h Reprioritisation Alert</span>
                  <span className="text-orange-600">{(warn6 / 60).toFixed(0)} hours</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="1440"
                  step="30"
                  value={warn6}
                  onChange={(e) => setWarn6(parseInt(e.target.value) || 360)}
                  className="w-full h-1 bg-surface-alt accent-orange-500 rounded"
                />
                <span className="text-[9px] text-text-muted italic block">
                  Triggers rebuild + prioritisation at {(warn6 / 60).toFixed(0)} hours prior to deadline.
                </span>
              </div>

              {/* Slider 3 */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-text-secondary">1h Critical Escalation Alert</span>
                  <span className="text-danger">{(warn1 / 60).toFixed(1)} hours</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="360"
                  step="10"
                  value={warn1}
                  onChange={(e) => setWarn1(parseInt(e.target.value) || 60)}
                  className="w-full h-1 bg-surface-alt accent-danger rounded"
                />
                <span className="text-[9px] text-text-muted italic block">
                  Forces priority escalation score to 999 at {(warn1 / 60).toFixed(0)} hour prior to deadline.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Google calendar connection & Judge demo */}
        <div className="space-y-6">
          {/* Demo panel */}
          <DemoModePanel
            profile={profile}
            updateProfile={updateProfile}
            fastForwardHours={fastForwardHours}
            triggerDeadlineNow={triggerDeadlineNow}
          />

          {/* Google Calendar sync panel */}
          <div className="card-style bg-white border border-border border-0.5 space-y-4">
            <h3 className="text-xs font-bold text-text-primary flex items-center space-x-1.5 pb-2 border-b border-border border-0.5">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Google Calendar Integration</span>
            </h3>

            <div className="space-y-4 text-xs">
              <button
                type="button"
                onClick={() => setIsCalendarModalOpen(true)}
                className="w-full btn-secondary text-xs h-9 flex items-center justify-center space-x-1.5"
              >
                <span>Connect Google Calendar</span>
              </button>

              {/* Create/Delete mock events */}
              <form onSubmit={handleAddMockEvent} className="p-3 bg-surface-alt rounded-lg border border-border border-0.5 space-y-2.5">
                <span className="font-semibold text-text-primary block text-[11px]">Add Mock Calendar Event</span>
                
                <input
                  type="text"
                  value={mockTitle}
                  onChange={(e) => setMockTitle(e.target.value)}
                  placeholder="Event title (e.g. Stakeholder alignment)"
                  required
                  className="w-full input-field h-[28px] text-[10px] px-2 bg-white"
                />

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="date"
                    value={mockDate}
                    onChange={(e) => setMockDate(e.target.value)}
                    required
                    className="w-full input-field h-[28px] text-[10px] px-1 bg-white"
                  />
                  <input
                    type="time"
                    value={mockStartTime}
                    onChange={(e) => setMockStartTime(e.target.value)}
                    required
                    className="w-full input-field h-[28px] text-[10px] px-1 bg-white"
                  />
                  <input
                    type="time"
                    value={mockEndTime}
                    onChange={(e) => setMockEndTime(e.target.value)}
                    required
                    className="w-full input-field h-[28px] text-[10px] px-1 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary text-[10px] py-1.5 w-full flex items-center justify-center space-x-1 h-7"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add Event</span>
                </button>
              </form>

              {/* List events */}
              <div className="space-y-1.5">
                <span className="font-semibold text-text-primary block">Mock Event Commits</span>
                
                <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1">
                  {(schedule?.calendarEvents || []).length === 0 ? (
                    <div className="text-center py-4 text-[10px] text-text-muted italic bg-surface-alt rounded border border-dashed">
                      No calendar events defined.
                    </div>
                  ) : (
                    (schedule?.calendarEvents || []).map((ev) => (
                      <div key={ev.id} className="p-2 bg-surface-alt rounded flex items-center justify-between border border-border border-0.5 text-[10px]">
                        <div className="flex-1 min-w-0 pr-2">
                          <span className="font-semibold text-text-primary block truncate">{ev.title}</span>
                          <span className="text-text-muted text-[9px] block">{formatEventDate(ev.startTimestamp)}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteMockEvent(ev.id)}
                          className="text-text-muted hover:text-danger p-1 hover:bg-black/5 rounded cursor-pointer"
                          title="Delete Mock Event"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* App Info Box */}
          <div className="card-style bg-surface-alt border border-border border-0.5 p-4 text-[10px] text-text-secondary space-y-1">
            <span className="font-bold text-text-primary block text-xs mb-1.5">App Diagnostics</span>
            <div>Firebase Project ID: <strong className="text-text-primary">{firebaseProjectID}</strong></div>
            <div>AI Core: <strong className="text-text-primary">gemini-2.0-flash via Firebase AI Logic</strong></div>
            <div>App Version: <strong className="text-text-primary">{appVersion}</strong></div>
            <div>Build Timestamp: <strong className="text-text-primary">{buildTimestamp}</strong></div>
          </div>

        </div>
      </div>

      <CalendarSetupModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />
    </div>
  );
}
export default Settings;
