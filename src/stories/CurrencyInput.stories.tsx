import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CurrencyInput } from '../components/CurrencyInput';

const meta: Meta<typeof CurrencyInput> = {
    title: 'Banking/CurrencyInput',
    component: CurrencyInput,
    tags: ['autodocs'],
    argTypes: {
        currency: { control: 'select', options: ['MXN', 'USD'] },
        label: { control: 'text' },
        maxValue: { control: 'number' },
        error: { control: 'text' },
    },
    parameters: {
        docs: {
            description: {
                component: 'Currency input with automatic MXN/USD formatting and integrated numeric keypad.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof CurrencyInput>;

const CurrencyDemo: React.FC<{ currency?: 'MXN' | 'USD'; label?: string; maxValue?: number }> = ({
    currency = 'MXN',
    label = 'Amount',
    maxValue,
}) => {
    const [value, setValue] = useState(0);
    return (
        <div style={{ maxWidth: 360 }}>
            <CurrencyInput value={value} onChange={setValue} currency={currency} label={label} maxValue={maxValue} />
        </div>
    );
};

export const Default: Story = {
    render: () => <CurrencyDemo label="Transfer Amount" />,
};

export const WithMaxValue: Story = {
    render: () => <CurrencyDemo label="Amount to send" maxValue={50000} />,
};

export const USD: Story = {
    render: () => <CurrencyDemo currency="USD" label="USD Amount" />,
};