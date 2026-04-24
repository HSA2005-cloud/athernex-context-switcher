'use client';

import { UserButton } from '@clerk/nextjs';
import { useTheme } from '@/components/ThemeProvider';
import { ViewType } from '@/app/page';

interface HeaderProps {
  activeView: ViewType;
  onMenuToggle: () => void;
}

const viewMeta: Record<ViewType, { title: string; sub: string }> = {
  dashboard: { title: 'Dashboard', sub: 'Live context overview' },
  sessions: { title: 'Sessions', sub: 'Saved context snapshots' },
  priming: { title: 'Priming Prompt', sub: 'LLM handoff output' },
  settings: { title: 'Settings', sub: 'Extensions & pipeline config' },
};

export default function Header({ activeView, onMenuToggle }: HeaderProps) {
  const meta = viewMeta[activeView];
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <button className="header-menu-btn" onClick={onMenuToggle} aria-label="Toggle sidebar">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <span className="header-title">{meta.title}</span>
      <span className="header-sub">/ {meta.sub}</span>

      <div className="header-spacer" />

      <div className="header-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3" />
              <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="3.05" y1="3.05" x2="4.46" y2="4.46" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="11.54" y1="11.54" x2="12.95" y2="12.95" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="3.05" y1="12.95" x2="4.46" y2="11.54" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="11.54" y1="4.46" x2="12.95" y2="3.05" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M14 9.5A6.5 6.5 0 0 1 6.5 2c0-.5.06-1 .17-1.47A7 7 0 1 0 14.47 8.83c-.47.11-.97.17-1.47.17h1Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <button className="btn btn-secondary">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="6" y1="3.5" x2="6" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="6" cy="7.5" r="0.5" fill="currentColor" />
          </svg>
          Docs
        </button>
        <button className="btn btn-primary">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Save Context
        </button>
        <div className="header-user">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'clerk-avatar',
                userButtonTrigger: 'clerk-user-trigger',
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
