import { Layers, Sliders, Code } from 'lucide-react';
import { colors } from '../../tokens/colors';
import './OverviewSection.css';

export const OverviewSection: React.FC = () => {
  const colorSwatches = [
    { name: 'Primary', color: colors.primary[500] },
    { name: 'Accent', color: colors.accent[500] },
    { name: 'Success', color: colors.success[500] },
    { name: 'Warning', color: colors.warning[500] },
    { name: 'Error', color: colors.error[500] },
  ];

  return (
    <div className="overview">
      {/* Stats Cards */}
      <div className="overview__stats">
        <div className="overview__stat">
          <div className="overview__stat-icon overview__stat-icon--teal">
            <Layers size={24} />
          </div>
          <div className="overview__stat-content">
            <span className="overview__stat-value">8</span>
            <span className="overview__stat-label">Componentes</span>
          </div>
        </div>
        
        <div className="overview__stat">
          <div className="overview__stat-icon overview__stat-icon--purple">
            <Sliders size={24} />
          </div>
          <div className="overview__stat-content">
            <span className="overview__stat-value">47</span>
            <span className="overview__stat-label">Tokens</span>
          </div>
        </div>
        
        <div className="overview__stat">
          <div className="overview__stat-icon overview__stat-icon--green">
            <Code size={24} />
          </div>
          <div className="overview__stat-content">
            <span className="overview__stat-value">100%</span>
            <span className="overview__stat-label">TypeScript</span>
          </div>
        </div>
      </div>

      {/* Color Swatches */}
      <div className="overview__section">
        <h2 className="overview__section-title">Colores principales</h2>
        <div className="overview__colors">
          {colorSwatches.map((swatch) => (
            <div key={swatch.name} className="overview__color">
              <div 
                className="overview__color-swatch" 
                style={{ backgroundColor: swatch.color }}
              />
              <span className="overview__color-name">{swatch.name}</span>
              <span className="overview__color-hex">{swatch.color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="overview__section">
        <h2 className="overview__section-title">Tipografía</h2>
        <div className="overview__typography">
          <div className="overview__type-row">
            <span className="overview__type-preview overview__type-preview--display">Citibanamex</span>
            <span className="overview__type-info">Display - 32px</span>
          </div>
          <div className="overview__type-row">
            <span className="overview__type-preview overview__type-preview--h1">Design System</span>
            <span className="overview__type-info">H1 - 24px</span>
          </div>
          <div className="overview__type-row">
            <span className="overview__type-preview overview__type-preview--h2">Componentes</span>
            <span className="overview__type-info">H2 - 20px</span>
          </div>
          <div className="overview__type-row">
            <span className="overview__type-preview overview__type-preview--body">Texto de ejemplo</span>
            <span className="overview__type-info">Body - 14px</span>
          </div>
          <div className="overview__type-row">
            <span className="overview__type-preview overview__type-preview--caption">Texto secundario</span>
            <span className="overview__type-info">Caption - 12px</span>
          </div>
        </div>
      </div>
    </div>
  );
};
