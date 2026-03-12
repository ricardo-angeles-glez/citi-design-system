import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from '../components/ListItem';
import { ShoppingCart, Coffee, ArrowDownLeft, Wifi } from 'lucide-react';

const meta: Meta<typeof ListItem> = {
    title: 'Components/ListItem',
    component: ListItem,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        subtitle: { control: 'text' },
        amount: { control: 'text' },
        amountNegative: { control: 'boolean' },
        badgeText: { control: 'text' },
        showDivider: { control: 'boolean' },
        onClick: { action: 'clicked' },
    },
    parameters: {
        docs: {
            description: {
                component: 'Transaction row with icon, title, subtitle, amount, and optional badge.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
    args: {
        icon: <ShoppingCart size={20} color="#E3173E" />,
        title: 'Amazon México',
        subtitle: 'Compra en línea',
        amount: '-$1,849.00',
        amountNegative: true,
    },
};

export const Deposit: Story = {
    args: {
        icon: <ArrowDownLeft size={20} color="#00823B" />,
        title: 'Nómina Marzo',
        subtitle: 'Transferencia recibida',
        amount: '+$32,000.00',
    },
};

export const WithBadge: Story = {
    args: {
        icon: <Coffee size={20} color="#F5A623" />,
        title: 'Starbucks',
        subtitle: 'Consumo restaurante',
        amount: '-$189.00',
        amountNegative: true,
        badgeText: 'Pendiente',
        badgeVariant: 'warning',
    },
};

export const TransactionList: Story = {
    render: () => (
        <div style={{ maxWidth: 480, border: '1px solid var(--border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
            <ListItem icon={<ArrowDownLeft size={20} color="#00823B" />} title="Nómina Marzo" subtitle="Transferencia recibida" amount="+$32,000.00" />
            <ListItem icon={<ShoppingCart size={20} color="#E3173E" />} title="Amazon México" subtitle="Compra en línea" amount="-$1,849.00" amountNegative />
            <ListItem icon={<Coffee size={20} color="#F5A623" />} title="Starbucks" subtitle="Consumo restaurante" amount="-$189.00" amountNegative badgeText="Pendiente" badgeVariant="warning" />
            <ListItem icon={<Wifi size={20} color="#1565C0" />} title="Telmex" subtitle="Pago de servicios" amount="-$599.00" amountNegative showDivider={false} />
        </div>
    ),
};