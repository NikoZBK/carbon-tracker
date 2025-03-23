import { useActivity } from '../../hooks/useActivity';
import Card from '../ui/Card';

interface CarbonSummaryProps {
  className?: string;
}

export default function CarbonSummary({ className = '' }: CarbonSummaryProps) {
  const { getTotalCarbonFootprint } = useActivity();

  const dailyFootprint = getTotalCarbonFootprint('day');
  const weeklyFootprint = getTotalCarbonFootprint('week');
  const monthlyFootprint = getTotalCarbonFootprint('month');
  const totalFootprint = getTotalCarbonFootprint('all');

  // Average annual carbon footprint per person globally is about 4000kg
  const monthlyAverage = 333; // 4000 / 12 months
  const weeklyAverage = 77; // 4000 / 52 weeks
  const dailyAverage = 11; // 4000 / 365 days

  // Calculate percentage of average
  const dailyPercentage = (dailyFootprint / dailyAverage) * 100;
  const weeklyPercentage = (weeklyFootprint / weeklyAverage) * 100;
  const monthlyPercentage = (monthlyFootprint / monthlyAverage) * 100;

  // Common styles
  const footprintCardStyle = 'bg-light2 p-4 rounded-lg';
  const progressBarStyle = 'mt-2 h-2 bg-light3 rounded-full overflow-hidden';
  const progressFillStyle =
    'h-full rounded-full transition-all duration-300 ease-in-out';

  return (
    <Card className={`card ${className}`}>
      <h2 className="text-subtitle mb-4">Carbon Footprint Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Carbon Footprint */}
        <div className={footprintCardStyle}>
          <h3 className="text-caption uppercase">TOTAL</h3>
          <p className="text-title">{totalFootprint.toFixed(1)} kg</p>
          <div className={progressBarStyle}>
            <div
              className={`${progressFillStyle} bg-primary`}
              style={{
                width: '100%',
              }}
            />
          </div>
          <p className="text-small mt-1">Your lifetime carbon footprint</p>
        </div>

        {/* Daily Carbon Footprint */}
        <div className={footprintCardStyle}>
          <h3 className="text-caption uppercase">TODAY</h3>
          <p className="text-title">{dailyFootprint.toFixed(1)} kg</p>
          <div className={progressBarStyle}>
            <div
              className={progressFillStyle}
              style={{
                width: `${Math.min(dailyPercentage, 100)}%`,
                backgroundColor:
                  dailyPercentage > 100
                    ? 'var(--color-primary)'
                    : 'var(--color-secondary)',
              }}
            />
          </div>
          <p className="text-small mt-1">
            {dailyPercentage > 100
              ? `${dailyPercentage.toFixed(0)}% of daily average`
              : `${(100 - dailyPercentage).toFixed(0)}% below average`}
          </p>
        </div>

        {/* Weekly Carbon Footprint */}
        <div className={footprintCardStyle}>
          <h3 className="text-caption uppercase">THIS WEEK</h3>
          <p className="text-title">{weeklyFootprint.toFixed(1)} kg</p>
          <div className={progressBarStyle}>
            <div
              className={progressFillStyle}
              style={{
                width: `${Math.min(weeklyPercentage, 100)}%`,
                backgroundColor:
                  weeklyPercentage > 100
                    ? 'var(--color-primary)'
                    : 'var(--color-secondary)',
              }}
            />
          </div>
          <p className="text-small mt-1">
            {weeklyPercentage > 100
              ? `${weeklyPercentage.toFixed(0)}% of weekly average`
              : `${(100 - weeklyPercentage).toFixed(0)}% below average`}
          </p>
        </div>

        {/* Monthly Carbon Footprint */}
        <div className={footprintCardStyle}>
          <h3 className="text-caption uppercase">THIS MONTH</h3>
          <p className="text-title">{monthlyFootprint.toFixed(1)} kg</p>
          <div className={progressBarStyle}>
            <div
              className={progressFillStyle}
              style={{
                width: `${Math.min(monthlyPercentage, 100)}%`,
                backgroundColor:
                  monthlyPercentage > 100
                    ? 'var(--color-primary)'
                    : 'var(--color-secondary)',
              }}
            />
          </div>
          <p className="text-small mt-1">
            {monthlyPercentage > 100
              ? `${monthlyPercentage.toFixed(0)}% of monthly average`
              : `${(100 - monthlyPercentage).toFixed(0)}% below average`}
          </p>
        </div>
      </div>
    </Card>
  );
}
