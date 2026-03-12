import React from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect' | 'card';
  width?: number | string;
  height?: number | string;
  lines?: number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width = '100%',
  height,
  lines = 1,
  className = ''
}) => {
  if (variant === 'card') {
    return (
      <div className={`skeleton-card ${className}`}>
        <Skeleton variant="rect" width="40%" height="16px" />
        <div style={{ height: '8px' }} />
        <Skeleton variant="rect" width="60%" height="14px" />
        <div style={{ height: '12px' }} />
        <Skeleton variant="rect" width="100%" height="80px" />
      </div>
    );
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`skeleton-text-group ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="skeleton skeleton--text"
            style={{
              width: i === lines - 1 ? '60%' : width,
              height: height || '14px',
              marginBottom: i < lines - 1 ? '8px' : 0
            }}
          />
        ))}
      </div>
    );
  }

  const style: React.CSSProperties = {
    width: width,
    height: variant === 'circle' ? width : height || (variant === 'text' ? '14px' : '100%'),
    borderRadius: variant === 'circle' ? '50%' : (variant === 'text' ? '4px' : '8px')
  };

  return (
    <div
      className={`skeleton skeleton--${variant} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

// Composition helpers
export const SkeletonProductCard: React.FC = () => (
  <div className="skeleton-product-card">
    <div className="skeleton-product-card__header">
      <Skeleton variant="rect" width="40%" height="16px" />
      <Skeleton variant="rect" width="30%" height="20px" />
    </div>
  </div>
);

export const SkeletonListItem: React.FC = () => (
  <div className="skeleton-list-item">
    <Skeleton variant="circle" width="36px" height="36px" />
    <div className="skeleton-list-item__content">
      <Skeleton variant="text" width="60%" height="14px" />
      <Skeleton variant="text" width="40%" height="12px" />
    </div>
    <Skeleton variant="rect" width="20%" height="16px" />
  </div>
);
