'use client';

import { useState } from 'react';

interface Session {
  id: string;
  title: string;
  file: string;
  line: number;
  branch: string;
  time: string;
  tags: string[];
  platform: string;
  tokenCount: number;
  summary: string;
  nextAction: string;
}

const SESSIONS: Session[] = [
  {
    id: 's1',
    title: 'JWT refresh token middleware',
    file: 'middleware.py',
    line: 47,
    branch: 'feat/auth-refresh',
    time: '14 min ago',
    tags: ['FastAPI', 'Python', 'Auth'],
    platform: 'claude.ai',
    tokenCount: 1382,
    summary: 'Building the JWT refresh token middleware for FastAPI. Implemented token validation logic, now working on expiry handling.',
    nextAction: 'Continue refresh token expiry in middleware.py line 47.',
  },
  {
    id: 's2',
    title: 'MongoDB Atlas connection pooling',
    file: 'database.py',
    line: 23,
    branch: 'main',
    time: '2 hr ago',
    tags: ['MongoDB', 'Python', 'DB'],
    platform: 'chatgpt',
    tokenCount: 1290,
    summary: 'Tuned MongoDB Atlas connection pool settings. Reduced max pool size to prevent Atlas connection limit errors.',
    nextAction: 'Test connection pool under load in staging.',
  },
  {
    id: 's3',
    title: 'Chrome extension DOM scraper',
    file: 'content.js',
    line: 112,
    branch: 'feat/chrome-ext',
    time: '5 hr ago',
    tags: ['JS', 'Chrome MV3', 'DOM'],
    platform: 'gemini',
    tokenCount: 1100,
    summary: 'Implemented platform-specific DOM selectors for claude.ai and ChatGPT. Conversation compression working via TextRank.',
    nextAction: 'Add Gemini selector and test full scrape flow.',
  },
  {
    id: 's4',
    title: 'FAISS vector index setup',
    file: 'vector_store.py',
    line: 88,
    branch: 'feat/memory-layers',
    time: 'yesterday',
    tags: ['FAISS', 'Python', 'ML'],
    platform: 'claude.ai',
    tokenCount: 980,
    summary: 'Scaffolded FAISS L2 index for session memory. Embeddings using sentence-transformers/all-MiniLM-L6-v2.',
    nextAction: 'Wire FAISS into the novelty filter pipeline step.',
  },
];

const PLATFORM_COLORS: Record<string, string> = {
  'claude.ai': 'var(--accent)',
  chatgpt: '#10a37f',
  gemini: '#4285f4',
};

export default function SessionsView() {
  const [selected, setSelected] = useState<Session>(SESSIONS[0]);
  const [filter, setFilter] = useState<'all' | 'today'>('all');

  const filtered = SESSIONS.filter((s) => {
    if (filter === 'today') return s.time.includes('min') || s.time.includes('hr');
    return true;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, minHeight: 'calc(100vh - 120px)' }}>
      {/* Session list panel */}
      <div>
        <div className="section-header" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="tabs">
            {(['all', 'today'] as const).map((f) => (
              <button key={f} className={`tab-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : 'Today'}
              </button>
            ))}
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{filtered.length} sessions</span>
        </div>

        <div className="session-list">
          {filtered.map((s) => (
            <div
              key={s.id}
              className={`session-card ${s.id === selected.id ? 'active-session' : ''}`}
              onClick={() => setSelected(s)}
            >
              <div className="session-meta">
                <span className="session-time">{s.time}</span>
                <span className="tag tag-gray" style={{ fontSize: 9, marginLeft: 'auto' }}>
                  {s.platform}
                </span>
              </div>
              <div className="session-title">{s.title}</div>
              <div className="session-desc">{s.summary}</div>
              <div className="session-tags" style={{ marginTop: 8 }}>
                {s.tags.map((t) => (
                  <span key={t} className="tag tag-purple" style={{ fontSize: 9 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session detail */}
      <div>
        <div className="card card-lg" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: PLATFORM_COLORS[selected.platform] ?? 'var(--text-muted)',
                }} />
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {selected.platform}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>·</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{selected.time}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
                {selected.title}
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary">Restore</button>
              <button className="btn btn-primary">Copy Prompt</button>
            </div>
          </div>

          {/* Context metadata */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'File', value: `${selected.file}:${selected.line}` },
              { label: 'Branch', value: selected.branch },
              { label: 'Tokens', value: `${selected.tokenCount.toLocaleString()} / 1,400` },
            ].map((m) => (
              <div key={m.label} style={{
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '10px 12px',
              }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Summary card */}
          <div style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 8 }}>Session Summary</div>
            <div style={{
              background: 'var(--bg-base)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 16,
              borderLeft: '3px solid var(--accent)',
            }}>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selected.summary}</p>
            </div>
          </div>

          {/* Next action */}
          <div>
            <div className="section-title" style={{ marginBottom: 8 }}>Suggested Next Action</div>
            <div style={{
              background: 'rgba(124,109,250,0.06)',
              border: '1px solid rgba(124,109,250,0.18)',
              borderRadius: 'var(--radius)',
              padding: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <span style={{ color: 'var(--accent)', fontSize: 14 }}>→</span>
              <span style={{ fontSize: 13, color: 'var(--text-primary)', fontStyle: 'italic' }}>{selected.nextAction}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="card card-sm">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginRight: 4 }}>Tags:</span>
            {selected.tags.map((t) => (
              <span key={t} className="tag tag-purple">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
