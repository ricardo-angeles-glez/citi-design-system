import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from '../components/ProductCard';

const meta: Meta<typeof ProductCard> = {
    title: 'Components/ProductCard',
    component: ProductCard,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Banking product card with expandable sub-accounts and CardVisual.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Savings: Story = {
    args: {
        product: {
            id: 'savings',
            category: 'Bolsas de ahorro',
            balance: 110000,
            count: null,
            expandable: false,
            bgColor: '#FFF3EC',
            textColor: '#CC5500',
        } as any,
    },
};

export const CreditExpandable: Story = {
    args: {
        product: {
            id: 'credit',
            category: 'Tarjetas de crédito',
            balance: -73161.38,
            count: 2,
            expandable: true,
            accounts: [
                {
                    id: 'credit-1',
                    name: 'Oro',
                    number: '**394',
                    balanceMXN: -32796.14,
                    balanceUSD: null,
                    creditAvailable: 72196.24,
                    cardBg: '#B8860B',
                    cardAccent: '#FFD700',
                    type: 'credit',
                    canBlock: true,
                    cardImage: 'oro',
                },
                {
                    id: 'credit-2',
                    name: 'Descubre',
                    number: '**789',
                    balanceMXN: -40365.24,
                    balanceUSD: null,
                    creditAvailable: 120741.18,
                    cardBg: '#2C3E50',
                    cardAccent: '#E74C3C',
                    type: 'credit',
                    canBlock: true,
                    cardImage: 'descubre',
                },
            ],
        } as any,
    },
};

export const DebitExpandable: Story = {
    args: {
        product: {
            id: 'debit',
            category: 'Cuentas de débito',
            balance: 363511.40,
            count: 2,
            expandable: true,
            accounts: [
                {
                    id: 'debit-1',
                    name: 'Cuenta Priority',
                    number: '**964',
                    balanceMXN: 314814.28,
                    balanceUSD: null,
                    creditAvailable: null,
                    cardBg: '#1A3A5C',
                    cardAccent: '#C0C0C0',
                    type: 'debit',
                    canBlock: false,
                    cardImage: 'priority',
                },
            ],
        } as any,
    },
};