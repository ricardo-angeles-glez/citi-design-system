import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CardVisual } from '../CardVisual';
import { MoreVertical } from 'lucide-react';
import { formatCurrency, type Product as ProductType } from '../../data/mockData';
import './ProductCard.css';

export interface ProductCardProps {
  product: ProductType;
  onPress?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    if (product.expandable) {
      setExpanded(!expanded);
    }
    if (onPress) {
      onPress(product.id);
    }
  };

  const cardClasses = [
    'citi-product-card',
    `citi-product-card--${product.id}`,
    product.expandable ? 'citi-product-card--expandable' : ''
  ].join(' ');

  return (
    <div className={cardClasses}>
      {/* Header - Always visible */}
      <div className="citi-product-card__header" onClick={toggleExpand}>
        <div className="citi-product-card__header-info">
          <span className="citi-product-card__category">{product.category}</span>
          {product.count !== null && (
            <span className="citi-product-card__count">({product.count})</span>
          )}
        </div>
        <div className="citi-product-card__header-right">
          <span className="citi-product-card__total-balance">
            {formatCurrency(product.balance || 0)}
          </span>
          {product.expandable && (
            <motion.div
              className="citi-product-card__chevron"
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <MoreVertical size={16} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Expandable Content */}
      {product.expandable && (
        <motion.div
          className="citi-product-card__expandable-content"
          initial={false}
          animate={{ 
            height: expanded ? 'auto' : 0, 
            opacity: expanded ? 1 : 0 
          }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div className="citi-product-card__accounts">
            {product.accounts?.map((account) => (
              <div key={account.id} className="citi-product-card__sub-account">
                <div className="citi-product-card__sub-info">
                  <div className="citi-product-card__sub-header">
                    <span className="citi-product-card__sub-name">{account.name}</span>
                    <span className="citi-product-card__sub-number">{account.number}</span>
                  </div>
                  <div className="citi-product-card__sub-balance">
                    <span>Saldo</span>
                    <span className={account.balanceMXN && account.balanceMXN < 0 ? 'text-negative' : ''}>
                      {formatCurrency(account.balanceMXN || 0)}
                    </span>
                  </div>
                  {account.creditAvailable !== null && (
                    <div className="citi-product-card__sub-credit">
                      <span>Crédito disponible</span>
                      <span className="text-positive">
                        {formatCurrency(account.creditAvailable)}
                      </span>
                    </div>
                  )}
                  {account.canBlock && (
                    <button className="citi-product-card__block-btn">
                      Bloquear
                    </button>
                  )}
                </div>
                <CardVisual
                  cardName={account.name}
                  cardNumber={account.number}
                  cardBg={account.cardBg}
                  cardAccent={account.cardAccent}
                  type={account.type}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
