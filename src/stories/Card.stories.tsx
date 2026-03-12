import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import '../components/Card/Card.css';
import '../components/Button/Button.css';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card header title',
    },
    elevation: {
      control: 'select',
      options: ['low', 'medium', 'high'],
      description: 'Shadow elevation level',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined'],
      description: 'Visual style variant',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A card container component for the Citi Design System',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <Card title="Low Elevation" elevation="low">
        <p>This card has a subtle shadow.</p>
      </Card>
      <Card title="Medium Elevation" elevation="medium">
        <p>This card has a medium shadow (default).</p>
      </Card>
      <Card title="High Elevation" elevation="high">
        <p>This card has a prominent shadow.</p>
      </Card>
    </div>
  ),
  argTypes: {
    elevation: { control: false },
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    variant: 'outlined',
    children: <p>This card uses a border instead of shadow.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    elevation: 'medium',
    children: <p>This card includes a footer section with actions.</p>,
    footer: <Button size="sm">Action</Button>,
  },
};

export const LowElevation: Story = {
  args: {
    title: 'Low Elevation',
    elevation: 'low',
    children: <p>Card content goes here.</p>,
  },
};

export const MediumElevation: Story = {
  args: {
    title: 'Medium Elevation',
    elevation: 'medium',
    children: <p>Card content goes here.</p>,
  },
};

export const HighElevation: Story = {
  args: {
    title: 'High Elevation',
    elevation: 'high',
    children: <p>Card content goes here.</p>,
  },
};
