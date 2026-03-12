import { 
  LayoutDashboard,
  Palette,
  Type,
  Grid,
  Shapes,
  Zap,
  SlidersHorizontal,
  Square,
  ToggleLeft,
  Tag,
  User,
  CreditCard,
  List,
  Smartphone,
  BarChart2,
  MessageSquare,
  Bell,
  Loader,
  Inbox,
  KeyRound,
  Hash,
  DollarSign,
  Accessibility,
  Moon,
  Globe
} from 'lucide-react';
import type { DashboardSection } from './DashboardApp';
import './Sidebar.css';

interface SidebarProps {
  currentSection: DashboardSection;
  onNavigate: (section: DashboardSection) => void;
}

interface NavItem {
  id: DashboardSection;
  label: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    items: [
      { id: 'overview', label: 'Inicio', icon: <LayoutDashboard size={18} /> },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { id: 'colors', label: 'Colores', icon: <Palette size={18} /> },
      { id: 'typography', label: 'Tipografía', icon: <Type size={18} /> },
      { id: 'spacing', label: 'Espaciado', icon: <Grid size={18} /> },
      { id: 'borders', label: 'Bordes y Radio', icon: <Shapes size={18} /> },
      { id: 'shadows', label: 'Sombras', icon: <Zap size={18} /> },
      { id: 'transitions', label: 'Transiciones', icon: <SlidersHorizontal size={18} /> },
    ],
  },
  {
    title: 'Atoms',
    items: [
      { id: 'buttons', label: 'Botones', icon: <Square size={18} /> },
      { id: 'inputs', label: 'Inputs', icon: <ToggleLeft size={18} /> },
      { id: 'badges', label: 'Badges', icon: <Tag size={18} /> },
      { id: 'avatars', label: 'Avatars', icon: <User size={18} /> },
      { id: 'cards', label: 'Cards', icon: <CreditCard size={18} /> },
    ],
  },
  {
    title: 'Components',
    items: [
      { id: 'listitems', label: 'List Items', icon: <List size={18} /> },
      { id: 'productcards', label: 'Product Cards', icon: <CreditCard size={18} /> },
      { id: 'appheader', label: 'App Header', icon: <Smartphone size={18} /> },
      { id: 'patterns', label: 'Patrones', icon: <BarChart2 size={18} /> },
      { id: 'modal', label: 'Modal / Dialog', icon: <MessageSquare size={18} /> },
      { id: 'toast', label: 'Toast', icon: <Bell size={18} /> },
      { id: 'skeleton', label: 'Skeleton', icon: <Loader size={18} /> },
      { id: 'emptystate', label: 'Empty State', icon: <Inbox size={18} /> },
    ],
  },
  {
    title: 'Banking',
    items: [
      { id: 'otpinput', label: 'OTP Input', icon: <KeyRound size={18} /> },
      { id: 'pinpad', label: 'PIN Pad', icon: <Hash size={18} /> },
      { id: 'currencyinput', label: 'Currency Input', icon: <DollarSign size={18} /> },
      { id: 'chart', label: 'Spending Chart', icon: <BarChart2 size={18} /> },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'accessibility', label: 'Accesibilidad', icon: <Accessibility size={18} /> },
      { id: 'darkmode', label: 'Dark Mode', icon: <Moon size={18} /> },
      { id: 'i18n', label: 'Internacionalización', icon: <Globe size={18} /> },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentSection, onNavigate }) => {
  return (
    <nav className="sidebar">
      {navigation.map((group, groupIndex) => (
        <div key={groupIndex} className="sidebar__group">
          {group.title && (
            <span className="sidebar__title">{group.title}</span>
          )}
          {group.items.map((item) => (
            <button
              key={item.id}
              className={`sidebar__item ${currentSection === item.id ? 'sidebar__item--active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
};
