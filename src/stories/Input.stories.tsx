import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input';
import '../components/Input/Input.css';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'An input component for the Citi Design System',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text here',
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    placeholder: 'Enter text here',
    value: 'Invalid value',
    error: 'This field is required and cannot be empty',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'Disabled value',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
  },
};
