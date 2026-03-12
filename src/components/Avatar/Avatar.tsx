import React from 'react';
import './Avatar.css';

export type AvatarVariant = 'teal' | 'red' | 'gray';
export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  initials: string;
  variant?: AvatarVariant;
  size?: AvatarSize;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  variant = 'teal',
  size = 'md',
  className = '',
}) => {
  const avatarClasses = [
    'citi-avatar',
    `citi-avatar--${variant}`,
    `citi-avatar--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={avatarClasses}>
      {initials}
    </div>
  );
};
