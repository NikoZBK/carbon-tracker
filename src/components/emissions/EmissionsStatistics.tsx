import React from 'react';
import Card from '../ui/Card';

interface EmissionsStatisticsProps {
  countryName: string;
  startYear: number;
  endYear: number;
  averageTotalEmissions: number;
  averagePerCapita: number;
}

const EmissionsStatistics: React.FC<EmissionsStatisticsProps> = ({
  countryName,
  startYear,
  endYear,
  averageTotalEmissions,
  averagePerCapita,
}) => {
  return (
    <Card className="mt-6 p-4 bg-light2 rounded-lg">
      <h4 className="font-medium mb-2">
        {countryName} ({startYear}-{endYear})
      </h4>
      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Average Emissions:</span>{' '}
          <span className="text-primary font-bold">
            {averageTotalEmissions.toLocaleString()}
          </span>{' '}
          billion tons/year
        </p>
        <p className="text-sm">
          <span className="font-medium">Average Per Capita:</span>{' '}
          <span className="text-primary font-bold">
            {averagePerCapita.toLocaleString()}
          </span>{' '}
          tons/person
        </p>
      </div>
    </Card>
  );
};

export default EmissionsStatistics;
