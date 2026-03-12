import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Badge text' },
    variant: {
      control: 'select',
      options: ['nuevo', 'beneficios', 'promo', 'active', 'warning', 'error'],
      description: 'Semantic variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Badge size',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Semantic status indicators and labels with 6 variants.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Nuevo: Story = { args: { label: 'Nuevo', variant: 'nuevo' } };
export const Beneficios: Story = { args: { label: 'Beneficios', variant: 'beneficios' } };
export const Promo: Story = { args: { label: 'Promo', variant: 'promo' } };
export const Active: Story = { args: { label: 'Activa', variant: 'active' } };
export const Warning: Story = { args: { label: 'Pendiente', variant: 'warning' } };
export const Error: Story = { args: { label: 'Error', variant: 'error' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge label="Nuevo" variant="nuevo" />
      <Badge label="Beneficios" variant="beneficios" />
      <Badge label="Promo" variant="promo" />
      <Badge label="Activa" variant="active" />
      <Badge label="Pendiente" variant="warning" />
      <Badge label="Error" variant="error" />
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge label="Small" variant="active" size="sm" />
      <Badge label="Default" variant="active" />
    </div>
  ),
};