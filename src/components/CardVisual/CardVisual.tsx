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

  // Specific gradients for cards
  let gradientStyle;
  if (cardBg === '#B8860B') {
    gradientStyle = { background: 'linear-gradient(135deg, #8B6914 0%, #D4AF37 50%, #B8960C 100%)' };
  } else if (cardBg === '#2C3E50') {
    gradientStyle = { background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #E74C3C 100%)' };
  } else if (cardBg === '#1A3A5C') {
    gradientStyle = { background: 'linear-gradient(135deg, #003B5C 0%, #005A8E 60%, #0073B1 100%)' };
  } else if (cardBg === '#E3173E') {
    gradientStyle = { background: 'linear-gradient(135deg, #C41230 0%, #E3173E 60%, #FF4D6D 100%)' };
  } else {
    gradientStyle = { background: `linear-gradient(135deg, ${cardBg}, ${cardAccent})` };
  }

  return (
    <div className={cardClasses} style={gradientStyle}>
      <div className="card-visual__gloss" />
      
      {/* Chip for credit cards */}
      {type === 'credit' && (
        <div className="card-visual__chip">
          <div className="card-visual__chip-line-h" />
          <div className="card-visual__chip-line-v" />
        </div>
      )}
      
      {/* Logo */}
      <span className="card-visual__logo">citi</span>
      
      {/* Card Number */}
      <span className="card-visual__number">{cardNumber}</span>
      
      {/* Payment Network */}
      <span className="card-visual__network">
        {type === 'credit' ? 'VISA' : 'MC'}
      </span>
    </div>
  );
};
