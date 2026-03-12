import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './Foundations.css';
import { useTranslation } from 'react-i18next';

export const BordersSection: React.FC = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const radiusValues = [
    { name: 'sm', value: '6px', token: '--radius-sm' },
    { name: 'md', value: '10px', token: '--radius-md' },
    { name: 'lg', value: '12px', token: '--radius-lg' },
    { name: 'xl', value: '16px', token: '--radius-xl' },
    { name: '2xl', value: '20px', token: '--radius-2xl' },
    { name: 'full', value: '9999px', token: '--radius-full' },
  ];

  const borderWidths = [1, 2, 4, 8];

    return (
      <div className="foundations">
        <div className="foundations__header">
          <h1>{t('foundations.borders.title')}</h1>
          <p>{t('foundations.borders.description')}</p>
        </div>

       <section className="foundations__section">
         <h2>{t('foundations.borders.borderRadius')}</h2>
        <div className="foundations__radius-grid">
          {radiusValues.map((r) => (
            <div key={r.name} className="foundations__radius-item">
              <div 
                className="foundations__radius-box" 
                style={{ borderRadius: r.value }}
              />
              <span className="foundations__radius-label">{r.name} ({r.value})</span>
              <button 
                className="foundations__copy"
                onClick={() => copyToClipboard(r.token)}
              >
                {copied === r.token ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="foundations__section">
        <h2>Border Widths</h2>
        <div className="foundations__borders">
          {borderWidths.map((w) => (
            <div key={w} className="foundations__border-item">
              <div 
                className="foundations__border-line" 
                style={{ width: '80px', height: `${w}px` }}
              />
              <span className="foundations__radius-label">{w}px</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
