import type { Meta, StoryObj } from '@storybook/react';
import { CardVisual } from '../components/CardVisual';

const meta: Meta<typeof CardVisual> = {
    title: 'Banking/CardVisual',
    component: CardVisual,
    tags: ['autodocs'],
    argTypes: {
        cardNumber: { control: 'text' },
        type: { control: 'select', options: ['credit', 'debit'] },
        size: { control: 'select', options: ['sm', 'md'] },
    },
    parameters: {
        docs: {
            description: {
                component: 'Banking card visual with chip, gradient background, and payment network logo.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof CardVisual>;

export const CreditGold: Story = {
    args: {
        cardName: 'Oro',
        cardNumber: '•••• 4532',
        cardBg: '#B8860B',
        cardAccent: '#FFD700',
        type: 'credit',
        size: 'md',
    },
};

export const CreditDark: Story = {
    args: {
        cardName: 'Descubre',
        cardNumber: '•••• 8901',
        cardBg: '#2C3E50',
        cardAccent: '#E74C3C',
        type: 'credit',
        size: 'md',
    },
};

export const DebitPriority: Story = {
    args: {
        cardName: 'Priority',
        cardNumber: '•••• 9642',
        cardBg: '#1A3A5C',
        cardAccent: '#C0C0C0',
        type: 'debit',
        size: 'md',
    },
};

export const DebitRed: Story = {
    args: {
        cardName: 'MiCuenta',
        cardNumber: '•••• 0001',
        cardBg: '#E3173E',
        cardAccent: '#FF6B8A',
        type: 'debit',
        size: 'md',
    },
};

export const SmallSize: Story = {
    args: {
        cardNumber: '•••• 4532',
        cardBg: '#B8860B',
        cardAccent: '#FFD700',
        type: 'credit',
        size: 'sm',
    },
};

export const AllCards: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 300 }}>
            <CardVisual cardNumber="•••• 4532" cardBg="#B8860B" cardAccent="#FFD700" type="credit" />
            <CardVisual cardNumber="•••• 8901" cardBg="#2C3E50" cardAccent="#E74C3C" type="credit" />
            <CardVisual cardNumber="•••• 9642" cardBg="#1A3A5C" cardAccent="#C0C0C0" type="debit" />
            <CardVisual cardNumber="•••• 0001" cardBg="#E3173E" cardAccent="#FF6B8A" type="debit" />
        </div>
    ),
};