import type { Meta, StoryObj } from '@storybook/react';
import { PINPad } from '../components/PINPad';

const meta: Meta<typeof PINPad> = {
    title: 'Banking/PINPad',
    component: PINPad,
    tags: ['autodocs'],
    argTypes: {
        length: { control: { type: 'number', min: 4, max: 6 } },
        label: { control: 'text' },
        error: { control: 'text' },
        onComplete: { action: 'completed' },
    },
    parameters: {
        docs: {
            description: {
                component: 'Numeric keypad for banking PIN entry with progress indicator and spring animation.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof PINPad>;

export const Default: Story = {
    args: { length: 4, label: 'Enter your PIN', onComplete: (pin: string) => console.log(pin) },
};

export const SixDigits: Story = {
    args: { length: 6, label: 'Security PIN', onComplete: (pin: string) => console.log(pin) },
};

export const WithError: Story = {
    args: { length: 4, label: 'Enter PIN', error: 'Incorrect PIN. 2 attempts remaining.', onComplete: () => { } },
};