import React from 'react';
import './Card.css';

/**
 * Elevation level controlling box-shadow depth.
 * Maps to shadow tokens: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
 */
export type CardElevation = 'low' | 'medium' | 'high';

/**
 * Visual style variant of the card.
 * - `default` — filled surface with elevation shadow
 * - `outlined` — transparent background with visible border
 */
export type CardVariant = 'default' | 'outlined';

/**
 * Props for the Card component.
 */
export interface CardProps {
  /**
   * Optional title rendered in the card header.
   * Uses `h3` semantics for proper document outline.
   */
  title?: string;

  /**
   * Main content of the card.
   * Accepts any React node — text, components, or layouts.
   */
  children: React.ReactNode;

  /**
   * Optional footer content rendered at the bottom of the card.
   * Typically used for actions or supplementary information.
   */
  footer?: React.ReactNode;

  /**
   * Shadow depth level for visual elevation.
   * - `low` — subtle shadow for flat surfaces
   * - `medium` — default elevation for cards
   * - `high` — pronounced shadow for floating elements
   * @default 'medium'
   */
  elevation?: CardElevation;

  /**
   * Visual style variant.
   * - `default` — filled background with elevation
   * - `outlined` — border-only style, no shadow
   * @default 'default'
   */
  variant?: CardVariant;

  /** Additional CSS class names to apply to the card root element */
  className?: string;
}

/**
 * Flexible container component for grouping related content.
 * Used throughout the Citibanamex Design System for product summaries,
 * form sections, and content panels.
 *
 * @example
 * // Basic card with title and content
 * <Card title="Resumen de cuenta">
 *   <p>Saldo disponible: $45,230.50</p>
 * </Card>
 *
 * @example
 * // Card with footer actions
 * <Card
 *   title="Transferencia pendiente"
 *   elevation="high"
 *   footer={<Button variant="primary">Confirmar</Button>}
 * >
 *   <p>Monto: $5,000.00 MXN</p>
 * </Card>
 *
 * @example
 * // Outlined variant for secondary content
 * <Card variant="outlined" elevation="low">
 *   <p>Información adicional</p>
 * </Card>
 */
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