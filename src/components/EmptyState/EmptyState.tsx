import React from 'react';
import { Inbox, Search, WifiOff, CloudOff } from 'lucide-react';
import { Button } from '../Button';
import './EmptyState.css';

export interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  variant?: 'default' | 'search' | 'error' | 'offline';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  variant = 'default'
}) => {
  const getIcon = () => {
    if (Icon) return <Icon size={32} />;
    
    switch (variant) {
      case 'search': return <Search size={32} />;
      case 'error': return <WifiOff size={32} />;
      case 'offline': return <CloudOff size={32} />;
      default: return <Inbox size={32} />;
    }
  };

  return (
    <div className="empty-state">
      <div className="empty-state__icon-container">
        {getIcon()}
      </div>
      <h3 className="empty-state__title">{title}</h3>
      {description && (
        <p className="empty-state__description">{description}</p>
      )}
      {action && (
        <div className="empty-state__action">
          <Button variant="ghost" onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
};
