import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  ariaLabel?: string;
}

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
      {...props}
    >
      {isLoading && (
        <span className="citi-button__spinner">
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
