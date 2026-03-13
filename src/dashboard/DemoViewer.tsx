import { X, Wifi, Battery, Signal, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CitiDemo } from '../pages/CitiDemo';
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

  const mobileVariants = {
    initial: { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100%' },
  };

  const transition = {
    duration: 0.4,
    ease: [0.34, 1.56, 0.64, 1],
  };

  const mobileTransition = {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94],
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* ── Desktop: Phone mockup ──────────── */}
      <motion.div
        className="demo-viewer demo-viewer--desktop"
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <button className="demo-viewer__close" onClick={onClose} aria-label="Cerrar demo">
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
            <div className="status-bar">
              <span className="status-time">9:41</span>
              <div className="status-icons">
                <Signal size={16} strokeWidth={2} />
                <Wifi size={16} strokeWidth={2} />
                <Battery size={16} strokeWidth={2} />
              </div>
            </div>

            <div className="app-content">
              <CitiDemo />
            </div>

            <div className="home-indicator">
              <div className="home-indicator-bar" />
            </div>
          </div>
        </motion.div>

        <div className="demo-viewer__info">
          <h3>Demo Citi</h3>
          <p>
            Navega entre las diferentes pantallas de la app bancaria.
            Usa el menú inferior para cambiar de sección.
          </p>
        </div>
      </motion.div>

      {/* ── Mobile: Fullscreen app ─────────── */}
      <motion.div
        className="demo-viewer demo-viewer--mobile"
        variants={mobileVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={mobileTransition}
      >
        <div className="demo-viewer__mobile-header">
          <button
            className="demo-viewer__back"
            onClick={onClose}
            aria-label="Volver al Design System"
          >
            <ArrowLeft size={20} />
            <span>Design System</span>
          </button>
          <span className="demo-viewer__mobile-title">Demo App</span>
          <button
            className="demo-viewer__mobile-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="demo-viewer__mobile-content">
          <CitiDemo />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};