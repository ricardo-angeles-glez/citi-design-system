import React from 'react';
import './Input.css';

/**
 * Props for the Input component.
 * Extends all native HTML input attributes.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Visible label rendered above the input field.
   * Automatically linked to the input via `htmlFor` for accessibility.
   */
  label?: string;

  /**
   * Error message displayed below the input.
   * When provided, applies error styling and sets `aria-invalid="true"`.
   */
  error?: string;

  /**
   * When true, disables the input and applies disabled styling.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Accessible text input component for the Citibanamex Design System.
 *
 * Automatically generates a unique `id` if not provided, ensuring
 * the label is always associated with the input for screen readers.
 *
 * @example
 * // Basic input with label
 * <Input
 *   label="Número de cuenta"
 *   placeholder="000000000000000000"
 * />
 *
 * @example
 * // Controlled input with error state
 * <Input
 *   label="CLABE interbancaria"
 *   value={clabe}
 *   onChange={(e) => setClabe(e.target.value)}
 *   error="La CLABE debe tener 18 dígitos"
 * />
 *
 * @example
 * // Password input
 * <Input
 *   label="Contraseña"
 *   type="password"
 *   placeholder="Ingresa tu contraseña"
 * />
 *
 * @example
 * // Disabled state
 * <Input
 *   label="RFC"
 *   value="AAGB850101AAA"
 *   disabled
 * />
 */
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
        <span
          id={`${inputId}-error`}
          className="citi-input__error-message"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};