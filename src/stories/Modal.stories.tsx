import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {
        isOpen: { control: 'boolean' },
        title: { control: 'text' },
        description: { control: 'text' },
        variant: { control: 'select', options: ['default', 'danger', 'success'] },
    },
    parameters: {
        docs: {
            description: {
                component: 'Modal dialog with focus trap, Framer Motion animations, and 3 variants.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTemplate: React.FC<{ variant?: 'default' | 'danger' | 'success'; title: string; description: string }> = ({
    variant = 'default',
    title,
    description,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button variant={variant === 'danger' ? 'danger' : 'primary'} onClick={() => setOpen(true)}>
                Open {variant} modal
            </Button>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title={title}
                description={description}
                variant={variant}
                primaryAction={{ label: 'Confirm', onClick: () => setOpen(false) }}
                secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
            />
        </>
    );
};

export const Default: Story = {
    render: () => (
        <ModalTemplate title="Confirm Transfer" description="Do you want to send $5,000.00 MXN?" />
    ),
};

export const Danger: Story = {
    render: () => (
        <ModalTemplate variant="danger" title="Block Card" description="This will block your card immediately." />
    ),
};

export const Success: Story = {
    render: () => (
        <ModalTemplate variant="success" title="Transfer Successful" description="$5,000.00 MXN sent successfully." />
    ),
};