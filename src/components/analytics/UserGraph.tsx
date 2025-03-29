import React from 'react';
import Chart from '../charts/Chart';

interface UserDataItem {
  category: string;
  value: number;
}

interface ComparisonProps {
  userData?: UserDataItem[];
  averageData?: UserDataItem[];
}

/**
 * Graph component for displaying user's personal carbon footprint
 */
const UserGraph: React.FC<ComparisonProps> = ({
  userData = [],
  averageData = [],
}) => {
  // Combine user data and average data for the chart
  const chartData = userData.map((item, index) => ({
    category: item.category,
    userFootprint: item.value,
    averageFootprint: averageData[index]?.value || 0,
  }));

  // Define series for the chart with theme-based color for user footprint
  const series = [
    {
      dataKey: 'userFootprint',
      name: 'Your Footprint',
      color: 'var(--color-primary)', // Using CSS variable instead of hardcoded color
    },
    {
      dataKey: 'averageFootprint',
      name: 'Average Footprint',
      color: '#8884d8',
    },
  ];

  return (
    <div className="personal-carbon-footprint">
      <h3>Your Carbon Footprint</h3>
      <Chart
        type="bar"
        data={chartData}
        series={series}
        xDataKey="category"
        chartProps={{ margin: { top: 10, right: 30, left: 0, bottom: 0 } }}
        axisProps={{
          x: {
            label: {
              value: 'Category',
              position: 'insideBottomRight',
              offset: -5,
            },
          },
          y: {
            label: {
              value: 'CO2 Emissions (kg)',
              angle: -90,
              position: 'insideLeft',
            },
          },
        }}
        tooltipProps={{
          formatter: (value: number) => [`${value} kg`, 'CO2 Emissions'],
        }}
        legendProps={{ verticalAlign: 'top' }}
      />
    </div>
  );
};

export default UserGraph;
