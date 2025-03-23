import { useEffect, useState } from 'react';
import Chart from '../charts/Chart';

// Define series type to match Chart component's expected format
interface ChartSeries {
  dataKey: string;
  name: string;
  color: string;
  props?: Record<string, unknown>;
}

// Define formatted data type
type FormattedDataItem = Record<string, string | number>;

/**
 * Graph component for displaying country emission data
 * @param {Object} props - Component props
 * @param {Array} props.countryData - Emissions data by country
 * @param {string} props.userCountry - User's country for highlighting
 */
const CountryEmissionsGraph = ({
  countryData = [],
  userCountry,
}: {
  countryData?: Array<{
    year: string;
    country: string;
    emissions: number;
    average: number;
  }>;
  userCountry?: string;
}) => {
  const [formattedData, setFormattedData] = useState<FormattedDataItem[]>([]);

  // Process data for the chart
  useEffect(() => {
    if (countryData.length > 0) {
      // Format data for chart display
      // This is a simplified example - adjust according to your actual data structure
      const formattedData = countryData.map(item => ({
        year: item.year,
        [item.country]: item.emissions,
        average: item.average,
      }));

      setFormattedData(formattedData);
    }
  }, [countryData]);

  // Prepare series data for the Chart component
  const getSeries = (): ChartSeries[] => {
    const series: ChartSeries[] = [
      {
        dataKey: 'average',
        name: 'Global Average',
        color: '#8884d8',
        props: { strokeDasharray: '5 5' },
      },
    ];

    // Add user's country data with special styling
    if (userCountry) {
      series.push({
        dataKey: userCountry,
        name: userCountry,
        color: '#82ca9d',
        props: { strokeWidth: 3 },
      });
    }

    return series;
  };

  return (
    <div className="country-emissions-graph">
      <h3>Country Emissions Comparison</h3>
      <Chart
        type="line"
        data={formattedData}
        series={getSeries()}
        xDataKey="year"
        chartProps={{ margin: { top: 10, right: 30, left: 0, bottom: 0 } }}
        axisProps={{
          x: {
            label: { value: 'Year', position: 'insideBottomRight', offset: -5 },
          },
          y: {
            label: {
              value: 'CO2 Emissions (tons)',
              angle: -90,
              position: 'insideLeft',
            },
          },
        }}
        tooltipProps={{
          formatter: (value: number) => [`${value} tons`, 'CO2 Emissions'],
        }}
        legendProps={{ verticalAlign: 'top' }}
      />
    </div>
  );
};

export default CountryEmissionsGraph;
