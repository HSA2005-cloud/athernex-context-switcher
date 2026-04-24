'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardView from '@/components/views/DashboardView';
import SessionsView from '@/components/views/SessionsView';
import PrimingPromptView from '@/components/views/PrimingPromptView';
import SettingsView from '@/components/views/SettingsView';

export type ViewType = 'dashboard' | 'sessions' | 'priming' | 'settings';

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'sessions': return <SessionsView />;
      case 'priming': return <PrimingPromptView />;
      case 'settings': return <SettingsView />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
      />
      <div className={`main-area ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header
          activeView={activeView}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="main-content">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
