import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '../components/EmptyState';
import { FileX } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
    title: 'Components/EmptyState',
    component: EmptyState,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        variant: { control: 'select', options: ['default', 'search', 'error', 'offline'] },
    },
    parameters: {
        docs: {
            description: {
                component: 'Empty states with contextual icon, title, description, and optional action.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
    args: { title: 'No transactions', description: 'No transactions recorded in this period.' },
};

export const Search: Story = {
    args: { title: 'No results', description: 'Try different filters.', variant: 'search' },
};

export const Error: Story = {
    args: { title: 'Connection error', description: 'Please check your connection.', variant: 'error' },
};

export const Offline: Story = {
    args: { title: 'You are offline', description: 'Check your internet connection.', variant: 'offline' },
};

export const WithAction: Story = {
    args: {
        title: 'No results',
        description: 'No matching results found.',
        variant: 'search',
        action: { label: 'Clear filters', onClick: () => alert('Filters cleared') },
    },
};

export const CustomIcon: Story = {
    args: {
        icon: FileX,
        title: 'No documents',
        description: 'Upload your first document to get started.',
    },
};