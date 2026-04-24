'use client';

import { useState } from 'react';

const PIPELINE_STEPS = [
  { id: 1, name: 'Layer 1 reader', tool: 'fs reader', desc: 'package.json, schema, routes, .env', status: 'done' },
  { id: 2, name: 'Conversation compressor', tool: 'TextRank', desc: 'User turns capped 500ch · assistant top-3', status: 'done' },
  { id: 3, name: 'spaCy NER', tool: 'spaCy v3', desc: 'Entities: names, tech, branches, services', status: 'done' },
  { id: 4, name: 'YAKE keyphrases', tool: 'YAKE', desc: 'Offline keyphrase extraction — no LLM', status: 'done' },
  { id: 5, name: 'TextRank scoring', tool: 'TextRank', desc: 'Word overlap graph · drops below-threshold', status: 'running' },
  { id: 6, name: 'SVM novelty filter', tool: 'SVM', desc: 'Cosine similarity > 0.85 → skip', status: 'pending' },
  { id: 7, name: 'Contradiction check', tool: 'custom', desc: 'Entity match + antonym lookup + decay', status: 'pending' },
  { id: 8, name: 'Context builder', tool: 'assembler', desc: 'L1+L3+L4+L2+L5 — stops at 1400 tokens', status: 'pending' },
];

const MEMORY_LAYERS = [
  { num: 'L1', name: 'Ground truth', desc: 'From actual files', budget: 300, used: 287, color: '#7c6dfa' },
  { num: 'L2', name: 'Current state', desc: 'Working / broken', budget: 300, used: 210, color: '#3ecfb2' },
  { num: 'L3', name: 'Hard constraints', desc: 'Never / always rules', budget: 150, used: 98, color: '#f5844c' },
  { num: 'L4', name: 'Recent context', desc: 'Last 48hr activity', budget: 400, used: 340, color: '#f5a623' },
  { num: 'L5', name: 'Historical', desc: 'FAISS vector search', budget: 250, used: 130, color: '#9b99b8' },
];

const RECENT_SESSIONS = [
  {
    id: 's1',
    title: 'JWT refresh token middleware',
    file: 'middleware.py',
    branch: 'feat/auth-refresh',
    time: '14 min ago',
    tags: ['FastAPI', 'Python', 'Auth'],
    active: true,
  },
  {
    id: 's2',
    title: 'MongoDB connection pooling',
    file: 'database.py',
    branch: 'main',
    time: '2 hr ago',
    tags: ['MongoDB', 'Python'],
    active: false,
  },
  {
    id: 's3',
    title: 'Chrome extension DOM scraper',
    file: 'content.js',
    branch: 'feat/chrome-ext',
    time: '5 hr ago',
    tags: ['JS', 'Chrome', 'DOM'],
    active: false,
  },
];

export default function DashboardView() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'layers'>('pipeline');

  return (
    <div>
      {/* Stats */}
      <div className="stat-grid">
        <StatCard label="Sessions saved" value="24" change="+3 today" up accentColor="var(--accent)" />
        <StatCard label="Context saved" value="23m" change="per session avg" up accentColor="#3ecfb2" />
        <StatCard label="Token budget" value="1,382" change="of 1,400 used" down accentColor="#f5844c" />
        <StatCard label="Facts stored" value="412" change="+18 this session" up accentColor="#f5a623" />
      </div>

      <div className="grid-2" style={{ gap: 20, marginBottom: 24 }}>
        {/* ML Pipeline */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <span style={{ color: 'var(--accent)', fontSize: 14 }}>⟳</span>
                ML Pipeline
              </div>
              <div className="card-subtitle">Processing session #24</div>
            </div>
            <div className="tabs">
              <button className={`tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`} onClick={() => setActiveTab('pipeline')}>Steps</button>
              <button className={`tab-btn ${activeTab === 'layers' ? 'active' : ''}`} onClick={() => setActiveTab('layers')}>Memory</button>
            </div>
          </div>

          {activeTab === 'pipeline' ? (
            <div className="pipeline">
              {PIPELINE_STEPS.map((step) => (
                <div key={step.id} className={`pipeline-step ${step.status}`}>
                  <span className="step-num">#{step.id}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="step-name">{step.name}</div>
                    <div className="step-desc">{step.desc}</div>
                  </div>
                  <span className={`tag tag-${step.status === 'done' ? 'green' : step.status === 'running' ? 'purple' : 'gray'}`} style={{ fontSize: 9 }}>
                    {step.tool}
                  </span>
                  <div className={`step-status ${step.status}`}>
                    {step.status === 'done' && '✓'}
                    {step.status === 'running' && <span className="pulse">●</span>}
                    {step.status === 'pending' && '○'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="layer-grid">
              {MEMORY_LAYERS.map((layer) => (
                <div key={layer.num} className="layer-item">
                  <div className="layer-num" style={{ color: layer.color }}>{layer.num}</div>
                  <div className="layer-name">{layer.name}</div>
                  <div className="layer-budget">{layer.used} / {layer.budget} tokens</div>
                  <div className="layer-bar">
                    <div
                      className="layer-fill"
                      style={{
                        width: `${(layer.used / layer.budget) * 100}%`,
                        background: layer.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Sessions */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent Sessions</div>
              <div className="card-subtitle">Last 3 context snapshots</div>
            </div>
            <button className="btn btn-ghost" style={{ fontSize: 11 }}>View all</button>
          </div>
          <div className="session-list">
            {RECENT_SESSIONS.map((s) => (
              <div key={s.id} className={`session-card ${s.active ? 'active-session' : ''}`}>
                <div className="session-meta">
                  <span className="session-time">{s.time}</span>
                  {s.active && <span className="tag tag-purple" style={{ fontSize: 9 }}>active</span>}
                </div>
                <div className="session-title">{s.title}</div>
                <div className="session-desc" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  📄 {s.file} &nbsp;·&nbsp; ⑂ {s.branch}
                </div>
                <div className="session-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="tag tag-gray">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live capture status */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span className="pulse" style={{ color: 'var(--accent-success)', fontSize: 10 }}>●</span>
            Live Capture Status
          </div>
          <span className="tag tag-green">Both extensions active</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <CaptureSource
            label="VS Code"
            icon="⌨"
            items={['middleware.py — line 47', 'database.py', 'main.py']}
            meta="feat/auth-refresh · 3 files open"
            color="var(--accent)"
          />
          <CaptureSource
            label="Chrome"
            icon="◉"
            items={['claude.ai — active', 'localhost:3000', 'MongoDB Atlas']}
            meta="3 tabs selected · 2 AI tabs"
            color="#3ecfb2"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, up, accentColor }: {
  label: string; value: string; change: string; up: boolean; accentColor: string;
}) {
  return (
    <div className="stat-card" style={{ '--accent-color': accentColor } as React.CSSProperties}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${up ? 'up' : 'down'}`}>
        <span>{up ? '↑' : '↓'}</span>
        {change}
      </div>
    </div>
  );
}

function CaptureSource({ label, icon, items, meta, color }: {
  label: string; icon: string; items: string[]; meta: string; color: string;
}) {
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 26, height: 26, background: `${color}18`, borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, color,
        }}>{icon}</div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
        <div className="status-dot" style={{ marginLeft: 'auto' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-secondary)',
            padding: '3px 8px',
            background: 'var(--bg-base)',
            borderRadius: 4,
            border: '1px solid var(--border)',
          }}>{item}</div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 8 }}>{meta}</div>
    </div>
  );
}
