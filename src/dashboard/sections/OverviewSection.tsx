import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Layers, Palette, Type, LayoutGrid, 
  MousePointer, FormInput, Tag, User, Square, Bell, 
  CreditCard, Loader, KeyRound, Hash, DollarSign, BarChart2,
  Shield, Zap, Globe, ArrowRight
} from 'lucide-react';
import './OverviewSection.css';

// ─── Interfaces ───────────────────────────────────────────

interface ComponentCardProps {
  category: 'Atom' | 'Component' | 'Banking' | 'System' | 'Foundation';
  titleKey: string;
  descriptionKey: string;
  icon: React.ElementType;
  previewColor: string;
  sectionId: string;
  count?: number;
  isNew?: boolean;
}

interface PrincipleProps {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  titleKey: string;
  descriptionKey: string;
}

interface ChangelogItemProps {
  date: string;
  type: string;
  dotColor: string;
  titleKey: string;
  descriptionKey: string;
}

// ─── Sub-components ───────────────────────────────────────

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  const styles: Record<string, { bg: string; color: string }> = {
    Atom:        { bg: '#E3F2FD', color: '#1565C0' },
    Component:   { bg: '#F3E5F5', color: '#6A1B9A' },
    Banking:     { bg: '#E8F5E9', color: '#2E7D32' },
    System:      { bg: '#FFF8E1', color: '#F57F17' },
    Foundation:  { bg: '#FBE9E7', color: '#BF360C' },
  };
  const s = styles[category] || styles.Atom;
  return (
    <span style={{
      position: 'absolute', top: 8, right: 8,
      padding: '2px 8px', borderRadius: 10,
      fontSize: 10, fontWeight: 600,
      background: s.bg, color: s.color
    }}>
      {category}
    </span>
  );
};

const ComponentCard: React.FC<ComponentCardProps> = ({
  category, titleKey, descriptionKey, icon: Icon,
  previewColor, sectionId, count, isNew
}) => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-section', {
      detail: { sectionId }
    }));
  };

  return (
    <div
      className="component-card"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 200ms',
        boxShadow: hovered ? 'var(--shadow-md)' : 'none',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* Preview area */}
      <div style={{
        background: previewColor,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Icon size={36} color="rgba(255,255,255,0.9)" />
        <CategoryBadge category={category} />
        {isNew && (
          <span style={{
            position: 'absolute', top: 8, left: 8,
            padding: '2px 8px', borderRadius: 10,
            fontSize: 10, fontWeight: 700,
            background: '#E3173E', color: 'white'
          }}>
            NEW
          </span>
        )}
      </div>

      {/* Info area */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
            {t(titleKey)}
          </span>
          <ArrowRight
            size={16}
            color="var(--interactive-primary)"
            style={{
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 200ms',
              flexShrink: 0
            }}
          />
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '4px 0 0' }}>
          {t(descriptionKey)}
        </p>
        {count !== undefined && (
          <span style={{
            display: 'inline-block',
            marginTop: 8,
            fontSize: 11, color: 'var(--text-secondary)',
            background: 'var(--surface-bg-tertiary)',
            padding: '2px 8px', borderRadius: 10
          }}>
            {count} {t('overview.variants')}
          </span>
        )}
      </div>
    </div>
  );
};

const StatItem: React.FC<{ value: number; label: string; suffix?: string }> = ({
  value, label, suffix = ''
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div style={{ textAlign: 'center', padding: '0 24px' }}>
      <div style={{
        fontFamily: 'BanamexDisplay',
        fontSize: 32, fontWeight: 700,
        color: 'var(--interactive-primary)'
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: 12, color: 'var(--text-tertiary)',
        marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.5px'
      }}>
        {label}
      </div>
    </div>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{
    fontSize: 20, fontWeight: 700,
    color: 'var(--text-primary)',
    borderLeft: '3px solid #E3173E',
    paddingLeft: 12, margin: '0 0 20px'
  }}>
    {children}
  </h2>
);

// ─── Main Component ────────────────────────────────────────

export const OverviewSection: React.FC = () => {
  const { t } = useTranslation();

  const componentsData: ComponentCardProps[] = [
    // Foundations
    { category: 'Foundation', titleKey: 'overview.components.colors.title',
      descriptionKey: 'overview.components.colors.description',
      icon: Palette, previewColor: '#003B5C', sectionId: 'colors', count: 70 },
    { category: 'Foundation', titleKey: 'overview.components.typography.title',
      descriptionKey: 'overview.components.typography.description',
      icon: Type, previewColor: '#1A1A2E', sectionId: 'typography', count: 9 },
    { category: 'Foundation', titleKey: 'overview.components.spacing.title',
      descriptionKey: 'overview.components.spacing.description',
      icon: LayoutGrid, previewColor: '#0D3349', sectionId: 'spacing', count: 9 },
    // Atoms
    { category: 'Atom', titleKey: 'overview.components.buttons.title',
      descriptionKey: 'overview.components.buttons.description',
      icon: MousePointer, previewColor: '#1565C0', sectionId: 'buttons', count: 4 },
    { category: 'Atom', titleKey: 'overview.components.inputs.title',
      descriptionKey: 'overview.components.inputs.description',
      icon: FormInput, previewColor: '#1976D2', sectionId: 'inputs', count: 3 },
    { category: 'Atom', titleKey: 'overview.components.badges.title',
      descriptionKey: 'overview.components.badges.description',
      icon: Tag, previewColor: '#1565C0', sectionId: 'badges', count: 6 },
    { category: 'Atom', titleKey: 'overview.components.avatars.title',
      descriptionKey: 'overview.components.avatars.description',
      icon: User, previewColor: '#0D47A1', sectionId: 'avatars', count: 4 },
    { category: 'Atom', titleKey: 'overview.components.cards.title',
      descriptionKey: 'overview.components.cards.description',
      icon: Square, previewColor: '#1565C0', sectionId: 'cards', count: 4 },
    // Components
    { category: 'Component', titleKey: 'overview.components.modal.title',
      descriptionKey: 'overview.components.modal.description',
      icon: Layers, previewColor: '#6A1B9A', sectionId: 'modal', isNew: true },
    { category: 'Component', titleKey: 'overview.components.toast.title',
      descriptionKey: 'overview.components.toast.description',
      icon: Bell, previewColor: '#7B1FA2', sectionId: 'toast', isNew: true },
    { category: 'Component', titleKey: 'overview.components.productcards.title',
      descriptionKey: 'overview.components.productcards.description',
      icon: CreditCard, previewColor: '#4A148C', sectionId: 'productcards', count: 2 },
    { category: 'Component', titleKey: 'overview.components.skeleton.title',
      descriptionKey: 'overview.components.skeleton.description',
      icon: Loader, previewColor: '#6A1B9A', sectionId: 'skeleton', isNew: true },
    // Banking
    { category: 'Banking', titleKey: 'overview.components.otpinput.title',
      descriptionKey: 'overview.components.otpinput.description',
      icon: KeyRound, previewColor: '#2E7D32', sectionId: 'otpinput', isNew: true },
    { category: 'Banking', titleKey: 'overview.components.pinpad.title',
      descriptionKey: 'overview.components.pinpad.description',
      icon: Hash, previewColor: '#388E3C', sectionId: 'pinpad', isNew: true },
    { category: 'Banking', titleKey: 'overview.components.currencyinput.title',
      descriptionKey: 'overview.components.currencyinput.description',
      icon: DollarSign, previewColor: '#1B5E20', sectionId: 'currencyinput', isNew: true },
    { category: 'Banking', titleKey: 'overview.components.chart.title',
      descriptionKey: 'overview.components.chart.description',
      icon: BarChart2, previewColor: '#2E7D32', sectionId: 'chart', isNew: true },
  ];

  const principles: PrincipleProps[] = [
    { icon: Shield, iconBg: '#E3F2FD', iconColor: '#1565C0',
      titleKey: 'overview.principles.confidence.title',
      descriptionKey: 'overview.principles.confidence.description' },
    { icon: Zap, iconBg: '#FFF8E1', iconColor: '#F57F17',
      titleKey: 'overview.principles.clarity.title',
      descriptionKey: 'overview.principles.clarity.description' },
    { icon: Layers, iconBg: '#F3E5F5', iconColor: '#6A1B9A',
      titleKey: 'overview.principles.composition.title',
      descriptionKey: 'overview.principles.composition.description' },
    { icon: Globe, iconBg: '#E8F5E9', iconColor: '#2E7D32',
      titleKey: 'overview.principles.accessibility.title',
      descriptionKey: 'overview.principles.accessibility.description' },
  ];

  const changelog: ChangelogItemProps[] = [
    { date: 'Mar 2026', type: 'Banking', dotColor: '#2E7D32',
      titleKey: 'overview.changelog.banking.title',
      descriptionKey: 'overview.changelog.banking.description' },
    { date: 'Mar 2026', type: 'System', dotColor: '#F57F17',
      titleKey: 'overview.changelog.system.title',
      descriptionKey: 'overview.changelog.system.description' },
    { date: 'Mar 2026', type: 'Component', dotColor: '#6A1B9A',
      titleKey: 'overview.changelog.component1.title',
      descriptionKey: 'overview.changelog.component1.description' },
    { date: 'Mar 2026', type: 'Component', dotColor: '#6A1B9A',
      titleKey: 'overview.changelog.component2.title',
      descriptionKey: 'overview.changelog.component2.description' },
    { date: 'Mar 2026', type: 'Atom', dotColor: '#1565C0',
      titleKey: 'overview.changelog.release.title',
      descriptionKey: 'overview.changelog.release.description' },
  ];

  return (
    <div className="overview-section">

      {/* ── HERO ─────────────────────────────── */}
      <section className="overview-hero">
        <div className="overview-hero__circle" />
        <div className="overview-hero__content">
          <div className="overview-hero__badge">
            {t('overview.hero.badge')}
          </div>
          <h1 className="overview-hero__title">
            Citibanamex
            <span style={{ color: '#E3173E' }}> Design System</span>
          </h1>
          <p className="overview-hero__subtitle">
            {t('overview.hero.subtitle')}
          </p>
          <div className="overview-hero__tags">
            {['React 18', 'TypeScript 5', 'Vite 5', 'Framer Motion', '100% TypeScript'].map(tag => (
              <span key={tag} className="overview-hero__tag">{tag}</span>
            ))}
          </div>
          <div className="overview-hero__actions">
            <button
              className="overview-hero__btn overview-hero__btn--primary"
              onClick={() => window.dispatchEvent(
                new CustomEvent('navigate-to-section', { detail: { sectionId: 'buttons' } })
              )}
            >
              {t('overview.hero.actions.viewComponents')}
            </button>
            <button
              className="overview-hero__btn overview-hero__btn--secondary"
              onClick={() => window.dispatchEvent(
                new CustomEvent('navigate-to-section', { detail: { sectionId: 'demo' } })
              )}
            >
              {t('overview.hero.actions.viewDemo')}
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────── */}
      <section style={{
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 12,
        padding: '24px 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        marginBottom: 40,
      }}>
        <StatItem value={18}  label={t('overview.stats.components')} />
        <StatItem value={100} label={t('overview.stats.cssTokens')} suffix="+" />
        <StatItem value={5}   label={t('overview.stats.foundations')} />
        <StatItem value={3}   label={t('overview.stats.languages')} />
        <StatItem value={100} label={t('overview.stats.typescript')} suffix="%" />
      </section>

      {/* ── COMPONENT GALLERY ────────────────── */}
      <section style={{ marginBottom: 40 }}>
        <SectionTitle>{t('overview.sections.components.title')}</SectionTitle>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16
        }}>
          {componentsData.map((comp, i) => (
            <ComponentCard key={i} {...comp} />
          ))}
        </div>
      </section>

      {/* ── DESIGN PRINCIPLES ────────────────── */}
      <section style={{ marginBottom: 40 }}>
        <SectionTitle>{t('overview.sections.principles.title')}</SectionTitle>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16
        }}>
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} style={{
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 12,
                padding: '20px 24px',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: 40, height: 40, flexShrink: 0,
                  borderRadius: 10,
                  background: p.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={20} color={p.iconColor} />
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600,
                    color: 'var(--text-primary)', margin: 0 }}>
                    {t(p.titleKey)}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)',
                    margin: '4px 0 0', lineHeight: 1.5 }}>
                    {t(p.descriptionKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CHANGELOG ────────────────────────── */}
      <section style={{ marginBottom: 40 }}>
        <SectionTitle>{t('overview.sections.changelog.title')}</SectionTitle>
        <div style={{ position: 'relative', paddingLeft: 24 }}>
          {/* Línea vertical */}
          <div style={{
            position: 'absolute', left: 4, top: 8,
            bottom: 8, width: 2,
            background: 'var(--border-default)'
          }} />
          {changelog.map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16,
              paddingBottom: 24, position: 'relative'
            }}>
              {/* Dot */}
              <div style={{
                width: 10, height: 10, flexShrink: 0,
                borderRadius: '50%',
                background: item.dotColor,
                border: '2px solid var(--surface-bg)',
                boxShadow: `0 0 0 3px ${item.dotColor}40`,
                marginTop: 4,
                position: 'absolute', left: -20
              }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                    {item.date}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 600,
                    padding: '2px 8px', borderRadius: 10,
                    background: `${item.dotColor}20`,
                    color: item.dotColor
                  }}>
                    {item.type}
                  </span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600,
                  color: 'var(--text-primary)', margin: '4px 0 0' }}>
                  {t(item.titleKey)}
                </p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)',
                  margin: '4px 0 0', lineHeight: 1.5 }}>
                  {t(item.descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};