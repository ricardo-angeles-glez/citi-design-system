import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '../Button';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  variant?: 'default' | 'danger' | 'success';
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  variant = 'default',
  primaryAction,
  secondaryAction,
  children
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);

  // Focus trap logic
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const elements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const elementsArray = Array.from(elements);
      setFocusableElements(elementsArray);
      
      // Focus first element
      if (elementsArray.length > 0) {
        elementsArray[0].focus();
      }
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      // Focus trap with Tab
      if (e.key === 'Tab' && isOpen && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, focusableElements]);

  if (!isOpen) return null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    }
  };

  const getIcon = () => {
    if (variant === 'danger') {
      return (
        <div className="modal-icon-wrapper danger">
          <AlertTriangle size={24} />
        </div>
      );
    }
    if (variant === 'success') {
      return (
        <div className="modal-icon-wrapper success">
          <CheckCircle size={24} />
        </div>
      );
    }
    return null;
  };

  const getButtonVariant = () => {
    if (variant === 'danger') return 'danger';
    if (variant === 'success') return 'primary'; // Or a specific success variant if exists
    return 'primary';
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
        role="presentation"
      >
        <motion.div
          ref={modalRef}
          className="modal-container"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby={description ? "modal-description" : undefined}
        >
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <X size={20} />
          </button>

          {getIcon()}

          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>
          
          {description && (
            <p id="modal-description" className="modal-description">
              {description}
            </p>
          )}

          <div className="modal-content">
            {children}
          </div>

          <div className="modal-actions">
            {secondaryAction && (
              <Button 
                variant="ghost" 
                onClick={secondaryAction.onClick}
                fullWidth
              >
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button 
                variant={getButtonVariant()} 
                onClick={primaryAction.onClick}
                fullWidth
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
