import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../components/Avatar';

const meta: Meta<typeof Avatar> = {
    title: 'Atoms/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {
        initials: { control: 'text', description: 'Two-letter initials' },
        variant: {
            control: 'select',
            options: ['teal', 'red', 'gray'],
            description: 'Color variant',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Avatar size',
        },
    },
    parameters: {
        docs: {
            description: {
                component: 'Visual user representation with initials, 3 colors, and 3 sizes.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Teal: Story = { args: { initials: 'JA', variant: 'teal' } };
export const Red: Story = { args: { initials: 'MR', variant: 'red' } };
export const Gray: Story = { args: { initials: 'PL', variant: 'gray' } };

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar initials="JA" variant="teal" size="sm" />
            <Avatar initials="JA" variant="teal" size="md" />
            <Avatar initials="JA" variant="teal" size="lg" />
        </div>
    ),
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12 }}>
            <Avatar initials="JA" variant="teal" />
            <Avatar initials="MR" variant="red" />
            <Avatar initials="PL" variant="gray" />
        </div>
    ),
};