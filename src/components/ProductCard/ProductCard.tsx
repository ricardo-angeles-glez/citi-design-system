import React from 'react';
import { Badge } from '../Badge';
import type { BadgeVariant } from '../Badge';
import './ProductCard.css';

export type ProductCategory = 'savings' | 'investment' | 'credit' | 'debit';

export interface ProductCardProps {
  categoryColor: ProductCategory;
  categoryLabel: string;
  accountName?: string;
  accountNumber?: string;
  balance?: string;
  balanceNegative?: boolean;
  badgeText?: string;
  badgeVariant?: BadgeVariant;
  showBalance?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  categoryColor,
  categoryLabel,
  accountName,
  accountNumber,
  balance,
  balanceNegative = false,
  badgeText,
  badgeVariant = 'active',
  showBalance = true,
  children,
  className = '',
}) => {
  const cardClasses = [
    'citi-product-card',
    `citi-product-card--${categoryColor}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses}>
      <div className="citi-product-card__header">
        <span className="citi-product-card__category">{categoryLabel}</span>
        {badgeText && (
          <Badge label={badgeText} variant={badgeVariant} size="sm" />
        )}
      </div>
      
      {children ? (
        <div className="citi-product-card__content">{children}</div>
      ) : (
        <>
          {accountName && (
            <div className="citi-product-card__name">{accountName}</div>
          )}
          {accountNumber && (
            <div className="citi-product-card__number">{accountNumber}</div>
          )}
          {showBalance && balance !== undefined && (
            <div className={`citi-product-card__balance ${balanceNegative ? 'citi-product-card__balance--negative' : ''}`}>
              {balance}
            </div>
          )}
        </>
      )}
      
      <button className="citi-product-card__menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="12" cy="19" r="2"/>
        </svg>
      </button>
    </div>
  );
};
