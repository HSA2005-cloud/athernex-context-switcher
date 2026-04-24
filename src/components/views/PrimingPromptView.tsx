'use client';

import { useState } from 'react';
import { useSettings } from '@/components/SettingsProvider';

const PRIMING_PROMPT = `# Project context handoff

## Project
ContextMind. AI context preservation and handoff system for developers.
Stack: Python 3.11, FastAPI, MongoDB Atlas, FAISS, spaCy 3.7, React/Next.js
Repo: athernex-context-switcher, branch: feat/auth-refresh

## Architecture (Layer 1 — ground truth from actual files)
FastAPI app. Routes: /save, /context, /health.
MongoDB for storage (session facts + snapshots).
FAISS for vector similarity search (novelty filter + L5 retrieval).
.env: MONGO_URI, GEMINI_API_KEY, FAISS_INDEX_PATH, PORT=37218

## Hard constraints (Layer 3 — never override these)
- Never store .env values — key names only
- All API calls go through FastAPI bridge only (port 37218)
- Chrome extension must use MV3 manifest
- Token budget cap: 1400 tokens for priming prompt

## Current state (Layer 2)
Working: FastAPI /save endpoint, VS Code file capture, git diff capture,
         Layer 1 reader, Chrome tab picker UI, spaCy NER stage
In progress: JWT refresh token middleware.py (line 47 — expiry logic)
             TextRank sentence scoring (pipeline step 5)
Broken: FAISS novelty filter returns KeyError on empty index first run

## Key decisions made
- MongoDB Atlas over local FAISS-only — less setup for hackathon demo
- Tab noise uses NOISE_DOMAINS blocklist first, keyword filter second
- SVM novelty filter uses cosine similarity > 0.85 threshold for MVP
- Gemini Flash for user summary generation (~300 tokens, fast enough)

## Where we stopped
File: middleware.py, line: 47
Last action: Writing JWT token expiry check — comparing exp claim to now()
Next step: Handle token expiry, raise 401 with WWW-Authenticate header,
           then wire refresh endpoint POST /auth/refresh

## Your role
You are continuing this project. You have full context above.
Do not ask clarifying questions about things already answered here.
Start from "Next step" above.`;

const SECTIONS = [
  { label: 'Project', color: 'var(--accent)' },
  { label: 'Architecture', color: '#3ecfb2' },
  { label: 'Hard constraints', color: '#f5844c' },
  { label: 'Current state', color: '#f5a623' },
  { label: 'Key decisions', color: '#a89cfc' },
  { label: 'Where we stopped', color: 'var(--accent-success)' },
  { label: 'Your role', color: 'var(--text-secondary)' },
];

export default function PrimingPromptView() {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { settings } = useSettings();
  const maxTokens = parseInt(settings.maxTokens) || 1400;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PRIMING_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenCount = Math.ceil(PRIMING_PROMPT.length / 4);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 20, alignItems: 'start' }}>
      {/* Main prompt */}
      <div>
        <div className="card card-lg">
          <div className="card-header" style={{ marginBottom: 20 }}>
            <div>
              <div className="card-title">LLM Priming Prompt</div>
              <div className="card-subtitle">Session #24 · feat/auth-refresh · {tokenCount} / {maxTokens.toLocaleString()} tokens</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" />
                  <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" />
                </svg>
                Regenerate
              </button>
              <button
                className={`btn ${copied ? 'btn-success' : 'btn-primary'}`}
                onClick={handleCopy}
              >
                {copied ? (
                  <>✓ Copied!</>
                ) : (
                  <>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" />
                      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    Copy prompt
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Token budget bar */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Token budget</span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                {tokenCount} / {maxTokens.toLocaleString()}
              </span>
            </div>
            <div style={{ height: 4, background: 'var(--bg-hover)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min((tokenCount / maxTokens) * 100, 100)}%`,
                background: tokenCount > maxTokens * 0.9 ? 'var(--accent-warn)' : 'var(--accent)',
                borderRadius: 2,
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>

          {/* Prompt content with syntax highlighting */}
          <div className="prompt-block" style={{ maxHeight: 520, overflowY: 'auto' }}>
            {renderHighlightedPrompt(PRIMING_PROMPT, activeSection)}
          </div>
        </div>
      </div>

      {/* Sidebar controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Sections navigator */}
        <div className="card">
          <div className="card-title" style={{ marginBottom: 16, fontSize: 15 }}>Sections</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {SECTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => setActiveSection(activeSection === s.label ? null : s.label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  border: `1px solid ${activeSection === s.label ? s.color + '40' : 'transparent'}`,
                  borderRadius: 'var(--radius-sm)',
                  background: activeSection === s.label ? s.color + '10' : 'transparent',
                  cursor: 'pointer',
                  color: activeSection === s.label ? s.color : 'var(--text-secondary)',
                  fontSize: 14,
                  fontWeight: 500,
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                {s.label}
              </button>
            ))}
          </div>
        </div>



        {/* Actions */}
        <div className="card card-sm">
          <div className="card-title" style={{ marginBottom: 14, fontSize: 15 }}>Open in</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'Claude.ai', url: 'https://claude.ai/new' },
              { name: 'ChatGPT', url: 'https://chatgpt.com/' },
              { name: 'Gemini', url: 'https://gemini.google.com/' }
            ].map((p) => (
              <button
                key={p.name}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', fontSize: 13, padding: '8px 14px' }}
                onClick={() => window.open(p.url, '_blank')}
              >
                → {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderHighlightedPrompt(text: string, _active: string | null) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('# ')) {
      return (
        <div key={i} style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 4 }}>
          {line}
        </div>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <div key={i} style={{ color: 'var(--accent)', marginTop: 14, marginBottom: 4 }}>
          {line}
        </div>
      );
    }
    if (line.startsWith('- Never') || line.startsWith('- All API')) {
      return (
        <div key={i} style={{ color: '#f5844c' }}>{line}</div>
      );
    }
    if (line.startsWith('Working:')) {
      return <div key={i} style={{ color: 'var(--accent-success)' }}>{line}</div>;
    }
    if (line.startsWith('In progress:')) {
      return <div key={i} style={{ color: 'var(--accent-warn)' }}>{line}</div>;
    }
    if (line.startsWith('Broken:')) {
      return <div key={i} style={{ color: 'var(--accent-danger)' }}>{line}</div>;
    }
    if (line.trim() === '') {
      return <br key={i} />;
    }
    return (
      <div key={i} style={{ color: 'var(--text-secondary)' }}>{line}</div>
    );
  });
}
