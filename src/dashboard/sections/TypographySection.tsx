import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './Foundations.css';
import { useTranslation } from 'react-i18next';

export const TypographySection: React.FC = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const scaleRows = [
    { name: 'Display', token: '--font-size-4xl', size: '32px', weight: '400', lineHeight: '1.2', preview: t('typography.preview.display') },
    { name: 'H1', token: '--font-size-3xl', size: '24px', weight: '600', lineHeight: '1.2', preview: t('typography.preview.h1') },
    { name: 'H2', token: '--font-size-2xl', size: '20px', weight: '600', lineHeight: '1.3', preview: t('typography.preview.h2') },
    { name: 'H3', token: '--font-size-xl', size: '18px', weight: '500', lineHeight: '1.4', preview: t('typography.preview.h3') },
    { name: 'Body LG', token: '--font-size-lg', size: '16px', weight: '400', lineHeight: '1.5', preview: t('typography.preview.bodyLg') },
    { name: 'Body MD', token: '--font-size-md', size: '14px', weight: '400', lineHeight: '1.5', preview: t('typography.preview.bodyMd') },
    { name: 'Body SM', token: '--font-size-sm', size: '13px', weight: '400', lineHeight: '1.5', preview: t('typography.preview.bodySm') },
    { name: 'Caption', token: '--font-size-xs', size: '12px', weight: '400', lineHeight: '1.4', preview: t('typography.preview.caption') },
  ];

  const weights = [
    { name: 'Light', value: '300', token: '--font-weight-light' },
    { name: 'Regular', value: '400', token: '--font-weight-regular' },
    { name: 'Medium', value: '500', token: '--font-weight-medium' },
    { name: 'Semibold', value: '600', token: '--font-weight-semibold' },
    { name: 'Bold', value: '700', token: '--font-weight-bold' },
  ];

  return (
    <div className="foundations">
      <div className="foundations__header">
        <h1>{t('foundations.typography.title')}</h1>
        <p>{t('foundations.typography.description')}</p>
      </div>

      {/* Scale Table */}
      <section className="foundations__section">
        <h2>{t('foundations.typography.scale')}</h2>
        <div className="foundations__table-wrapper">
          <table className="foundations__table">
            <thead>
              <tr>
                <th>{t('foundations.typography.table.name')}</th>
                <th>{t('foundations.typography.table.token')}</th>
                <th>{t('foundations.typography.table.size')}</th>
                <th>{t('foundations.typography.table.weight')}</th>
                <th>{t('foundations.typography.table.lineHeight')}</th>
                <th>{t('foundations.typography.table.preview')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {scaleRows.map((row) => (
                <tr key={row.name}>
                  <td className="foundations__name">{row.name}</td>
                  <td className="foundations__token"><code>{row.token}</code></td>
                  <td>{row.size}</td>
                  <td>{row.weight}</td>
                  <td>{row.lineHeight}</td>
                  <td className="foundations__preview">{row.preview}</td>
                  <td>
                    <button
                      className="foundations__copy"
                      onClick={() => copyToClipboard(row.token)}
                    >
                      {copied === row.token ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Font Weights */}
      <section className="foundations__section">
        <h2>{t('foundations.typography.weights')}</h2>
        <div className="foundations__weights">
          {weights.map((w) => (
            <div key={w.name} className="foundations__weight">
              <span
                className="foundations__weight-preview"
                style={{ fontWeight: parseInt(w.value) }}
              >
                Citibanamex
              </span>
              <span className="foundations__weight-label">
                {w.name} {w.value}
              </span>
              <button
                className="foundations__copy"
                onClick={() => copyToClipboard(w.token)}
              >
                {copied === w.token ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};