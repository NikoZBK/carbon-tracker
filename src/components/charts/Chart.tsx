import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxisProps,
  YAxisProps,
} from 'recharts';

// Define type for series configuration
interface ChartSeries {
  dataKey: string;
  name: string;
  color: string;
  props?: Record<string, unknown>;
}

// Define props interface for the Chart component
interface ChartProps {
  type?: 'line' | 'bar';
  data: Array<Record<string, unknown>>;
  series: ChartSeries[];
  xDataKey: string;
  chartProps?: Record<string, unknown>;
  axisProps?: {
    x?: Partial<XAxisProps>;
    y?: Partial<YAxisProps>;
  };
  tooltipProps?: Record<string, unknown>;
  legendProps?: Record<string, unknown>;
}

/**
 * Reusable chart component that supports different chart types
 */
const Chart: React.FC<ChartProps> = ({
  type = 'line',
  data = [],
  series = [],
  xDataKey,
  chartProps = {},
  axisProps = {},
  tooltipProps = {},
  legendProps = {},
}) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data} {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xDataKey} {...(axisProps.x || {})} />
            <YAxis {...(axisProps.y || {})} />
            <Tooltip {...tooltipProps} />
            <Legend {...legendProps} />
            {series.map((s, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name}
                stroke={s.color}
                activeDot={{ r: 8 }}
                {...(s.props || {})}
              />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data} {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xDataKey} {...(axisProps.x || {})} />
            <YAxis {...(axisProps.y || {})} />
            <Tooltip {...tooltipProps} />
            <Legend {...legendProps} />
            {series.map((s, index) => (
              <Bar
                key={index}
                dataKey={s.dataKey}
                name={s.name}
                fill={s.color}
                {...(s.props || {})}
              />
            ))}
          </BarChart>
        );
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      {renderChart()}
    </ResponsiveContainer>
  );
};

export default Chart;
