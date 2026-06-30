import React from 'react';
import { Hourglass, LogOut } from 'lucide-react';
import { User } from 'firebase/auth';
import { signOutUser } from '../../firebase/auth';

interface NavbarProps {
  user: User | null;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  profileName?: string;
  profilePhotoURL?: string;
}

export function Navbar({ user, currentTab, setCurrentTab, profileName, profilePhotoURL }: NavbarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'insights', label: 'Insights' },
    { id: 'goals', label: 'Goals' },
    { id: 'settings', label: 'Settings' }
  ];

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error('Failed signing out:', err);
    }
  };

  const displayName = profileName || user?.displayName || 'User';
  const photoURL = profilePhotoURL || user?.photoURL || '';

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border border-0.5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
          <Hourglass className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight text-text-primary">DeadlineZero</span>
        </div>

        {/* Middle: Navigation links */}
        {user && (
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`text-sm font-medium transition-colors py-2 px-1 border-b-2 ${
                  currentTab === item.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        {/* Right: Profile Info / Auth */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={displayName}
                    className="h-8 w-8 rounded-full border border-border border-0.5 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline text-sm font-medium text-text-primary">
                  {displayName}
                </span>
              </div>
              
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-2 text-text-secondary hover:text-danger rounded-lg transition-colors hover:bg-surface-alt cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <span className="text-sm text-text-muted">Not Signed In</span>
          )}
        </div>
      </div>
      
      {/* Mobile nav indicator bar */}
      {user && (
        <div className="md:hidden flex border-t border-border border-0.5 bg-white justify-around py-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`text-xs font-medium py-1.5 px-2 rounded-md ${
                currentTab === item.id
                  ? 'bg-primary-light text-primary'
                  : 'text-text-secondary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
export default Navbar;
