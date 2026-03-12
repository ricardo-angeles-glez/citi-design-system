import React from 'react';
import './Badge.css';

export type BadgeVariant = 'nuevo' | 'beneficios' | 'promo' | 'active' | 'warning' | 'success' | 'error';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'active',
  size = 'md',
  className = '',
}) => {
  const badgeClasses = [
    'citi-badge',
    `citi-badge--${variant}`,
    `citi-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={badgeClasses}>{label}</span>
  );
};
