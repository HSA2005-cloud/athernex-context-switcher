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
  const [selectedSession, setSelectedSession] = useState<Session>(ALL_SESSIONS[0]);
  const totalUsed = 1065;
  const pct = Math.round((totalUsed / maxTokens) * 100);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 64 }}>
      
      {/* ── Top Row: Hero & Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center', marginTop: 16 }}>
        
        {/* Hero */}
        <div style={{ textAlign: 'left' }}>
          <div 
            className="liquid-glass"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 30, fontSize: 13, fontWeight: 600,
              color: 'var(--accent)', marginBottom: 24, cursor: 'pointer'
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
            Context System Active
          </div>
          <h1 className="h1" style={{ fontSize: 48 }}>The new way<br/>developers keep context.</h1>
          <p className="subtitle" style={{ maxWidth: 500 }}>
            Your active coding sessions, architecture decisions, and LLM conversations
            sync perfectly across all environments.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
            <button className="btn btn-primary" style={{ transition: 'all 0.4s ease' }}>Save Context Now</button>
            <button className="btn btn-secondary" style={{ transition: 'all 0.4s ease' }}>View Documentation</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 16,
        }}>
          <div className="stat-card" style={{ marginBottom: 0 }}>
            <div className="stat-label">Sessions</div>
            <div className="stat-value">24</div>
            <div className="stat-change up">↑ +3 today</div>
          </div>
          <div className="stat-card" style={{ marginBottom: 0 }}>
            <div className="stat-label">Context Saved</div>
            <div className="stat-value">23m</div>
            <div className="stat-change up">↑ per session avg</div>
          </div>
          <div className="stat-card" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
            <div className="stat-label">Token Budget</div>
            <div className="stat-value">{pct}%</div>
            <div className="stat-change down">{totalUsed.toLocaleString()} of {maxTokens.toLocaleString()}</div>
          </div>
        </div>

      </div>

      {/* ── Bottom Row: AI Summary & Sessions ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
        
        {/* AI Summary */}
        <div>
          <h2 className="h2" style={{ marginBottom: 24 }}>AI Context Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="box-blue" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Current Focus</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {AI_SUMMARY.focus.detail}
              </p>
            </div>
            <div className="box-pink" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>In Progress</h3>
              <ul style={{ paddingLeft: 16, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                {AI_SUMMARY.inProgress.map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{item}</li>)}
              </ul>
            </div>
            <div className="box-purple" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Next Steps</h3>
              <ul style={{ paddingLeft: 16, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                {AI_SUMMARY.nextSteps.map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <h2 className="h2" style={{ marginBottom: 4 }}>Recent Sessions</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Pick up exactly where you left off.</p>
            </div>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>View all history</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ALL_SESSIONS.slice(0, 3).map((s) => (
              <div key={s.id} className={`session-card ${s.id === selectedSession.id ? 'active-session' : ''}`} onClick={() => setSelectedSession(s)} style={{ padding: 20 }}>
                <div className="session-meta">
                  <span style={{ fontWeight: 600, color: PLATFORM_COLORS[s.platform] || 'var(--accent)' }}>{s.platform}</span>
                  <span>•</span>
                  <span>{s.time}</span>
                </div>
                <div className="session-title" style={{ fontSize: 16 }}>{s.title}</div>
                <div className="session-desc" style={{ fontSize: 13 }}>{s.summary}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  {s.tags.map(t => <span key={t} className="tag" style={{ padding: '4px 10px', fontSize: 10 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
