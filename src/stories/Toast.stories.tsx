import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '../components/Toast';
import { Button } from '../components/Button';
import { AnimatePresence } from 'framer-motion';

const meta: Meta<typeof Toast> = {
    title: 'Components/Toast',
    component: Toast,
    tags: ['autodocs'],
    argTypes: {
        message: { control: 'text' },
        variant: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
        duration: { control: 'number' },
    },
    parameters: {
        docs: {
            description: {
                component: 'Auto-dismiss notifications with 4 semantic variants and pause-on-hover.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
    args: { id: '1', message: 'Transfer completed successfully', variant: 'success', onClose: () => { } },
};

export const Error: Story = {
    args: { id: '2', message: 'Error processing payment', variant: 'error', onClose: () => { } },
};

export const Warning: Story = {
    args: { id: '3', message: 'Session expires in 2 minutes', variant: 'warning', onClose: () => { } },
};

export const Info: Story = {
    args: { id: '4', message: '3 pending scheduled payments', variant: 'info', onClose: () => { } },
};

const ToastDemo: React.FC = () => {
    const [toasts, setToasts] = useState<{ id: string; message: string; variant: 'success' | 'error' | 'warning' | 'info' }[]>([]);

    const add = (variant: 'success' | 'error' | 'warning' | 'info', message: string) => {
        setToasts((prev) => [...prev, { id: Date.now().toString(), message, variant }]);
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="primary" size="sm" onClick={() => add('success', 'Transfer completed')}>Success</Button>
                <Button variant="danger" size="sm" onClick={() => add('error', 'Payment failed')}>Error</Button>
                <Button variant="secondary" size="sm" onClick={() => add('warning', 'Session expiring')}>Warning</Button>
                <Button variant="ghost" size="sm" onClick={() => add('info', '3 pending payments')}>Info</Button>
            </div>
            <div style={{ position: 'fixed', top: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 9999 }}>
                <AnimatePresence>
                    {toasts.map((t) => (
                        <Toast key={t.id} {...t} onClose={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export const Interactive: Story = {
    render: () => <ToastDemo />,
};