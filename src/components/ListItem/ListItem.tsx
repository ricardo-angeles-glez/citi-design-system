import React from 'react';
import { Badge } from '../Badge';
import type { BadgeVariant } from '../Badge';
import './ListItem.css';

export interface ListItemProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  amount?: string;
  amountNegative?: boolean;
  badgeText?: string;
  badgeVariant?: BadgeVariant;
  showDivider?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  icon,
  title,
  subtitle,
  amount,
  amountNegative = false,
  badgeText,
  badgeVariant = 'active',
  showDivider = true,
  onClick,
  className = '',
}) => {
  const listItemClasses = [
    'citi-list-item',
    showDivider && 'citi-list-item--divider',
    onClick && 'citi-list-item--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={listItemClasses} onClick={onClick}>
      {icon && <div className="citi-list-item__icon">{icon}</div>}
      
      <div className="citi-list-item__content">
        <div className="citi-list-item__title">{title}</div>
        {subtitle && <div className="citi-list-item__subtitle">{subtitle}</div>}
      </div>
      
      <div className="citi-list-item__right">
        {amount !== undefined && (
          <span className={`citi-list-item__amount ${amountNegative ? 'citi-list-item__amount--negative' : ''}`}>
            {amount}
          </span>
        )}
        {badgeText && (
          <Badge label={badgeText} variant={badgeVariant} size="sm" />
        )}
      </div>
    </div>
  );
};
