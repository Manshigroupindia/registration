import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LogOut, User, Shield, Sun, Moon } from 'lucide-react';

interface AdminNavbarProps {
  title?: string;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ title = 'Secretariat Console' }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-surface-container-low border-b border-outline-variant/30 px-space-lg flex items-center justify-between text-on-surface">
      <div className="flex items-center gap-space-sm">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h1 className="font-title-lg text-title-lg text-on-surface font-semibold">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-space-md">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="p-2 rounded-full bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:text-primary transition-all duration-200"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-primary" />
          ) : (
            <Moon className="w-4 h-4 text-primary" />
          )}
        </button>

        <div className="flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container border border-outline-variant/30 text-on-surface font-body-sm text-body-sm">
          <User className="w-4 h-4 text-primary" />
          <span className="font-medium">{user?.email || 'Admin'}</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-primary/20 text-primary">
            {user?.role || 'Superadmin'}
          </span>
        </div>

        <button
          onClick={() => logout()}
          className="flex items-center gap-1.5 px-space-md py-1.5 rounded-full bg-secondary-container/80 hover:bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase font-semibold transition-colors"
          title="Sign out of Secretariat Console"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
