import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge';
import '../components/Badge/Badge.css';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Badge text label',
    },
    variant: {
      control: 'select',
      options: ['nuevo', 'beneficios', 'promo', 'active', 'warning', 'success', 'error'],
      description: 'The visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The size of the badge',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A badge component for status indicators in the Citibanamex Design System',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Badge label="Nuevo" variant="nuevo" />
      <Badge label="Beneficios" variant="beneficios" />
      <Badge label="Promo" variant="promo" />
      <Badge label="Activa" variant="active" />
      <Badge label="Pendiente" variant="warning" />
      <Badge label="Exitosa" variant="success" />
      <Badge label="Fallida" variant="error" />
    </div>
  ),
  argTypes: {
    variant: { control: false },
    label: { control: false },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Badge label="Small" size="sm" variant="beneficios" />
      <Badge label="Medium" size="md" variant="beneficios" />
    </div>
  ),
  argTypes: {
    size: { control: false },
    label: { control: false },
  },
};

export const Nuevo: Story = {
  args: {
    label: 'Nuevo',
    variant: 'nuevo',
  },
};

export const Beneficios: Story = {
  args: {
    label: 'Beneficios',
    variant: 'beneficios',
  },
};

export const Promo: Story = {
  args: {
    label: 'Promo',
    variant: 'promo',
  },
};

export const Active: Story = {
  args: {
    label: 'Activa',
    variant: 'active',
  },
};

export const Warning: Story = {
  args: {
    label: 'Pendiente',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    label: 'Fallida',
    variant: 'error',
  },
};
