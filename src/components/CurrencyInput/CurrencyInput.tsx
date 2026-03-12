import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CurrencyInput.css';

export interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  currency?: 'MXN' | 'USD';
  label?: string;
  maxValue?: number;
  error?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  currency = 'MXN',
  label,
  maxValue,
  error
}) => {
  const [displayValue, setDisplayValue] = useState('0.00');
  const [activeCurrency, setActiveCurrency] = useState(currency);

  useEffect(() => {
    // Format value for display
    const formatted = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: activeCurrency,
      minimumFractionDigits: 2
    }).format(value || 0);
    setDisplayValue(formatted);
  }, [value, activeCurrency]);

  const handleKeyPress = (num: string) => {
    // Simple logic: append number to current value * 10 + num
    // For real app, would use a more sophisticated input method
    const newValue = (value * 10) + parseFloat(num);
    if (!maxValue || newValue <= maxValue) {
      onChange(newValue);
    }
  };

  const handleClear = () => {
    onChange(0);
  };

  const handleBackspace = () => {
    const newValue = Math.floor(value / 10);
    onChange(newValue);
  };

  const toggleCurrency = () => {
    setActiveCurrency(prev => prev === 'MXN' ? 'USD' : 'MXN');
  };

  // Numeric keypad layout
  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '.', '0', '⌫'
  ];

  return (
    <div className="currency-input-container">
      {label && <label className="currency-input-label">{label}</label>}
      
      <div className="currency-display-wrapper">
        <div className={`currency-display ${error ? 'currency-display--error' : ''} ${value === 0 ? 'currency-display--zero' : ''}`}>
          {displayValue}
        </div>
        <button 
          className="currency-toggle" 
          onClick={toggleCurrency}
          aria-label={`Cambiar a ${activeCurrency === 'MXN' ? 'USD' : 'MXN'}`}
        >
          {activeCurrency}
        </button>
      </div>

      {maxValue && (
        <div className="currency-balance">
          Saldo disponible: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: activeCurrency }).format(maxValue)}
        </div>
      )}

      {error && <p className="currency-error" role="alert">{error}</p>}

      <div className="currency-keypad">
        {keys.map((key) => (
          <motion.button
            key={key}
            className="currency-key"
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (key === '⌫') handleBackspace();
              else if (key === '.') handleClear(); // Simplified: '.' clears for demo
              else handleKeyPress(key);
            }}
            aria-label={key === '⌫' ? 'Borrar' : key}
          >
            {key}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
