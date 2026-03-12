import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Card title' },
    elevation: {
      control: 'select',
      options: ['low', 'medium', 'high'],
      description: 'Shadow elevation level',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined'],
      description: 'Card style variant',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Content container with title, elevation levels, and outlined variant.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    children: 'Card content goes here.',
  },
};

export const LowElevation: Story = {
  args: { title: 'Low', elevation: 'low', children: 'Low elevation card.' },
};

export const MediumElevation: Story = {
  args: { title: 'Medium', elevation: 'medium', children: 'Medium elevation card.' },
};

export const HighElevation: Story = {
  args: { title: 'High', elevation: 'high', children: 'High elevation card.' },
};

export const Outlined: Story = {
  args: { title: 'Outlined', variant: 'outlined', children: 'Outlined card.' },
};

export const WithFooter: Story = {
  args: {
    title: 'With Footer',
    children: 'Card with action buttons in footer.',
    footer: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="primary" size="sm">Confirm</Button>
        <Button variant="ghost" size="sm">Cancel</Button>
      </div>
    ),
  },
};

export const AllElevations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Card title="Low" elevation="low"><p>Low shadow</p></Card>
      <Card title="Medium" elevation="medium"><p>Medium shadow</p></Card>
      <Card title="High" elevation="high"><p>High shadow</p></Card>
      <Card title="Outlined" variant="outlined"><p>No shadow</p></Card>
    </div>
  ),
};