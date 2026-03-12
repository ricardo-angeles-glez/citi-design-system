import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  type TooltipProps,
} from 'recharts';
import './SpendingChart.css';

/* ── Types ───────────────────────────────── */
export interface ChartDataPoint {
  month: string;
  income: number;
  expense: number;
}

export interface SpendingChartProps {
  data: ChartDataPoint[];
  variant?: 'bar' | 'line' | 'sparkline';
  height?: number;
}

/* ── Helpers ─────────────────────────────── */
const formatCurrency = (value: number): string => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return `$${value}`;
};

const formatCurrencyFull = (value: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/* ── Custom Tooltip ──────────────────────── */
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  const { t } = useTranslation();

  if (!active || !payload || !payload.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      <div className="chart-tooltip__items">
        {payload.map((entry, index) => (
          <div key={index} className="chart-tooltip__item">
            <span
              className="chart-tooltip__dot"
              style={{ background: entry.color }}
            />
            <span className="chart-tooltip__name">
              {entry.dataKey === 'income'
                ? t('chart.income')
                : t('chart.expense')}
            </span>
            <span className="chart-tooltip__value">
              {formatCurrencyFull(entry.value as number)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Custom Legend ────────────────────────── */
const CustomLegend: React.FC<{ payload?: any[] }> = ({ payload }) => {
  const { t } = useTranslation();

  if (!payload) return null;

  return (
    <div className="chart-legend">
      {payload.map((entry, index) => (
        <div key={index} className="chart-legend__item">
          <span
            className="chart-legend__dot"
            style={{ background: entry.color }}
          />
          <span className="chart-legend__label">
            {entry.dataKey === 'income'
              ? t('chart.income')
              : t('chart.expense')}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Chart Variants ──────────────────────── */
const SparklineChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => (
  <div className="chart-sparkline">
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="expense"
          stroke="var(--chart-primary)"
          strokeWidth={2}
          fill="url(#sparkGradient)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const BarVariant: React.FC<{
  data: ChartDataPoint[];
  height: number;
}> = ({ data, height }) => {
  const { t } = useTranslation();

  return (
    <div className="chart-wrapper">
      <div className="chart-wrapper__header">
        <h4 className="chart-wrapper__title">{t('chart.monthlyOverview')}</h4>
        <p className="chart-wrapper__subtitle">{t('chart.last6Months')}</p>
      </div>

      {/* Summary cards */}
      <div className="chart-summary">
        <div className="chart-summary__card chart-summary__card--income">
          <span className="chart-summary__label">{t('chart.totalIncome')}</span>
          <span className="chart-summary__value chart-summary__value--income">
            {formatCurrencyFull(data.reduce((sum, d) => sum + d.income, 0))}
          </span>
        </div>
        <div className="chart-summary__card chart-summary__card--expense">
          <span className="chart-summary__label">
            {t('chart.totalExpense')}
          </span>
          <span className="chart-summary__value chart-summary__value--expense">
            {formatCurrencyFull(data.reduce((sum, d) => sum + d.expense, 0))}
          </span>
        </div>
        <div className="chart-summary__card chart-summary__card--balance">
          <span className="chart-summary__label">{t('chart.balance')}</span>
          <span className="chart-summary__value">
            {formatCurrencyFull(
              data.reduce((sum, d) => sum + d.income - d.expense, 0)
            )}
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
          barCategoryGap="20%"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--chart-grid)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--chart-axis)' }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCurrency}
            tick={{ fontSize: 11, fill: 'var(--chart-axis)' }}
            width={55}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'var(--chart-cursor)', radius: 4 }}
          />
          <Legend content={<CustomLegend />} />
          <Bar
            dataKey="income"
            fill="var(--chart-income)"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="expense"
            fill="var(--chart-expense)"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const LineVariant: React.FC<{
  data: ChartDataPoint[];
  height: number;
}> = ({ data, height }) => {
  const { t } = useTranslation();

  return (
    <div className="chart-wrapper">
      <div className="chart-wrapper__header">
        <h4 className="chart-wrapper__title">{t('chart.trend')}</h4>
        <p className="chart-wrapper__subtitle">{t('chart.incomeVsExpense')}</p>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--chart-income)"
                stopOpacity={0.2}
              />
              <stop
                offset="100%"
                stopColor="var(--chart-income)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--chart-expense)"
                stopOpacity={0.2}
              />
              <stop
                offset="100%"
                stopColor="var(--chart-expense)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--chart-grid)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--chart-axis)' }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCurrency}
            tick={{ fontSize: 11, fill: 'var(--chart-axis)' }}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="var(--chart-income)"
            strokeWidth={2.5}
            fill="url(#incomeGrad)"
            dot={{
              r: 4,
              fill: 'var(--surface-elevated)',
              stroke: 'var(--chart-income)',
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: 'var(--chart-income)',
              stroke: 'var(--surface-elevated)',
              strokeWidth: 2,
            }}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="var(--chart-expense)"
            strokeWidth={2.5}
            fill="url(#expenseGrad)"
            dot={{
              r: 4,
              fill: 'var(--surface-elevated)',
              stroke: 'var(--chart-expense)',
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: 'var(--chart-expense)',
              stroke: 'var(--surface-elevated)',
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ── Main Component ──────────────────────── */
export const SpendingChart: React.FC<SpendingChartProps> = ({
  data,
  variant = 'bar',
  height = 260,
}) => {
  if (variant === 'sparkline') {
    return <SparklineChart data={data} />;
  }

  if (variant === 'line') {
    return <LineVariant data={data} height={height} />;
  }

  return <BarVariant data={data} height={height} />;
};

/* ── Mock Data ───────────────────────────── */
export const mockChartData: ChartDataPoint[] = [
  { month: 'Oct', income: 32000, expense: 18420 },
  { month: 'Nov', income: 32000, expense: 22150 },
  { month: 'Dic', income: 64000, expense: 38900 },
  { month: 'Ene', income: 32000, expense: 15600 },
  { month: 'Feb', income: 32000, expense: 19840 },
  { month: 'Mar', income: 32000, expense: 12340 },
];