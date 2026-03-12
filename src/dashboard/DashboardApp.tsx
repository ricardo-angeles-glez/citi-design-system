import { useState, useEffect } from 'react';
import { Smartphone, Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
import { AtomsSection } from './sections/AtomsSection';
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
  | 'patterns'
  | 'modal'
  | 'toast'
  | 'skeleton'
  | 'emptystate'
  | 'otpinput'
  | 'pinpad'
  | 'currencyinput'
  | 'chart'
  | 'accessibility'
  | 'darkmode'
  | 'i18n';

export const DashboardApp: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<DashboardSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
    const componentSections = [
      'buttons', 'inputs', 'badges', 'avatars', 'cards', 
      'listitems', 'productcards', 'appheader', 'patterns',
      'modal', 'toast', 'skeleton', 'emptystate', 
      'otpinput', 'pinpad', 'currencyinput', 'chart'
    ];
    if (componentSections.includes(section)) {
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
        return <AtomsSection />;
      case 'listitems':
      case 'productcards':
      case 'appheader':
      case 'patterns':
      case 'modal':
      case 'toast':
      case 'skeleton':
      case 'emptystate':
      case 'otpinput':
      case 'pinpad':
      case 'currencyinput':
      case 'chart':
        return <ComponentsSection />;
      case 'accessibility':
      case 'darkmode':
      case 'i18n':
        return <ComponentsSection />; // Placeholder for System sections
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
        <div className="dashboard-topbar__actions">
          <button 
            className="dashboard-topbar__icon-btn"
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button 
            className="dashboard-topbar__icon-btn"
            onClick={() => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
            aria-label="Cambiar idioma"
          >
            <Globe size={18} />
            <span className="lang-label">{i18n.language.toUpperCase()}</span>
          </button>
        </div>
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
      {showDemo && <DemoViewer isOpen={showDemo} onClose={() => setShowDemo(false)} />}
    </div>
  );
};
