import { CountryEmissionsGraph } from '../components/charts';
import {
  PersonalCarbonFootprint,
  EmissionsSources,
} from '../components/activities';

const Analytics = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="mb-6">
        <p className="text-dark2">
          Compare your personal carbon footprint to United States's national
          averages to see how your individual actions contribute to the bigger
          picture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PersonalCarbonFootprint />
        <EmissionsSources />
      </div>

      <CountryEmissionsGraph className="mt-6" />
    </div>
  );
};

export default Analytics;
