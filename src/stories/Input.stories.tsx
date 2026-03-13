import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text above the input' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    error: { control: 'text', description: 'Error message' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: 'Input type',
    },
    onChange: { action: 'changed' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Text input with label, error state, and validation support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: 'Enter text...' },
};

export const WithLabel: Story = {
  args: { label: 'Email', placeholder: 'user@citi.com' },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    error: 'Password must be at least 8 characters',
    type: 'password',
  },
};

export const Disabled: Story = {
  args: { label: 'Account', placeholder: 'Disabled input', disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Input placeholder="Default" />
      <Input label="With Label" placeholder="Labeled input" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="With error" error="This field is required" />
      <Input placeholder="Password" type="password" />
    </div>
  ),
};