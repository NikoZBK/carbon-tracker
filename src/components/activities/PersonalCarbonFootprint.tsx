import { useState } from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Chart from '../charts/Chart';
import ToggleButtonGroup from '../ui/ToggleButtonGroup';

// Define type for time period IDs
type TimePeriodId = 'today' | 'week' | 'month' | 'year' | 'all';
type ViewType = 'breakdown' | 'comparison';

// Time period options for filtering
const timePeriods = [
  { value: 'today' as TimePeriodId, label: 'Today' },
  { value: 'week' as TimePeriodId, label: 'This Week' },
  { value: 'month' as TimePeriodId, label: 'This Month' },
  { value: 'year' as TimePeriodId, label: 'This Year' },
  { value: 'all' as TimePeriodId, label: 'All Time' },
];

// View options
const viewOptions = [
  { value: 'breakdown' as ViewType, label: 'Breakdown' },
  { value: 'comparison' as ViewType, label: 'US Comparison' },
];

// Define type for footprint data structure
type FootprintData = {
  [key in TimePeriodId]: {
    value: string;
    unit: string;
    change: string;
    activities: number;
  };
};

// Category emission data
const categoryData = [
  { name: 'Transportation', percentage: 42 },
  { name: 'Energy', percentage: 28 },
  { name: 'Food', percentage: 18 },
  { name: 'Waste', percentage: 7 },
  { name: 'Home', percentage: 5 },
];

// Comparison data for US average vs user
const comparisonData = [
  { month: 'Jan', user: 78, average: 95 },
  { month: 'Feb', user: 82, average: 94 },
  { month: 'Mar', user: 76, average: 93 },
  { month: 'Apr', user: 85, average: 97 },
  { month: 'May', user: 90, average: 96 },
  { month: 'Jun', user: 79, average: 92 },
  { month: 'Jul', user: 83, average: 90 },
  { month: 'Aug', user: 75, average: 94 },
  { month: 'Sep', user: 80, average: 93 },
  { month: 'Oct', user: 72, average: 91 },
  { month: 'Nov', user: 68, average: 90 },
  { month: 'Dec', user: 70, average: 92 },
];

// Chart series config
const chartSeries = [
  {
    dataKey: 'user',
    name: 'Your Footprint',
    color: 'var(--color-primary)',
  },
  {
    dataKey: 'average',
    name: 'US Average',
    color: '#2196f3',
  },
];

interface PersonalCarbonFootprintProps {
  className?: string;
}

export default function PersonalCarbonFootprint({
  className = '',
}: PersonalCarbonFootprintProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriodId>('month');
  const [view, setView] = useState<ViewType>('breakdown');

  // Mock data for the carbon footprint
  const footprintData: FootprintData = {
    today: { value: '3.2', unit: 'kg', change: '+5%', activities: 4 },
    week: { value: '18.7', unit: 'kg', change: '-12%', activities: 15 },
    month: { value: '82.5', unit: 'kg', change: '-8%', activities: 37 },
    year: { value: '986.3', unit: 'kg', change: '-15%', activities: 248 },
    all: { value: '2.4', unit: 'tons', change: '-22%', activities: 573 },
  };

  const currentData = footprintData[selectedPeriod];

  // Calculate average reduction
  const averageReduction =
    comparisonData.reduce((sum, item) => sum + (item.average - item.user), 0) /
    comparisonData.length;

  return (
    <Card className={`${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-subtitle">Your Carbon Footprint</h2>

        <div className="flex">
          {/* View toggle */}
          <ToggleButtonGroup
            options={viewOptions}
            selectedValue={view}
            onChange={setView}
            className="mr-4"
          />

          {/* Time period selector */}
          <ToggleButtonGroup
            options={timePeriods}
            selectedValue={selectedPeriod}
            onChange={setSelectedPeriod}
          />
        </div>
      </div>

      {view === 'breakdown' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main metric */}
          <div className="md:col-span-1 bg-light1 rounded-lg p-6 text-center flex flex-col items-center justify-center">
            {/* Goal circle (outer) */}
            <div className="border-4 border-light2 rounded-full w-80 h-80 flex items-center justify-center relative">
              {/* Current footprint circle (inner) */}
              <div className="border-4 border-primary border-opacity-40 rounded-full w-64 h-64 flex flex-col items-center justify-center p-4 bg-light1">
                <span className="text-caption mb-3">Total CO₂ Equivalent</span>
                <div className="text-title mb-1">{currentData.value}</div>
                <div className="text-subtitle mb-3">{currentData.unit}</div>
                <div
                  className={`text-caption ${
                    currentData.change.startsWith('+')
                      ? 'text-error'
                      : 'text-success'
                  }`}
                >
                  {currentData.change} vs previous period
                </div>
              </div>
              {/* Goal label - positioned at the top of the outer circle */}
              <div className="absolute -top-2 bg-light1 px-2 text-caption font-medium text-primary-hover">
                Goal: 100 kg
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="md:col-span-2 bg-light1 rounded-lg p-6">
            <h3 className="text-subtitle mb-4">Emissions by Category</h3>

            {/* Using the reusable ProgressBar component */}
            <div className="space-y-4">
              {categoryData.map(category => (
                <ProgressBar
                  key={category.name}
                  label={category.name}
                  percentage={category.percentage}
                />
              ))}
            </div>

            <div className="mt-4 text-caption">
              Based on {currentData.activities} logged activities
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <Chart
              type="line"
              data={comparisonData}
              series={chartSeries}
              xDataKey="month"
              chartProps={{
                margin: { top: 20, right: 30, left: 20, bottom: 5 },
              }}
              axisProps={{
                x: {
                  label: {
                    value: 'Month',
                    position: 'insideBottom',
                    offset: -5,
                  },
                },
                y: {
                  label: {
                    value: 'CO₂ (kg)',
                    angle: -90,
                    position: 'insideLeft',
                  },
                },
              }}
              tooltipProps={{
                formatter: (value: number) => [`${value} kg`, 'CO₂ Emissions'],
              }}
              legendProps={{
                verticalAlign: 'top',
                align: 'right',
              }}
            />
          </div>

          <div className="p-4 bg-light1 rounded-lg">
            <h3 className="text-caption font-medium mb-2">Your Impact</h3>
            <p className="text-small">
              On average, your carbon footprint is{' '}
              <strong>{Math.round(averageReduction)} kg</strong> lower than the
              US national average each month. This adds up to approximately
              <strong> {Math.round(averageReduction * 12)} kg</strong> of CO₂
              less per year.
            </p>
            <p className="text-small mt-2">
              This is equivalent to planting approximately{' '}
              {Math.round((averageReduction * 12) / 20)} trees or taking a small
              car off the road for {Math.round((averageReduction * 12) / 1000)}{' '}
              {(averageReduction * 12) / 1000 < 1.5 ? 'month' : 'months'}.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
