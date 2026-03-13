import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Delete } from 'lucide-react';
import './PINPad.css';

export interface PINPadProps {
  onComplete: (pin: string) => void;
  length?: number;
  label?: string;
  error?: string;
}

export const PINPad: React.FC<PINPadProps> = ({
  onComplete,
  length = 4,
  label,
  error
}) => {
  const [pin, setPin] = useState('');

  const handleNumber = (num: string) => {
    if (pin.length < length) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === length) {
        onComplete(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '⌫'];

  return (
    <div className="pin-pad-container">
      {label && <p className="pin-pad-label">{label}</p>}
      
      <div className="pin-progress" role="progressbar" aria-valuenow={pin.length} aria-valuemin={0} aria-valuemax={length}>
        {Array.from({ length }).map((_, i) => (
          <motion.div
            key={i}
            className={`pin-dot ${i < pin.length ? 'filled' : ''}`}
            initial={false}
            animate={{ scale: i < pin.length ? 1 : 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          />
        ))}
      </div>

      {error && <p className="pin-error" role="alert">{error}</p>}

      <div className="pin-keypad">
        {numbers.map((num) => {
          const isDelete = num === '⌫';
          const isPlaceholder = num === '*';
          
          return (
            <motion.button
              key={num}
              className={`pin-key ${isDelete ? 'pin-key--delete' : ''} ${isPlaceholder ? 'pin-key--placeholder' : ''}`}
              whileTap={!isPlaceholder ? { scale: 0.92 } : {}}
              onClick={() => {
                if (!isPlaceholder) {
                  if (isDelete) {
                    handleDelete();
                  } else {
                    handleNumber(num);
                  }
                }
              }}
              disabled={isPlaceholder}
              aria-label={isDelete ? 'Borrar' : `Número ${num}`}
            >
              {isDelete ? <Delete size={20} /> : num}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
