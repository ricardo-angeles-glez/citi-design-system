import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/Checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Atoms/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        checked: { control: 'boolean' },
        indeterminate: { control: 'boolean' },
        disabled: { control: 'boolean' },
        error: { control: 'text' },
        onChange: { action: 'changed' },
    },
    parameters: {
        docs: {
            description: {
                component: 'Checkbox with checked, indeterminate, disabled, and error states.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: { label: 'Accept terms and conditions' },
};

export const Checked: Story = {
    args: { label: 'Email notifications', checked: true },
};

export const Indeterminate: Story = {
    args: { label: 'Select all', indeterminate: true },
};

export const Disabled: Story = {
    args: { label: 'Cannot modify', disabled: true },
};

export const DisabledChecked: Story = {
    args: { label: 'Already accepted', checked: true, disabled: true },
};

export const WithError: Story = {
    args: { label: 'Accept terms', error: 'You must accept the terms to continue' },
};

export const Interactive: Story = {
    render: () => {
        const [checks, setChecks] = useState({ email: true, sms: false, push: true });
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Checkbox label="Email notifications" checked={checks.email} onChange={(v) => setChecks({ ...checks, email: v })} />
                <Checkbox label="SMS alerts" checked={checks.sms} onChange={(v) => setChecks({ ...checks, sms: v })} />
                <Checkbox label="Push notifications" checked={checks.push} onChange={(v) => setChecks({ ...checks, push: v })} />
            </div>
        );
    },
};