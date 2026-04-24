'use client';

import { useState } from 'react';
import { useSettings } from '@/components/SettingsProvider';

const PLATFORM_COLORS: Record<string, string> = {
  'claude.ai': '#2563eb',
  'chatgpt': '#10b981',
  'gemini': '#8b5cf6',
};

interface Session {
  id: string;
  title: string;
  file: string;
  branch: string;
  time: string;
  tags: string[];
  platform: string;
  active?: boolean;
  summary: string;
}

const ALL_SESSIONS: Session[] = [
  {
    id: 's1',
    title: 'JWT refresh token middleware',
    file: 'middleware.py',
    branch: 'feat/auth-refresh',
    time: '14 min ago',
    tags: ['FastAPI', 'Python', 'Auth'],
    platform: 'claude.ai',
    active: true,
    summary: 'Token validation done — working on expiry handling and 401 response headers.',
  },
  {
    id: 's2',
    title: 'MongoDB connection pooling',
    file: 'database.py',
    branch: 'main',
    time: '2 hr ago',
    tags: ['MongoDB', 'Python'],
    platform: 'chatgpt',
    summary: 'Atlas pool settings tuned. Connection limits under load still under investigation.',
  },
  {
    id: 's3',
    title: 'Chrome extension DOM scraper',
    file: 'content.js',
    branch: 'feat/chrome-ext',
    time: '5 hr ago',
    tags: ['JS', 'Chrome', 'DOM'],
    platform: 'gemini',
    summary: 'Platform selectors for Claude + ChatGPT complete. TextRank compression working.',
  },
];

const AI_SUMMARY = {
  focus: {
    title: 'Current Focus',
    detail: 'Building the expiry check logic in middleware.py at line 47. Token validation is complete.',
  },
  inProgress: [
    'JWT token expiry check — comparing exp claim to now()',
    'Chrome extension Gemini DOM selector',
  ],
  issues: [
    'FAISS novelty filter throws KeyError on empty index',
    'MongoDB pool exhaustion under load',
  ],
  nextSteps: [
    'Handle expiry → raise 401 with WWW-Authenticate',
    'Wire refresh endpoint POST /auth/refresh',
  ],
};

export default function DashboardView() {
  const { settings } = useSettings();
  const maxTokens = parseInt(settings.maxTokens) || 1400;
  const [showAll, setShowAll] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session>(ALL_SESSIONS[0]);
  const totalUsed = 1065;
  const pct = Math.round((totalUsed / maxTokens) * 100);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      
      {/* ── Main Hero Area ── */}
      <div style={{ textAlign: 'center', marginBottom: 64, marginTop: 24 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--bg-hover)', padding: '6px 16px',
          borderRadius: 30, fontSize: 13, fontWeight: 600,
          color: 'var(--accent)', marginBottom: 24
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
          Context System Active
        </div>
        <h1 className="h1">The new way<br/>developers keep context.</h1>
        <p className="subtitle" style={{ margin: '0 auto' }}>
          Your active coding sessions, architecture decisions, and LLM conversations
          sync perfectly across all environments.
        </p>
        <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button className="btn btn-primary">Save Context Now</button>
          <button className="btn btn-secondary">View Documentation</button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Sessions</div>
          <div className="stat-value">24</div>
          <div className="stat-change up">↑ +3 today</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Context Saved</div>
          <div className="stat-value">23m</div>
          <div className="stat-change up">↑ per session avg</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Token Budget</div>
          <div className="stat-value">{pct}%</div>
          <div className="stat-change down">{totalUsed.toLocaleString()} of {maxTokens.toLocaleString()}</div>
        </div>
      </div>

      {/* ── AI Summary Boxes ── */}
      <div style={{ marginBottom: 48 }}>
        <h2 className="h2" style={{ textAlign: 'center', marginBottom: 32 }}>AI Context Summary</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          
          <div className="box-blue">
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Current Focus</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {AI_SUMMARY.focus.detail}
            </p>
          </div>

          <div className="box-pink">
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>In Progress</h3>
            <ul style={{ paddingLeft: 16, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              {AI_SUMMARY.inProgress.map((item, i) => <li key={i} style={{ marginBottom: 8 }}>{item}</li>)}
            </ul>
          </div>

          <div className="box-purple">
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Next Steps</h3>
            <ul style={{ paddingLeft: 16, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              {AI_SUMMARY.nextSteps.map((item, i) => <li key={i} style={{ marginBottom: 8 }}>{item}</li>)}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Recent Sessions ── */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <h2 className="h2" style={{ marginBottom: 4 }}>Recent Sessions</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Pick up exactly where you left off.</p>
          </div>
          <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>View all history</button>
        </div>

        <div className="session-list">
          {ALL_SESSIONS.map((s) => (
            <div key={s.id} className={`session-card ${s.id === selectedSession.id ? 'active-session' : ''}`} onClick={() => setSelectedSession(s)}>
              <div className="session-meta">
                <span style={{ fontWeight: 600, color: PLATFORM_COLORS[s.platform] || 'var(--accent)' }}>{s.platform}</span>
                <span>•</span>
                <span>{s.time}</span>
              </div>
              <div className="session-title">{s.title}</div>
              <div className="session-desc">{s.summary}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
