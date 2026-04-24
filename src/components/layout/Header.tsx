'use client';

import { UserButton } from '@clerk/nextjs';
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
