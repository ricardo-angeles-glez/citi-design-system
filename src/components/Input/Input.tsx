import React from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  disabled,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const containerClasses = [
    'citi-input__container',
    error && 'citi-input__container--error',
    disabled && 'citi-input__container--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'citi-input',
    error && 'citi-input--error',
    disabled && 'citi-input--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="citi-input__label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={inputClasses}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-required={props.required}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className="citi-input__error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
