import React from 'react';
import { Avatar } from '../Avatar';
import { Bell, Menu } from 'lucide-react';
import './AppHeader.css';

export interface AppHeaderProps {
  initials: string;
  name: string;
  tier: string;
  showModeList?: boolean;
  onModeListClick?: () => void;
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  initials,
  name,
  tier,
  showModeList = false,
  onModeListClick,
  className = '',
}) => {
  return (
    <header className={`app-header ${className}`}>
      <div className="app-header__left">
        <Avatar initials={initials} variant="teal" size="md" />
        <div className="app-header__user">
          <span className="app-header__name">{name}</span>
          <span className="app-header__tier">{tier}</span>
        </div>
      </div>
      <div className="app-header__right">
        {showModeList && (
          <button className="app-header__mode-list" onClick={onModeListClick}>
            Modo lista
          </button>
        )}
        <button className="app-header__icon">
          <Bell size={22} strokeWidth={1.5} />
        </button>
        <button className="app-header__icon">
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};
