import Card from '../ui/Card';
import Chart from '../charts/Chart';

// Define props type for EmissionsSources
interface EmissionsSourcesProps {
  className?: string;
}

// Mock data for emissions sources
const emissionsData = [
  { category: 'Transportation', userValue: 42, nationalAvg: 29 },
  { category: 'Energy', userValue: 28, nationalAvg: 31 },
  { category: 'Food', userValue: 18, nationalAvg: 13 },
  { category: 'Consumption', userValue: 7, nationalAvg: 16 },
  { category: 'Waste', userValue: 5, nationalAvg: 11 },
];

// Series configuration for the chart
const chartSeries = [
  {
    dataKey: 'userValue',
    name: 'Your Footprint',
    color: '#4caf50',
  },
  {
    dataKey: 'nationalAvg',
    name: 'US Average',
    color: '#2196f3',
  },
];

export default function EmissionsSources({
  className = '',
}: EmissionsSourcesProps) {
  return (
    <Card className={`${className}`}>
      <h2 className="text-subtitle mb-4">Emissions Sources</h2>
      <p className="text-body mb-6">
        Compare your carbon footprint distribution to the US national average
        across different categories.
      </p>

      <div className="mb-6">
        <Chart
          type="bar"
          data={emissionsData}
          series={chartSeries}
          xDataKey="category"
          chartProps={{
            margin: { top: 20, right: 30, left: 20, bottom: 5 },
            barGap: 8,
            barCategoryGap: 16,
          }}
          axisProps={{
            x: {
              label: {
                value: 'Category',
                position: 'insideBottom',
                offset: -5,
              },
            },
            y: {
              label: {
                value: 'Percentage (%)',
                angle: -90,
                position: 'insideLeft',
              },
            },
          }}
          tooltipProps={{
            formatter: (value: number) => [`${value}%`, ''],
          }}
          legendProps={{
            verticalAlign: 'top',
            align: 'right',
          }}
        />
      </div>

      <div className="p-4 bg-light1 rounded-lg">
        <h3 className="text-caption font-medium mb-2">Analysis</h3>
        <p className="text-small">
          Your carbon footprint is{' '}
          <strong>
            {emissionsData.reduce(
              (sum, item) => sum + (item.userValue > item.nationalAvg ? 1 : 0),
              0
            )}
          </strong>{' '}
          categories above the US national average. Transportation makes up the
          largest portion of your emissions at {emissionsData[0].userValue}%,
          which is {emissionsData[0].userValue - emissionsData[0].nationalAvg}%
          higher than the US average.
        </p>
        <p className="text-small mt-2">
          Consider alternative transportation methods or reducing travel to
          lower your carbon footprint.
        </p>
      </div>
    </Card>
  );
}
