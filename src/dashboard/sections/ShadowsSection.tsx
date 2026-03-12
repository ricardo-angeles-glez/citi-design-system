import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './Foundations.css';

export const ShadowsSection: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const shadows = [
    { name: 'sm', label: 'Nivel 1 - Sutil', value: '0 1px 3px rgba(0,0,0,0.08)', token: '--shadow-sm' },
    { name: 'md', label: 'Nivel 2 - Cards', value: '0 4px 12px rgba(0,0,0,0.1)', token: '--shadow-md' },
    { name: 'lg', label: 'Nivel 3 - Modales', value: '0 8px 24px rgba(0,0,0,0.15)', token: '--shadow-lg' },
    { name: 'xl', label: 'Nivel 4 - Overlay', value: '0 16px 48px rgba(0,0,0,0.2)', token: '--shadow-xl' },
  ];

  return (
    <div className="foundations">
      <div className="foundations__header">
        <h1>Sombras</h1>
        <p>Niveles de elevación del sistema</p>
      </div>

      <section className="foundations__section">
        <h2>Niveles de sombra</h2>
        <div className="foundations__shadows-grid">
          {shadows.map((s) => (
            <div 
              key={s.name} 
              className="foundations__shadow-card"
              style={{ boxShadow: s.value }}
            >
              <span className="foundations__shadow-label">{s.label}</span>
              <span className="foundations__shadow-value">{s.value}</span>
              <button 
                className="foundations__copy"
                onClick={() => copyToClipboard(s.token)}
              >
                {copied === s.token ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
