import React, { useMemo } from 'react';
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
  Globe,
  ChevronDown,
  CheckSquare,
  CircleDot,
} from 'lucide-react';
import type { DashboardSection } from './DashboardApp';
import './Sidebar.css';
import { useTranslation } from 'react-i18next';

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

export const Sidebar: React.FC<SidebarProps> = ({ currentSection, onNavigate }) => {
  const { t } = useTranslation();

  const navigation = useMemo<NavGroup[]>(() => [
    {
      items: [
        { id: 'overview', label: t('sidebar.overview'), icon: <LayoutDashboard size={18} /> },
      ],
    },
    {
      title: t('sidebar.foundations'),
      items: [
        { id: 'colors', label: t('sidebar.colors'), icon: <Palette size={18} /> },
        { id: 'typography', label: t('sidebar.typography'), icon: <Type size={18} /> },
        { id: 'spacing', label: t('sidebar.spacing'), icon: <Grid size={18} /> },
        { id: 'borders', label: t('sidebar.borders'), icon: <Shapes size={18} /> },
        { id: 'shadows', label: t('sidebar.shadows'), icon: <Zap size={18} /> },
        { id: 'transitions', label: t('sidebar.transitions'), icon: <SlidersHorizontal size={18} /> },
      ],
    },
    {
      title: t('sidebar.atoms'),
      items: [
        { id: 'buttons', label: t('sidebar.buttons'), icon: <Square size={18} /> },
        { id: 'inputs', label: t('sidebar.inputs'), icon: <ToggleLeft size={18} /> },
        { id: 'select', label: 'Select', icon: <ChevronDown size={18} /> },
        { id: 'checkbox', label: 'Checkbox', icon: <CheckSquare size={18} /> },
        { id: 'radio', label: 'Radio Group', icon: <CircleDot size={18} /> },
        { id: 'badges', label: t('sidebar.badges'), icon: <Tag size={18} /> },
        { id: 'avatars', label: t('sidebar.avatars'), icon: <User size={18} /> },
        { id: 'cards', label: t('sidebar.cards'), icon: <CreditCard size={18} /> },
      ],
    },
    {
      title: t('sidebar.components'),
      items: [
        { id: 'listitems', label: t('sidebar.listitems'), icon: <List size={18} /> },
        { id: 'productcards', label: t('sidebar.productcards'), icon: <CreditCard size={18} /> },
        { id: 'cardvisual', label: 'Card Visual', icon: <CreditCard size={18} /> },
        { id: 'appheader', label: t('sidebar.appheader'), icon: <Smartphone size={18} /> },
        { id: 'patterns', label: t('sidebar.patterns'), icon: <BarChart2 size={18} /> },
        { id: 'modal', label: t('sidebar.modal'), icon: <MessageSquare size={18} /> },
        { id: 'toast', label: t('sidebar.toast'), icon: <Bell size={18} /> },
        { id: 'skeleton', label: t('sidebar.skeleton'), icon: <Loader size={18} /> },
        { id: 'emptystate', label: t('sidebar.emptystate'), icon: <Inbox size={18} /> },
      ],
    },
    {
      title: t('sidebar.banking'),
      items: [
        { id: 'otpinput', label: t('sidebar.otpinput'), icon: <KeyRound size={18} /> },
        { id: 'pinpad', label: t('sidebar.pinpad'), icon: <Hash size={18} /> },
        { id: 'currencyinput', label: t('sidebar.currencyinput'), icon: <DollarSign size={18} /> },
        { id: 'chart', label: t('sidebar.chart'), icon: <BarChart2 size={18} /> },
      ],
    },
    {
      title: t('sidebar.system'),
      items: [
        { id: 'accessibility', label: t('sidebar.accessibility'), icon: <Accessibility size={18} /> },
        { id: 'darkmode', label: t('sidebar.darkmode'), icon: <Moon size={18} /> },
        { id: 'i18n', label: t('sidebar.i18n'), icon: <Globe size={18} /> },
      ],
    },
  ], [t]);

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