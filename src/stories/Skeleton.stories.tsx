import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonListItem } from '../components/Skeleton';

const meta: Meta<typeof Skeleton> = {
    title: 'Components/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['text', 'circle', 'rect', 'card'] },
        width: { control: 'text' },
        height: { control: 'text' },
        lines: { control: 'number' },
    },
    parameters: {
        docs: {
            description: {
                component: 'Loading state indicators with shimmer effect. Variants: text, circle, rect, card.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = { args: { variant: 'text', width: '80%' } };
export const TextLines: Story = { args: { variant: 'text', lines: 3 } };
export const Circle: Story = { args: { variant: 'circle', width: 48 } };
export const Rect: Story = { args: { variant: 'rect', width: '100%', height: 80 } };
export const CardSkeleton: Story = { args: { variant: 'card' } };

export const ListItemSkeleton: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
            <SkeletonListItem />
            <SkeletonListItem />
            <SkeletonListItem />
        </div>
    ),
};

export const FullPage: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 600 }}>
            <div>
                <Skeleton variant="text" lines={3} />
                <div style={{ height: 16 }} />
                <Skeleton variant="rect" width="100%" height="120px" />
            </div>
            <div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                    <Skeleton variant="circle" width={48} />
                    <div style={{ flex: 1 }}>
                        <Skeleton variant="text" width="60%" />
                        <div style={{ height: 8 }} />
                        <Skeleton variant="text" width="40%" />
                    </div>
                </div>
                <Skeleton variant="card" />
            </div>
        </div>
    ),
};