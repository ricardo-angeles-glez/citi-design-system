import { X, Wifi, Battery, Signal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CitibanamexDemo } from '../pages/CitibanamexDemo';
import './DemoViewer.css';

interface DemoViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoViewer: React.FC<DemoViewerProps> = ({ isOpen, onClose }) => {
  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const deviceVariants = {
    initial: { opacity: 0, scale: 0.85, y: 40 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.85, y: 40 },
  };

  const transition = {
    duration: 0.4,
    ease: [0.34, 1.56, 0.64, 1],
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="demo-viewer"
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <motion.div
          className="iphone-frame"
          variants={deviceVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
        >
          <div className="iphone-screen">
            {/* Status Bar */}
            <div className="status-bar">
              <span className="status-time">9:41</span>
              <div className="status-icons">
                <Signal size={16} strokeWidth={2} />
                <Wifi size={16} strokeWidth={2} />
                <Battery size={16} strokeWidth={2} />
              </div>
            </div>

            {/* App Content */}
            <div className="app-content">
              <CitibanamexDemo />
            </div>

            {/* Home Indicator */}
            <div className="home-indicator">
              <div className="home-indicator-bar" />
            </div>
          </div>
        </motion.div>

        <div className="info-card">
          <h3 style={{ color: 'white', marginBottom: '16px' }}>Demo Citibanamex</h3>
          <p style={{ color: '#aaa', fontSize: '14px' }}>
            Navega entre las diferentes pantallas de la app bancaria.
            Usa el menú inferior para cambiar de sección.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
