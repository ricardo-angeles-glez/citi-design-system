import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/Select';

const countryOptions = [
    { value: 'mx', label: 'México' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'br', label: 'Brazil' },
    { value: 'ar', label: 'Argentina' },
];

const meta: Meta<typeof Select> = {
    title: 'Atoms/Select',
    component: Select,
    tags: ['autodocs'],
    argTypes: {
        placeholder: { control: 'text' },
        label: { control: 'text' },
        error: { control: 'text' },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        onChange: { action: 'changed' },
    },
    parameters: {
        docs: {
            description: {
                component: 'Dropdown select with keyboard navigation, disabled options, and error state.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

const SelectDemo: React.FC<{ label?: string; error?: string; disabled?: boolean }> = (props) => {
    const [value, setValue] = useState('');
    return <Select options={countryOptions} value={value} onChange={setValue} placeholder="Select country..." {...props} />;
};

export const Default: Story = {
    render: () => <SelectDemo label="Country" />,
};

export const WithError: Story = {
    render: () => <SelectDemo label="Country" error="This field is required" />,
};

export const Disabled: Story = {
    render: () => <SelectDemo label="Country" disabled />,
};

export const WithDisabledOption: Story = {
    render: () => {
        const [value, setValue] = useState('');
        return (
            <Select
                options={[
                    { value: 'mx', label: 'México' },
                    { value: 'us', label: 'United States' },
                    { value: 'ca', label: 'Canada', disabled: true },
                ]}
                value={value}
                onChange={setValue}
                label="Country"
                placeholder="Select..."
            />
        );
    },
};

export const Preselected: Story = {
    args: {
        options: countryOptions,
        value: 'mx',
        label: 'Country',
    },
};