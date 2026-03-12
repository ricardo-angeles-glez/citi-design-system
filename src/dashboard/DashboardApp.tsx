import { useState } from 'react';
import { Smartphone, Menu, X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { DemoViewer } from './DemoViewer';
import { OverviewSection } from './sections/OverviewSection';
import { ColorsSection } from './sections/ColorsSection';
import { TypographySection } from './sections/TypographySection';
import { SpacingSection } from './sections/SpacingSection';
import { BordersSection } from './sections/BordersSection';
import { ShadowsSection } from './sections/ShadowsSection';
import { TransitionsSection } from './sections/TransitionsSection';
import { ComponentsSection } from './sections/ComponentsSection';
import './DashboardApp.css';

export type DashboardSection = 
  | 'overview'
  | 'colors'
  | 'typography'
  | 'spacing'
  | 'borders'
  | 'shadows'
  | 'transitions'
  | 'buttons'
  | 'inputs'
  | 'badges'
  | 'avatars'
  | 'cards'
  | 'listitems'
  | 'productcards'
  | 'appheader'
  | 'patterns';

export const DashboardApp: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<DashboardSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const scrollToComponent = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleNavigate = (section: DashboardSection) => {
    setCurrentSection(section);
    setSidebarOpen(false);
    
    // Scroll to component if it's a component section
    if (['buttons', 'inputs', 'badges', 'avatars', 'cards', 'listitems', 'productcards', 'appheader'].includes(section)) {
      scrollToComponent(section);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'overview':
        return <OverviewSection />;
      case 'colors':
        return <ColorsSection />;
      case 'typography':
        return <TypographySection />;
      case 'spacing':
        return <SpacingSection />;
      case 'borders':
        return <BordersSection />;
      case 'shadows':
        return <ShadowsSection />;
      case 'transitions':
        return <TransitionsSection />;
      case 'buttons':
      case 'inputs':
      case 'badges':
      case 'avatars':
      case 'cards':
      case 'listitems':
      case 'productcards':
      case 'appheader':
      case 'patterns':
        return <ComponentsSection />;
      default:
        return (
          <div className="section-placeholder">
            <h2>{currentSection}</h2>
            <p>Sección en desarrollo</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      {/* Topbar */}
      <header className="dashboard-topbar">
        <button 
          className="dashboard-topbar__menu"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="dashboard-topbar__logo">
          <span className="dashboard-topbar__arc">┌</span>
          <span className="dashboard-topbar__text">citi</span>
        </div>
        <span className="dashboard-topbar__title">Design System</span>
        <span className="dashboard-topbar__version">v1.0.0</span>
        <button 
          className="dashboard-topbar__demo"
          onClick={() => setShowDemo(true)}
        >
          <Smartphone size={16} />
          Ver Demo
        </button>
      </header>

      <div className="dashboard__container">
        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? 'dashboard-sidebar--open' : ''}`}>
          <Sidebar 
            currentSection={currentSection} 
            onNavigate={handleNavigate}
          />
        </aside>

        {/* Main Panel */}
        <main className="dashboard-main">
          {renderSection()}
        </main>
      </div>

      {/* Demo Viewer Overlay */}
      {showDemo && <DemoViewer onClose={() => setShowDemo(false)} />}
    </div>
  );
};
