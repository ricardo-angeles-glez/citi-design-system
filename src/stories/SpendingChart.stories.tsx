import type { Meta, StoryObj } from '@storybook/react';
import { SpendingChart, mockChartData } from '../components/Chart';

const meta: Meta<typeof SpendingChart> = {
    title: 'Banking/SpendingChart',
    component: SpendingChart,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['bar', 'line', 'sparkline'] },
        height: { control: 'number' },
    },
    parameters: {
        docs: {
            description: {
                component: 'Spending and income charts with bar, line, and sparkline variants using Recharts.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof SpendingChart>;

export const BarChart: Story = {
    args: { data: mockChartData, variant: 'bar', height: 280 },
};

export const LineChart: Story = {
    args: { data: mockChartData, variant: 'line', height: 280 },
};

export const Sparkline: Story = {
    args: { data: mockChartData, variant: 'sparkline' },
    decorators: [(Story) => <div style={{ maxWidth: 200 }}><Story /></div>],
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: 12 }}>Bar Chart</h3>
                <SpendingChart data={mockChartData} variant="bar" />
            </div>
            <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: 12 }}>Line Chart</h3>
                <SpendingChart data={mockChartData} variant="line" />
            </div>
            <div style={{ maxWidth: 200 }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: 12 }}>Sparkline</h3>
                <SpendingChart data={mockChartData} variant="sparkline" />
            </div>
        </div>
    ),
};