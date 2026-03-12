import React from 'react';
import { 
  ShoppingCart, 
  Store, 
  Briefcase, 
  Tv, 
  ArrowUpRight, 
  UtensilsCrossed, 
  Zap, 
  Music,
  type LucideIcon
} from 'lucide-react';

interface IconWrapperProps {
  iconName: string;
  category: string;
  size?: number;
}

const categoryStyles: Record<string, { bg: string; color: string }> = {
  'Compras': { bg: '#E8F4FF', color: '#1565C0' },
  'Comercio': { bg: '#F3F4F6', color: '#4B5563' },
  'Depósito': { bg: '#E8F5E9', color: '#00823B' },
  'Entretenimiento': { bg: '#F3E8FF', color: '#7C3AED' },
  'Transferencia': { bg: '#E8F5F8', color: '#003B5C' },
  'Restaurantes': { bg: '#FFF3E0', color: '#E65100' },
  'Servicios': { bg: '#FFFDE7', color: '#F57F17' },
};

const iconMap: Record<string, LucideIcon> = {
  'ShoppingCart': ShoppingCart,
  'Store': Store,
  'Briefcase': Briefcase,
  'Tv': Tv,
  'ArrowUpRight': ArrowUpRight,
  'UtensilsCrossed': UtensilsCrossed,
  'Zap': Zap,
  'Music': Music,
};

export const IconWrapper: React.FC<IconWrapperProps> = ({ 
  iconName, 
  category,
  size = 18 
}) => {
  const Icon = iconMap[iconName] || ShoppingCart;
  const style = categoryStyles[category] || { bg: '#F3F4F6', color: '#4B5563' };

  return (
    <div 
      className="icon-wrapper"
      style={{ 
        backgroundColor: style.bg,
        width: 36,
        height: 36,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon size={size} color={style.color} strokeWidth={1.5} />
    </div>
  );
};
