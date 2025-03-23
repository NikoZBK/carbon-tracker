import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { EmissionsData } from '../../contexts/EmissionsContext';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EmissionsChartProps {
  data: EmissionsData[];
  countryName: string;
  loading: boolean;
}

const EmissionsChart: React.FC<EmissionsChartProps> = ({
  data,
  countryName,
  loading,
}) => {
  if (loading) {
    return <p className="text-center py-8">Loading data...</p>;
  }

  if (data.length === 0) {
    return (
      <p className="text-center py-8">
        No data available for the selected time period.
      </p>
    );
  }

  // Chart data configuration
  const chartData = {
    labels: data.map(d => d.year),
    datasets: [
      {
        label: 'Total CO₂ Emissions (billion tons)',
        data: data.map(d => d.totalEmissions),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Per Capita Emissions (tons)',
        data: data.map(d => d.perCapitaEmissions),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Total Emissions (billion tons)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Per Capita (tons)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <>
      <h3 className="text-lg font-medium mb-4">
        {countryName} Emissions Trends
      </h3>
      <div className="h-96 bg-light1 rounded-lg border border-light3 p-4">
        <Line
          options={{
            ...chartOptions,
            responsive: true,
            maintainAspectRatio: false,
          }}
          data={chartData}
        />
      </div>
    </>
  );
};

export default EmissionsChart;
