import React from 'react';
import './Card.css';

export type CardElevation = 'low' | 'medium' | 'high';
export type CardVariant = 'default' | 'outlined';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  elevation?: CardElevation;
  variant?: CardVariant;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  elevation = 'medium',
  variant = 'default',
  className = '',
}) => {
  const cardClasses = [
    'citi-card',
    `citi-card--elevation-${elevation}`,
    `citi-card--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses}>
      {title && (
        <div className="citi-card__header">
          <h3 className="citi-card__title">{title}</h3>
        </div>
      )}
      <div className="citi-card__content">{children}</div>
      {footer && (
        <div className="citi-card__footer">{footer}</div>
      )}
    </div>
  );
};
