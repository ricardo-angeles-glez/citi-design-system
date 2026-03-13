import React from 'react';
import './Button.css';

/** Visual style variant of the button */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/** Size variant controlling padding and font size */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component.
 * Extends all native HTML button attributes.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant.
   * - `primary` — Citi Blue filled button for main actions
   * - `secondary` — outlined button for secondary actions
   * - `ghost` — transparent button for tertiary actions
   * - `danger` — Citi Red button for destructive actions
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button controlling padding and font size.
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * When true, displays a spinner and disables the button.
   * Use during async operations like API calls.
   * @default false
   */
  isLoading?: boolean;

  /**
   * When true, button stretches to fill its container width.
   * @default false
   */
  fullWidth?: boolean;

  /** Button content — text, icons, or a combination */
  children?: React.ReactNode;

  /**
   * Accessible label for screen readers.
   * Required when button contains only an icon with no visible text.
   */
  ariaLabel?: string;
}

/**
 * Primary interactive element of the Citibanamex Design System.
 *
 * @example
 * // Primary action
 * <Button variant="primary" onClick={handleSubmit}>
 *   Confirmar transferencia
 * </Button>
 *
 * @example
 * // Loading state during API call
 * <Button variant="primary" isLoading={isSubmitting}>
 *   Enviando...
 * </Button>
 *
 * @example
 * // Danger action with full width
 * <Button variant="danger" fullWidth onClick={handleBlock}>
 *   Bloquear tarjeta
 * </Button>
 *
 * @example
 * // Icon-only button with accessible label
 * <Button variant="ghost" ariaLabel="Cerrar modal">
 *   <X size={20} />
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ariaLabel,
  ...props
}) => {
  const classes = [
    'citi-button',
    `citi-button--${variant}`,
    `citi-button--${size}`,
    fullWidth && 'citi-button--full-width',
    isLoading && 'citi-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <span className="citi-button__spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="31.4 31.4"
            />
          </svg>
        </span>
      )}
      {children && (
        <span className={isLoading ? 'citi-button__content--hidden' : 'citi-button__content'}>
          {children}
        </span>
      )}
    </button>
  );
};