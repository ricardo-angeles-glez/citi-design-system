import React from 'react';
import './CardVisual.css';

export interface CardVisualProps {
  cardName?: string;
  cardNumber: string;
  cardBg: string;
  cardAccent: string;
  type: 'credit' | 'debit';
  size?: 'sm' | 'md';
}

export const CardVisual: React.FC<CardVisualProps> = ({
  cardNumber,
  cardBg,
  cardAccent,
  type,
  size = 'md'
}) => {
  const cardClasses = [
    'card-visual',
    `card-visual--${size}`,
    `card-visual--${type}`
  ].join(' ');

  const gradientStyle = {
    background: `linear-gradient(135deg, ${cardBg}, ${cardAccent})`
  };

  return (
    <div className={cardClasses} style={gradientStyle}>
      <div className="card-visual__content">
        <div className="card-visual__top">
          {type === 'credit' && <div className="card-visual__chip" />}
          <span className="card-visual__logo">citi</span>
        </div>
        <div className="card-visual__bottom">
          <span className="card-visual__number">{cardNumber}</span>
          <span className="card-visual__type">
            {type === 'credit' ? 'VISA' : 'MC'}
          </span>
        </div>
      </div>
    </div>
  );
};
