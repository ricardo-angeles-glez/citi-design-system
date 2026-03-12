import { X, Check } from 'lucide-react';
import { CitibanamexDemo } from '../pages/CitibanamexDemo';
import './DemoViewer.css';

interface DemoViewerProps {
  onClose: () => void;
}

export const DemoViewer: React.FC<DemoViewerProps> = ({ onClose }) => {
  return (
    <div className="demo-viewer">
      <button className="demo-viewer__close" onClick={onClose}>
        <X size={28} />
      </button>
      
      <div className="demo-viewer__content">
        {/* iPhone Frame */}
        <div className="demo-viewer__phone">
          <div className="demo-viewer__notch"></div>
          <div className="demo-viewer__screen">
            <CitibanamexDemo />
          </div>
          <div className="demo-viewer__home"></div>
        </div>

        {/* Info Card */}
        <div className="demo-viewer__info">
          <h3 className="demo-viewer__title">Citibanamex App</h3>
          <p className="demo-viewer__subtitle">Design System v1.0</p>
          
          <ul className="demo-viewer__features">
            <li>
              <Check size={16} />
              <span>8 Componentes</span>
            </li>
            <li>
              <Check size={16} />
              <span>Tokens de diseño</span>
            </li>
            <li>
              <Check size={16} />
              <span>Fuente BanamexDisplay</span>
            </li>
            <li>
              <Check size={16} />
              <span>Mock data real</span>
            </li>
            <li>
              <Check size={16} />
              <span>Responsive</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
