import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Globe, CheckCircle, AlertTriangle,
  Eye, Keyboard, Monitor, Code2, Shield,
  ArrowRight, Contrast, MousePointer, Volume2
} from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { ListItem } from '../../components/ListItem';
import './ComponentsSection.css';

/* ═══════════════════════════════════════════
   ACCESSIBILITY PANEL
═══════════════════════════════════════════ */
const AccessibilityPanel: React.FC = () => {
  const { t } = useTranslation();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [keyboardNav, setKeyboardNav] = useState(false);

  const contrastItems = [
    {
      label: t('system.accessibility.wcag.textOnWhite'),
      bg: '#FFFFFF',
      darkBg: '#0D1117',
      fg: '#1A1A1A',
      darkFg: '#E6EDF3',
      ratio: '15.3:1',
      darkRatio: '14.8:1',
      pass: true,
    },
    {
      label: t('system.accessibility.wcag.primaryOnWhite'),
      bg: '#FFFFFF',
      darkBg: '#0D1117',
      fg: '#003B5C',
      darkFg: '#58A6FF',
      ratio: '10.1:1',
      darkRatio: '8.2:1',
      pass: true,
    },
    {
      label: t('system.accessibility.wcag.errorOnWhite'),
      bg: '#FFFFFF',
      darkBg: '#0D1117',
      fg: '#E3173E',
      darkFg: '#F85149',
      ratio: '4.8:1',
      darkRatio: '5.1:1',
      pass: true,
    },
    {
      label: t('system.accessibility.wcag.successOnWhite'),
      bg: '#FFFFFF',
      darkBg: '#0D1117',
      fg: '#00823B',
      darkFg: '#3FB950',
      ratio: '5.2:1',
      darkRatio: '5.6:1',
      pass: true,
    },
  ];

  const checklistItems = [
    { icon: <Contrast size={16} />, text: t('system.accessibility.checklist.contrast') },
    { icon: <Eye size={16} />, text: t('system.accessibility.checklist.focus') },
    { icon: <Code2 size={16} />, text: t('system.accessibility.checklist.ariaLabels') },
    { icon: <Keyboard size={16} />, text: t('system.accessibility.checklist.keyboard') },
    { icon: <Monitor size={16} />, text: t('system.accessibility.checklist.reducedMotion') },
    { icon: <Code2 size={16} />, text: t('system.accessibility.checklist.semanticHtml') },
    { icon: <AlertTriangle size={16} />, text: t('system.accessibility.checklist.errorMessages') },
    { icon: <MousePointer size={16} />, text: t('system.accessibility.checklist.touchTargets') },
  ];

  const ariaExamples = [
    { component: 'Modal', attrs: 'role="dialog" aria-modal="true" aria-labelledby="title"' },
    { component: 'Toast', attrs: 'role="alert" aria-live="polite"' },
    { component: 'OTPInput', attrs: 'aria-label="Dígito 1 de 6" aria-invalid={!!error}' },
    { component: 'PINPad', attrs: 'role="progressbar" aria-valuenow={pin.length}' },
    { component: 'Button', attrs: 'disabled aria-disabled="true"' },
    { component: 'Input', attrs: 'aria-describedby="error-id" aria-invalid="true"' },
  ];

  return (
    <>
      {/* ── WCAG Contrast ─────────────────── */}
      <section className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('system.accessibility.wcag.title')}</h2>
          <span className="components-section__badge components-section__badge--new">WCAG AA</span>
        </div>
        <p className="components-section__description">
          {t('system.accessibility.wcag.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {contrastItems.map((item, i) => {
              const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
              const bg = isDark ? item.darkBg : item.bg;
              const fg = isDark ? item.darkFg : item.fg;
              const ratio = isDark ? item.darkRatio : item.ratio;

              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 16px',
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 12,
                    transition: 'all 200ms',
                  }}
                >
                  {/* Color swatch */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      background: bg,
                      border: '1px solid var(--border-default)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 16,
                      color: fg,
                      flexShrink: 0,
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    Aa
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.label}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: 'var(--interactive-success)',
                          background: 'rgba(0, 130, 59, 0.1)',
                          padding: '1px 6px',
                          borderRadius: 4,
                        }}
                      >
                        {ratio}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                        min 4.5:1
                      </span>
                    </div>
                  </div>
                  <CheckCircle size={18} color="var(--interactive-success)" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Focus & Keyboard ──────────────── */}
      <section className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('system.accessibility.focus.title')}</h2>
          <span className="components-section__badge">
            <Keyboard size={12} style={{ marginRight: 4 }} />
            Tab + Enter
          </span>
        </div>
        <p className="components-section__description">
          {t('system.accessibility.focus.description')}
        </p>
        <div className="components-section__preview">
          <div
            style={{
              background: 'var(--surface-bg-tertiary)',
              borderRadius: 10,
              padding: '12px 16px',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Keyboard size={14} color="var(--interactive-primary)" />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {t('system.accessibility.focus.instruction')}
            </span>
          </div>
          <div className="components-section__row" style={{ flexWrap: 'wrap', gap: 12 }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div style={{ marginTop: 16, maxWidth: 320 }}>
            <Input placeholder={t('system.accessibility.focus.inputPlaceholder')} />
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`/* Focus visible — applied globally */
*:focus-visible {
  outline: 2px solid var(--interactive-primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}</pre>
        </div>
      </section>

      {/* ── ARIA Labels ───────────────────── */}
      <section className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('system.accessibility.aria.title')}</h2>
          <span className="components-section__badge">
            <Volume2 size={12} style={{ marginRight: 4 }} />
            Screen Reader
          </span>
        </div>
        <p className="components-section__description">
          {t('system.accessibility.aria.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {ariaExamples.map((ex, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  background: i % 2 === 0 ? 'var(--surface-bg-tertiary)' : 'transparent',
                  borderRadius: 8,
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 12,
                  lineHeight: 1.5,
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    color: 'var(--interactive-primary)',
                    flexShrink: 0,
                    minWidth: 80,
                    fontFamily: 'var(--font-sans, sans-serif)',
                    fontSize: 13,
                  }}
                >
                  {ex.component}
                </span>
                <code
                  style={{
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {ex.attrs}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Checklist ─────────────────────── */}
      <section className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('system.accessibility.checklist.title')}</h2>
          <span
            className="components-section__badge"
            style={{
              background: 'rgba(0, 130, 59, 0.1)',
              color: 'var(--interactive-success)',
            }}
          >
            8/8
          </span>
        </div>
        <div className="components-section__preview">
          <div style={{ display: 'grid', gap: 4 }}>
            {checklistItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  background: i % 2 === 0 ? 'var(--surface-bg-tertiary)' : 'transparent',
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: 'rgba(0, 130, 59, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--interactive-success)',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-primary)', flex: 1 }}>
                  {item.text}
                </span>
                <CheckCircle size={16} color="var(--interactive-success)" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ═══════════════════════════════════════════
   DARK MODE PANEL
═══════════════════════════════════════════ */
const DarkModePanel: React.FC = () => {
  const { t } = useTranslation();
  const [currentTheme, setCurrentTheme] = useState(
    document.documentElement.getAttribute('data-theme') || 'light'
  );

  // Keep in sync with actual theme
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setCurrentTheme(document.documentElement.getAttribute('data-theme') || 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    const next = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    setCurrentTheme(next);
  }, [currentTheme]);

  const tokenMap = [
    { token: '--surface-bg', light: '#FFFFFF', dark: '#0D1117', category: 'Surface' },
    { token: '--surface-elevated', light: '#FFFFFF', dark: '#1C2128', category: 'Surface' },
    { token: '--surface-bg-tertiary', light: '#F5F5F5', dark: '#21262D', category: 'Surface' },
    { token: '--text-primary', light: '#1A1A1A', dark: '#E6EDF3', category: 'Text' },
    { token: '--text-secondary', light: '#767676', dark: '#8B949E', category: 'Text' },
    { token: '--text-tertiary', light: '#9E9E9E', dark: '#6E7681', category: 'Text' },
    { token: '--border-default', light: '#E0E0E0', dark: '#30363D', category: 'Border' },
    { token: '--border-subtle', light: '#F0F0F0', dark: '#21262D', category: 'Border' },
    { token: '--interactive-primary', light: '#003B5C', dark: '#58A6FF', category: 'Interactive' },
    { token: '--interactive-danger', light: '#E3173E', dark: '#F85149', category: 'Interactive' },
    { token: '--interactive-success', light: '#00823B', dark: '#3FB950', category: 'Interactive' },
  ];

  return (
    <>
      {/* ── Theme Toggle ──────────────────── */}
      <section className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('system.darkmode.overview.title')}</h2>
        </div>
        <p className="components-section__description">
          {t('system.darkmode.overview.description')}
        </p>
        <div className="components-section__preview">
          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              padding: '20px 0',
            }}
          >
            {/* Light option */}
            <div
              onClick={() => {
                document.documentElement.setAttribute('data-theme', 'light');
                setCurrentTheme('light');
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                padding: '20px 32px',
                borderRadius: 14,
                cursor: 'pointer',
                background: currentTheme === 'light'
                  ? 'linear-gradient(135deg, #FFF8E1, #FFECB3)'
                  : 'var(--surface-bg-tertiary)',
                border: '2px solid',
                borderColor: currentTheme === 'light' ? '#FFC62B' : 'var(--border-subtle)',
                transition: 'all 250ms ease',
                minWidth: 140,
              }}
            >
              <Sun
                size={32}
                color={currentTheme === 'light' ? '#F5A623' : 'var(--text-tertiary)'}
              />
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: currentTheme === 'light' ? '#8B6914' : 'var(--text-tertiary)',
                }}
              >
                {t('system.darkmode.overview.lightMode')}
              </span>
              {currentTheme === 'light' && (
                <CheckCircle size={16} color="#8B6914" />
              )}
            </div>

            {/* Dark option */}
            <div
              onClick={() => {
                document.documentElement.setAttribute('data-theme', 'dark');
                setCurrentTheme('dark');
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                padding: '20px 32px',
                borderRadius: 14,
                cursor: 'pointer',
                background: currentTheme === 'dark'
                  ? 'linear-gradient(135deg, #1A1A2E, #16213E)'
                  : 'var(--surface-bg-tertiary)',
                border: '2px solid',
                borderColor: currentTheme === 'dark' ? '#58A6FF' : 'var(--border-subtle)',
                transition: 'all 250ms ease',
                minWidth: 140,
              }}
            >
              <Moon
                size={32}
                color={currentTheme === 'dark' ? '#58A6FF' : 'var(--text-tertiary)'}
              />
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: currentTheme === 'dark' ? '#58A6FF' : 'var(--text-tertiary)',
                }}
              >
                {t('system.darkmode.overview.darkMode')}
              </span>
              {currentTheme === 'dark' && (
                <CheckCircle size={16} color="#58A6FF" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Component Preview ─────────────── */}
      <section className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('system.darkmode.preview.title')}</h2>
        </div>
        <p className="components-section__description">
          {t('system.darkmode.preview.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Left: Card with buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Card title={t('system.darkmode.preview.cardTitle')} elevation="medium">
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 12px' }}>
                  {t('system.darkmode.preview.cardContent')}
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button variant="primary" size="sm">
                    Primary
                  </Button>
                  <Button variant="secondary" size="sm">
                    Secondary
                  </Button>
                </div>
              </Card>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Badge label="Active" variant="active" />
                <Badge label="Warning" variant="warning" />
                <Badge label="Error" variant="error" />
                <Badge label="Nuevo" variant="nuevo" />
              </div>
            </div>

            {/* Right: Input + Avatar + ListItem */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Input placeholder={t('system.darkmode.preview.inputPlaceholder')} />
              <Input
                placeholder="Error state"
                error={t('system.darkmode.preview.errorExample')}
              />
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Avatar initials="JA" variant="teal" size="sm" />
                <Avatar initials="MR" variant="red" size="sm" />
                <Avatar initials="PL" variant="gray" size="sm" />
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                  Avatars
                </span>
              </div>
              <Button variant="ghost" size="sm">
                {t('system.darkmode.preview.ghostButton')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Token Mapping ─────────────────── */}
      <section className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('system.darkmode.tokens.title')}</h2>
          <span className="components-section__badge">{tokenMap.length} tokens</span>
        </div>
        <p className="components-section__description">
          {t('system.darkmode.tokens.description')}
        </p>
        <div className="components-section__preview" style={{ padding: 0, overflow: 'hidden' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 13,
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '12px 16px',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: 'var(--surface-bg-secondary)',
                    borderBottom: '2px solid var(--border-default)',
                  }}
                >
                  Token
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '12px 16px',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: 'var(--surface-bg-secondary)',
                    borderBottom: '2px solid var(--border-default)',
                  }}
                >
                  <Sun size={12} style={{ marginRight: 4, display: 'inline' }} />
                  Light
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '12px 16px',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: 'var(--surface-bg-secondary)',
                    borderBottom: '2px solid var(--border-default)',
                  }}
                >
                  <Moon size={12} style={{ marginRight: 4, display: 'inline' }} />
                  Dark
                </th>
              </tr>
            </thead>
            <tbody>
              {tokenMap.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    background:
                      i % 2 === 0 ? 'var(--surface-bg-tertiary)' : 'transparent',
                  }}
                >
                  <td
                    style={{
                      padding: '10px 16px',
                      fontFamily: 'var(--font-mono, monospace)',
                      color: 'var(--interactive-primary)',
                      fontWeight: 500,
                      fontSize: 12,
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    {row.token}
                  </td>
                  <td
                    style={{
                      padding: '10px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 5,
                          background: row.light,
                          border: '1px solid #E0E0E0',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          color: 'var(--text-secondary)',
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: 11,
                        }}
                      >
                        {row.light}
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: '10px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 5,
                          background: row.dark,
                          border: '1px solid #484F58',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          color: 'var(--text-secondary)',
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: 11,
                        }}
                      >
                        {row.dark}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="components-section__code">
          <pre>{`/* Implementation */
:root {
  --surface-bg: #FFFFFF;
  --text-primary: #1A1A1A;
  --interactive-primary: #003B5C;
}

[data-theme="dark"] {
  --surface-bg: #0D1117;
  --text-primary: #E6EDF3;
  --interactive-primary: #58A6FF;
}

/* React toggle */
const [theme, setTheme] = useState('light');
document.documentElement.setAttribute('data-theme', theme);`}</pre>
        </div>
      </section>
    </>
  );
};

/* ═══════════════════════════════════════════
   I18N PANEL
═══════════════════════════════════════════ */
const I18nPanel: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const coverageData = [
    { area: t('system.i18n.coverage.sidebar'), keys: 30, color: 'var(--interactive-primary)' },
    { area: t('system.i18n.coverage.overview'), keys: 45, color: '#6A1B9A' },
    { area: t('system.i18n.coverage.foundations'), keys: 28, color: '#2E7D32' },
    { area: t('system.i18n.coverage.atoms'), keys: 22, color: '#F57F17' },
    { area: t('system.i18n.coverage.components'), keys: 38, color: '#C62828' },
    { area: t('system.i18n.coverage.system'), keys: 35, color: '#00838F' },
  ];

  const totalKeys = coverageData.reduce((sum, d) => sum + d.keys, 0);
  const maxKeys = Math.max(...coverageData.map((d) => d.keys));

  // Translation comparison pairs
  const translationPairs = [
    { key: 'sidebar.overview', es: 'Vista General', en: 'Overview' },
    { key: 'common.confirm', es: 'Confirmar', en: 'Confirm' },
    { key: 'products.savings', es: 'Bolsas de ahorro', en: 'Savings' },
    { key: 'navigation.transfer', es: 'Transferir', en: 'Transfer' },
    { key: 'common.cancel', es: 'Cancelar', en: 'Cancel' },
    { key: 'overview.stats.components', es: 'Componentes', en: 'Components' },
  ];

  return (
    <>
      {/* ── Language Selector ─────────────── */}
      <section className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('system.i18n.overview.title')}</h2>
          <span className="components-section__badge">
            {currentLang.toUpperCase()}
          </span>
        </div>
        <p className="components-section__description">
          {t('system.i18n.overview.description')}
        </p>
        <div className="components-section__preview">
          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              padding: '16px 0',
            }}
          >
            {[
              { code: 'es', label: 'Español', sub: 'México' },
              { code: 'en', label: 'English', sub: 'United States' },
            ].map((lang) => (
              <motion.div
                key={lang.code}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => i18n.changeLanguage(lang.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px 28px',
                  borderRadius: 14,
                  cursor: 'pointer',
                  background:
                    currentLang === lang.code
                      ? 'var(--interactive-primary)'
                      : 'var(--surface-elevated)',
                  color:
                    currentLang === lang.code ? '#FFFFFF' : 'var(--text-primary)',
                  border: '2px solid',
                  borderColor:
                    currentLang === lang.code
                      ? 'var(--interactive-primary)'
                      : 'var(--border-default)',
                  transition: 'background 200ms, border-color 200ms',
                  minWidth: 180,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: currentLang === lang.code
                      ? 'rgba(255,255,255,0.2)'
                      : 'var(--surface-bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontWeight: 700,
                    fontSize: 13,
                    color: currentLang === lang.code
                      ? '#FFFFFF'
                      : 'var(--interactive-primary)',
                    letterSpacing: '0.5px',
                  }}
                >
                  {lang.code.toUpperCase()}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>
                    {lang.label}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      margin: '2px 0 0',
                      opacity: 0.7,
                    }}
                  >
                    {lang.sub}
                  </p>
                </div>
                {currentLang === lang.code && (
                  <CheckCircle size={18} style={{ marginLeft: 'auto' }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Demo ─────────────────────── */}
      <section className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('system.i18n.liveDemo.title')}</h2>
          <span className="components-section__badge components-section__badge--new">
            Live
          </span>
        </div>
        <p className="components-section__description">
          {t('system.i18n.liveDemo.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Left: Actions Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Card title={t('system.i18n.liveDemo.cardTitle')} elevation="low">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Button variant="primary" size="sm">
                    {t('common.confirm')}
                  </Button>
                  <Button variant="ghost" size="sm">
                    {t('common.cancel')}
                  </Button>
                  <Button variant="danger" size="sm">
                    {t('common.close')}
                  </Button>
                </div>
              </Card>

              {/* Navigation badges */}
              <div
                style={{
                  padding: 16,
                  borderRadius: 10,
                  background: 'var(--surface-bg-tertiary)',
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: 'var(--text-tertiary)',
                    margin: '0 0 8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: 600,
                  }}
                >
                  {t('system.i18n.liveDemo.navigation')}
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Badge label={t('navigation.home')} variant="active" />
                  <Badge label={t('navigation.transfer')} variant="beneficios" />
                  <Badge label={t('navigation.payments')} variant="promo" />
                  <Badge label={t('navigation.more')} variant="nuevo" />
                </div>
              </div>
            </div>

            {/* Right: Products + Translation pairs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  padding: 16,
                  borderRadius: 10,
                  background: 'var(--surface-bg-tertiary)',
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: 'var(--text-tertiary)',
                    margin: '0 0 8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: 600,
                  }}
                >
                  {t('system.i18n.liveDemo.products')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {['savings', 'investments', 'credit'].map((key) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 0',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          color: 'var(--text-primary)',
                          fontWeight: 500,
                        }}
                      >
                        {t(`products.${key}`)}
                      </span>
                      <ArrowRight size={14} color="var(--text-tertiary)" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Translation key examples */}
              <div
                style={{
                  padding: 16,
                  borderRadius: 10,
                  background: 'var(--surface-bg-tertiary)',
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: 'var(--text-tertiary)',
                    margin: '0 0 8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: 600,
                  }}
                >
                  Key → {currentLang.toUpperCase()}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {translationPairs.slice(0, 4).map((pair, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 12,
                        padding: '4px 0',
                      }}
                    >
                      <code
                        style={{
                          background: 'var(--surface-elevated)',
                          padding: '2px 6px',
                          borderRadius: 4,
                          color: 'var(--interactive-primary)',
                          fontSize: 10,
                          flexShrink: 0,
                        }}
                      >
                        {pair.key}
                      </code>
                      <ArrowRight size={10} color="var(--text-tertiary)" />
                      <span
                        style={{
                          color: 'var(--text-primary)',
                          fontWeight: 600,
                          fontSize: 12,
                        }}
                      >
                        {currentLang === 'es' ? pair.es : pair.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Coverage ──────────────────────── */}
      <section className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('system.i18n.coverage.title')}</h2>
          <span className="components-section__badge">
            {totalKeys}+ keys
          </span>
        </div>
        <div className="components-section__preview">
          {/* Total bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
              padding: '16px 0 24px',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: 20,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: 'var(--interactive-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {totalKeys}+
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: 'var(--text-tertiary)',
                  margin: '4px 0 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {t('system.i18n.coverage.totalKeys')}
              </p>
            </div>
            <div
              style={{
                width: 1,
                height: 48,
                background: 'var(--border-default)',
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: 'var(--interactive-success)',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                }}
              >
                2
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: 'var(--text-tertiary)',
                  margin: '4px 0 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {t('system.i18n.coverage.languages')}
              </p>
            </div>
            <div
              style={{
                width: 1,
                height: 48,
                background: 'var(--border-default)',
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: 'var(--interactive-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                }}
              >
                100%
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: 'var(--text-tertiary)',
                  margin: '4px 0 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {t('system.i18n.coverage.coverage')}
              </p>
            </div>
          </div>

          {/* Per-section bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {coverageData.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    width: 100,
                    textAlign: 'right',
                    flexShrink: 0,
                    fontWeight: 500,
                  }}
                >
                  {item.area}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 24,
                    background: 'var(--surface-bg-tertiary)',
                    borderRadius: 6,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.keys / maxKeys) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: item.color,
                      borderRadius: 6,
                      opacity: 0.8,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    width: 36,
                    flexShrink: 0,
                  }}
                >
                  {item.keys}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── File Structure ────────────────── */}
      <section className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('system.i18n.structure.title')}</h2>
        </div>
        <p className="components-section__description">
          {t('system.i18n.structure.description')}
        </p>
        <div className="components-section__code">
          <pre>{`// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en }
  },
  lng: 'es',
  fallbackLng: 'es',
});

// Usage in components:
const { t, i18n } = useTranslation();

// Translate text
<h1>{t('overview.hero.title')}</h1>

// Switch language
i18n.changeLanguage('en');

// File structure:
// src/i18n/
// ├── index.ts          → i18next config
// └── locales/
//     ├── es.json       → Spanish (198 keys)
//     └── en.json       → English (198 keys)`}</pre>
        </div>
      </section>
    </>
  );
};

/* ═══════════════════════════════════════════
   MAIN SYSTEM SECTION
═══════════════════════════════════════════ */
interface SystemSectionProps {
  activeTab?: 'accessibility' | 'darkmode' | 'i18n';
}

export const SystemSection: React.FC<SystemSectionProps> = ({
  activeTab = 'accessibility',
}) => {
  const { t } = useTranslation();

  const getTitle = () => {
    switch (activeTab) {
      case 'accessibility':
        return t('system.accessibility.title');
      case 'darkmode':
        return t('system.darkmode.title');
      case 'i18n':
        return t('system.i18n.title');
    }
  };

  const getDescription = () => {
    switch (activeTab) {
      case 'accessibility':
        return t('system.accessibility.description');
      case 'darkmode':
        return t('system.darkmode.description');
      case 'i18n':
        return t('system.i18n.description');
    }
  };

  return (
    <div className="components-section">
      <div className="components-section__header">
        <h1>{getTitle()}</h1>
        <p>{getDescription()}</p>
      </div>

      {activeTab === 'accessibility' && <AccessibilityPanel />}
      {activeTab === 'darkmode' && <DarkModePanel />}
      {activeTab === 'i18n' && <I18nPanel />}
    </div>
  );
};