import React from 'react';
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
  CartesianGrid,
  Legend
} from 'recharts';
import './SpendingChart.css';

export interface SpendingChartProps {
  data: { month: string; income: number; expense: number }[];
  variant?: 'bar' | 'line' | 'sparkline';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const SpendingChart: React.FC<SpendingChartProps> = ({
  data,
  variant = 'bar'
}) => {
  if (variant === 'sparkline') {
    return (
      <div className="sparkline-container">
        <ResponsiveContainer width="100%" height={32}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#003B5C" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#003B5C" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="expense" 
              stroke="#003B5C" 
              strokeWidth={2}
              fill="url(#sparkGradient)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (variant === 'line') {
    return (
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#00823B" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" stroke="#E3173E" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Default Bar Chart
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="income" fill="#00823B" name="Ingresos" />
          <Bar dataKey="expense" fill="#E3173E" name="Egresos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Mock data for demo
export const mockChartData = [
  { month: 'Oct', income: 32000, expense: 18420 },
  { month: 'Nov', income: 32000, expense: 22150 },
  { month: 'Dic', income: 64000, expense: 38900 },
  { month: 'Ene', income: 32000, expense: 15600 },
  { month: 'Feb', income: 32000, expense: 19840 },
  { month: 'Mar', income: 32000, expense: 12340 },
];
