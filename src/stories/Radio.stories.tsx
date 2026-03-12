import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../components/Radio';

const currencyOptions = [
    { value: 'mxn', label: 'MXN - Peso Mexicano' },
    { value: 'usd', label: 'USD - US Dollar' },
    { value: 'eur', label: 'EUR - Euro' },
];

const meta: Meta<typeof RadioGroup> = {
    title: 'Atoms/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        direction: { control: 'select', options: ['vertical', 'horizontal'] },
        disabled: { control: 'boolean' },
        error: { control: 'text' },
        onChange: { action: 'changed' },
    },
    parameters: {
        docs: {
            description: {
                component: 'Radio button group with vertical/horizontal layout, keyboard navigation, and error state.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const RadioDemo: React.FC<{ direction?: 'vertical' | 'horizontal'; label?: string; error?: string; disabled?: boolean }> = (props) => {
    const [value, setValue] = useState('mxn');
    return <RadioGroup name="demo" options={currencyOptions} value={value} onChange={setValue} {...props} />;
};

export const Vertical: Story = {
    render: () => <RadioDemo label="Select currency" />,
};

export const Horizontal: Story = {
    render: () => <RadioDemo label="Select currency" direction="horizontal" />,
};

export const Disabled: Story = {
    render: () => <RadioDemo label="Currency (disabled)" disabled />,
};

export const WithError: Story = {
    render: () => {
        const [value, setValue] = useState('');
        return <RadioGroup name="err" options={currencyOptions} value={value} onChange={setValue} label="Currency" error="Please select a currency" />;
    },
};

export const WithDisabledOption: Story = {
    render: () => {
        const [value, setValue] = useState('mxn');
        return (
            <RadioGroup
                name="mixed"
                options={[
                    { value: 'mxn', label: 'MXN - Peso Mexicano' },
                    { value: 'usd', label: 'USD - US Dollar' },
                    { value: 'eur', label: 'EUR - Euro', disabled: true },
                ]}
                value={value}
                onChange={setValue}
                label="Select currency"
            />
        );
    },
};