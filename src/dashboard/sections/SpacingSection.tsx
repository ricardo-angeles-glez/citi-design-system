import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { spacing } from '../../tokens/spacing';
import './Foundations.css';
import { useTranslation } from 'react-i18next';

export const SpacingSection: React.FC = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const spacingRows = Object.entries(spacing).map(([key, value]) => ({
    name: key,
    token: `--spacing-${key}`,
    value: value,
    pixels: parseInt(value)
  }));

    return (
      <div className="foundations">
        <div className="foundations__header">
          <h1>{t('foundations.spacing.title')}</h1>
          <p>{t('foundations.spacing.description')}</p>
        </div>

       <section className="foundations__section">
         <h2>{t('foundations.spacing.scale')}</h2>
        <div className="foundations__spacing">
          {spacingRows.map((row) => (
            <div key={row.name} className="foundations__spacing-row">
              <span className="foundations__spacing-label">{row.name}</span>
              <div 
                className="foundations__spacing-bar" 
                style={{ width: `${Math.min(row.pixels * 2, 200)}px` }}
              />
              <span className="foundations__spacing-value">{row.value}</span>
              <button 
                className="foundations__copy"
                onClick={() => copyToClipboard(row.token)}
              >
                {copied === row.token ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="foundations__section">
        <h2>Aplicación en componentes</h2>
        <div className="foundations__spacing-examples">
          <div className="foundations__spacing-example">
            <p style={{ fontSize: '12px', color: '#767676', marginBottom: '8px' }}>Padding lg (16px)</p>
            <div style={{ padding: '16px', background: '#F5F5F5', borderRadius: '8px', border: '1px dashed #E3173E' }}>
              Contenido con padding 16px
            </div>
          </div>
          <div className="foundations__spacing-example">
            <p style={{ fontSize: '12px', color: '#767676', marginBottom: '8px' }}>Button padding xl (24px)</p>
            <button style={{ padding: '10px 24px', background: '#003B5C', color: 'white', border: 'none', borderRadius: '8px' }}>
              Botón con padding horizontal 24px
            </button>
          </div>
          <div className="foundations__spacing-example">
            <p style={{ fontSize: '12px', color: '#767676', marginBottom: '8px' }}>List gap sm (8px)</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '8px', background: '#F5F5F5', borderRadius: '4px' }}>Item 1</div>
              <div style={{ padding: '8px', background: '#F5F5F5', borderRadius: '4px' }}>Item 2</div>
              <div style={{ padding: '8px', background: '#F5F5F5', borderRadius: '4px' }}>Item 3</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
