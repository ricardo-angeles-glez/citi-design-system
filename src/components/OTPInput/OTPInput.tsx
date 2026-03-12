import React, { useState, useRef, useEffect } from 'react';
import './OTPInput.css';

export interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
  error?: string;
  label?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  error,
  label
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (values.every(v => v !== '')) {
      onComplete(values.join(''));
    }
  }, [values, onComplete]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only numbers

    const newValues = [...values];
    newValues[index] = value.slice(-1); // Take last char
    setValues(newValues);

    // Auto-focus next
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    
    const newValues = [...values];
    for (let i = 0; i < pastedData.length; i++) {
      newValues[i] = pastedData[i];
    }
    setValues(newValues);
    
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="otp-input-container" role="group" aria-labelledby={label ? "otp-label" : undefined}>
      {label && <label id="otp-label" className="otp-label">{label}</label>}
      
      <div className="otp-inputs-wrapper">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={el => { inputsRef.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={`otp-input ${error ? 'otp-input--error' : ''}`}
            value={values[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            aria-label={`Dígito ${index + 1} de ${length}`}
            aria-invalid={!!error}
          />
        ))}
      </div>

      {error && <p className="otp-error" role="alert">{error}</p>}
    </div>
  );
};
