import type { Meta, StoryObj } from '@storybook/react';
import { OTPInput } from '../components/OTPInput';

const meta: Meta<typeof OTPInput> = {
    title: 'Banking/OTPInput',
    component: OTPInput,
    tags: ['autodocs'],
    argTypes: {
        length: { control: { type: 'number', min: 4, max: 8 } },
        label: { control: 'text' },
        error: { control: 'text' },
        onComplete: { action: 'completed' },
    },
    parameters: {
        docs: {
            description: {
                component: 'Verification code input with auto-advance, paste support, and keyboard navigation.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
    args: { length: 6, label: 'Verification Code', onComplete: (code: string) => console.log(code) },
};

export const FourDigits: Story = {
    args: { length: 4, label: 'SMS Code', onComplete: (code: string) => console.log(code) },
};

export const WithError: Story = {
    args: { length: 6, label: 'Enter Code', error: 'Invalid code. Try again.', onComplete: () => { } },
};