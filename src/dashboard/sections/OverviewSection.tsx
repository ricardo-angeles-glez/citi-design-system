import React, { useEffect, useState } from 'react';
import { 
  Layers, Palette, Type, LayoutGrid, 
  MousePointer, FormInput, Tag, User, Square, Bell, 
  CreditCard, Loader, KeyRound, Hash, DollarSign, BarChart2,
  Shield, Zap, Globe, ArrowRight
} from 'lucide-react';
import './OverviewSection.css';

interface ComponentCardProps {
  category: 'Atom' | 'Component' | 'Banking' | 'System' | 'Foundation';
  title: string;
  description: string;
  icon: React.ElementType;
  previewColor: string;
  sectionId: string;
  count?: number;
  isNew?: boolean;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ 
  category, title, description, icon: Icon, previewColor, sectionId, count, isNew 
}) => {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-section', { 
      detail: { sectionId } 
    }));
  };

  const categoryColors: Record<string, { bg: string; text: string }> = {
    Atom: { bg: '#E3F2FD', text: '#1565C0' },
    Component: { bg: '#F3E5F5', text: '#6A1B9A' },
    Banking: { bg: '#E8F5E9', text: '#2E7D32' },
    System: { bg: '#FFF8E1', text: '#F57F17' },
    Foundation: { bg: '#FBE9E7', text: '#BF360C' },
  };

  return (
    <div className="component-card" onClick={handleClick}>
      <div className="component-card__preview" style={{ backgroundColor: previewColor }}>
        <Icon size={36} className="component-card__icon" />
        <div 
          className="component-card__category-badge"
          style={{ 
            backgroundColor: categoryColors[category].bg, 
            color: categoryColors[category].text 
          }}
        >
          {category}
        </div>
        {isNew && (
          <div className="component-card__new-badge">
            NEW
          </div>
        )}
      </div>
      <div className="component-card__info">
        <div className="component-card__header">
          <span className="component-card__title">{title}</span>
          <ArrowRight size={16} className="component-card__arrow" />
        </div>
        <p className="component-card__description">{description}</p>
        {count && (
          <div className="component-card__count">
            {count} variantes
          </div>
        )}
      </div>
    </div>
  );
};

const StatItem: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const increment = value / steps;
    const interval = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="stat-item">
      <div className="stat-item__value">
        {displayValue}{suffix}
      </div>
      <div className="stat-item__label">{label}</div>
    </div>
  );
};

export const OverviewSection: React.FC = () => {
  const componentsData: ComponentCardProps[] = [
    // Foundations
    { category: 'Foundation', title: 'Colores', description: 'Paleta completa con escalas 50-900', icon: Palette, previewColor: '#003B5C', sectionId: 'colors', count: 70 },
    { category: 'Foundation', title: 'Tipografía', description: 'BanamexDisplay + escala completa', icon: Type, previewColor: '#1A1A2E', sectionId: 'typography', count: 9 },
    { category: 'Foundation', title: 'Espaciado', description: 'Sistema de 4px base', icon: LayoutGrid, previewColor: '#0D3349', sectionId: 'spacing', count: 9 },
    
    // Atoms
    { category: 'Atom', title: 'Button', description: '4 variantes, 3 tamaños, estados', icon: MousePointer, previewColor: '#1565C0', sectionId: 'buttons', count: 4 },
    { category: 'Atom', title: 'Input', description: 'Con label, error y validación', icon: FormInput, previewColor: '#1976D2', sectionId: 'inputs', count: 3 },
    { category: 'Atom', title: 'Badge', description: '6 variantes semánticas', icon: Tag, previewColor: '#1565C0', sectionId: 'badges', count: 6 },
    { category: 'Atom', title: 'Avatar', description: '4 colores, 3 tamaños', icon: User, previewColor: '#0D47A1', sectionId: 'avatars', count: 4 },
    { category: 'Atom', title: 'Card', description: '4 niveles de elevación', icon: Square, previewColor: '#1565C0', sectionId: 'cards', count: 4 },
    
    // Components
    { category: 'Component', title: 'Modal', description: 'Confirmaciones con focus trap', icon: Layers, previewColor: '#6A1B9A', sectionId: 'modal', isNew: true },
    { category: 'Component', title: 'Toast', description: '4 variantes con auto-dismiss', icon: Bell, previewColor: '#7B1FA2', sectionId: 'toast', isNew: true },
    { category: 'Component', title: 'Product Card', description: 'Expandible con sub-cuentas', icon: CreditCard, previewColor: '#4A148C', sectionId: 'productcards', count: 2 },
    { category: 'Component', title: 'Skeleton', description: 'Estados de carga shimmer', icon: Loader, previewColor: '#6A1B9A', sectionId: 'skeleton', isNew: true },
    
    // Banking
    { category: 'Banking', title: 'OTP Input', description: 'Verificación con auto-avance', icon: KeyRound, previewColor: '#2E7D32', sectionId: 'otpinput', isNew: true },
    { category: 'Banking', title: 'PIN Pad', description: 'NIP con animación de progreso', icon: Hash, previewColor: '#388E3C', sectionId: 'pinpad', isNew: true },
    { category: 'Banking', title: 'Currency Input', description: 'Formato automático MXN/USD', icon: DollarSign, previewColor: '#1B5E20', sectionId: 'currencyinput', isNew: true },
    { category: 'Banking', title: 'Spending Chart', description: 'Barras y líneas con Recharts', icon: BarChart2, previewColor: '#2E7D32', sectionId: 'chart', isNew: true },
  ];

  const principles = [
    {
      icon: Shield,
      iconBg: '#E3F2FD', 
      iconColor: '#1565C0',
      title: 'Confianza',
      description: 'Cada componente comunica seguridad y estabilidad. Colores sobrios, tipografía clara y jerarquía visual que reduce la ansiedad en transacciones financieras.'
    },
    {
      icon: Zap,
      iconBg: '#FFF8E1', 
      iconColor: '#F57F17',
      title: 'Claridad',
      description: 'La información financiera debe ser inmediatamente comprensible. Contrastes WCAG AA, escala tipográfica definida y espaciado consistente en todos los componentes.'
    },
    {
      icon: Layers,
      iconBg: '#F3E5F5', 
      iconColor: '#6A1B9A',
      title: 'Composición',
      description: 'Arquitectura Atomic Design: Atoms → Components → Patterns. Cada pieza es reutilizable e independiente, permitiendo composiciones complejas sin inconsistencias.'
    },
    {
      icon: Globe,
      iconBg: '#E8F5E9', 
      iconColor: '#2E7D32',
      title: 'Accesibilidad',
      description: 'WCAG AA en todos los componentes. Focus visible, ARIA labels, reduced motion y soporte i18n ES/EN. Un sistema bancario debe ser usable por todos.'
    }
  ];

  const changelog = [
    {
      date: 'Mar 2026',
      type: 'Banking',
      dotColor: '#2E7D32',
      title: 'Componentes Banking',
      description: 'OTP Input, PIN Pad, Currency Input y Spending Chart. Componentes especializados para flujos de pagos y autenticación bancaria.'
    },
    {
      date: 'Mar 2026',
      type: 'System',
      dotColor: '#F57F17',
      title: 'Dark Mode + i18n',
      description: 'Sistema de temas con CSS Custom Properties. Soporte ES/EN con i18next. Toggle en topbar del dashboard.'
    },
    {
      date: 'Mar 2026',
      type: 'Component',
      dotColor: '#6A1B9A',
      title: 'Modal, Toast y Skeleton',
      description: 'Modal con focus trap y animaciones Framer Motion. Sistema de toasts con auto-dismiss. Skeleton loaders con efecto shimmer.'
    },
    {
      date: 'Mar 2026',
      type: 'Component',
      dotColor: '#6A1B9A',
      title: 'ProductCard expandible',
      description: 'Cards bancarias con sub-cuentas expandibles, CardVisual con gradientes y chip EMV. Animación con Framer Motion.'
    },
    {
      date: 'Mar 2026',
      type: 'Atom',
      dotColor: '#1565C0',
      title: 'v1.0.0 — Release inicial',
      description: 'Button, Input, Badge, Avatar, Card. 100+ tokens CSS. Dashboard con Foundations completas. Demo App Citibanamex.'
    }
  ];

  return (
    <div className="overview">
      {/* Hero Header */}
      <section className="overview-hero">
        <div className="overview-hero__circle"></div>
        <div className="overview-hero__content">
          <div className="overview-hero__badge">
            DESIGN SYSTEM · v1.0.0
          </div>
          <h1 className="overview-hero__title">
            Citibanamex
            <span style={{ color: '#E3173E' }}> Design System</span>
          </h1>
          <p className="overview-hero__subtitle">
            Librería de componentes React + TypeScript que garantiza
            consistencia visual en todos los productos digitales de Citibanamex México.
          </p>
          <div className="overview-hero__tags">
            <span className="overview-hero__tag">React 18</span>
            <span className="overview-hero__tag">TypeScript 5</span>
            <span className="overview-hero__tag">Vite 5</span>
            <span className="overview-hero__tag">Framer Motion</span>
            <span className="overview-hero__tag">100% TypeScript</span>
          </div>
          <div className="overview-hero__actions">
            <button 
              className="overview-hero__btn overview-hero__btn--primary"
              onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: { sectionId: 'buttons' } }))}
            >
              Ver Componentes →
            </button>
            <button className="overview-hero__btn overview-hero__btn--secondary">
              Ver Demo App →
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="overview-stats">
        <StatItem value={18} label="Componentes" />
        <StatItem value={100} label="Tokens CSS" suffix="+" />
        <StatItem value={5} label="Foundations" />
        <StatItem value={3} label="Idiomas" />
        <StatItem value={100} label="TypeScript" suffix="%" />
      </section>

      {/* Component Gallery */}
      <section className="overview-section">
        <div className="overview-section__header">
          <h2 className="overview-section__title">Componentes del Sistema</h2>
        </div>
        <div className="component-gallery">
          {componentsData.map((comp, index) => (
            <ComponentCard key={index} {...comp} />
          ))}
        </div>
      </section>

      {/* Design Principles */}
      <section className="overview-section">
        <div className="overview-section__header">
          <h2 className="overview-section__title">Principios de Diseño</h2>
        </div>
        <div className="principles-grid">
          {principles.map((principle, index) => (
            <div key={index} className="principle-card">
              <div 
                className="principle-card__icon" 
                style={{ backgroundColor: principle.iconBg, color: principle.iconColor }}
              >
                <principle.icon size={20} />
              </div>
              <div className="principle-card__content">
                <h3 className="principle-card__title">{principle.title}</h3>
                <p className="principle-card__description">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Changelog */}
      <section className="overview-section">
        <div className="overview-section__header">
          <h2 className="overview-section__title">Últimas Actualizaciones</h2>
        </div>
        <div className="changelog-timeline">
          {changelog.map((item, index) => (
            <div key={index} className="changelog-item">
              <div 
                className="changelog-dot" 
                style={{ backgroundColor: item.dotColor, boxShadow: `0 0 0 3px ${item.dotColor}20` }}
              ></div>
              <div className="changelog-content">
                <div className="changelog-header">
                  <span className="changelog-date">{item.date}</span>
                  <span 
                    className="changelog-badge"
                    style={{ 
                      backgroundColor: item.type === 'Banking' ? '#E8F5E9' : 
                                       item.type === 'System' ? '#FFF8E1' : '#F3E5F5',
                      color: item.type === 'Banking' ? '#2E7D32' : 
                             item.type === 'System' ? '#F57F17' : '#6A1B9A'
                    }}
                  >
                    {item.type}
                  </span>
                </div>
                <h4 className="changelog-title">{item.title}</h4>
                <p className="changelog-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
