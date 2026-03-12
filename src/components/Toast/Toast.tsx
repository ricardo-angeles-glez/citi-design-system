import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import './Toast.css';

export interface ToastProps {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, variant, duration = 4000, onClose }) => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      if (!isPaused) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, isPaused, onClose]);

  const getIcon = () => {
    switch (variant) {
      case 'success': return <CheckCircle size={16} />;
      case 'error': return <XCircle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      case 'info': return <Info size={16} />;
      default: return null;
    }
  };

  const variants = {
    initial: { opacity: 0, x: 60, scale: 0.9 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 60, scale: 0.9 }
  };

  return (
    <motion.div
      className={`toast toast--${variant}`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      <div className="toast-icon">
        {getIcon()}
      </div>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Cerrar notificación">
        <X size={14} />
      </button>
    </motion.div>
  );
};
