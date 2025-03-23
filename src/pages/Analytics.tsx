import { CountryEmissionsGraph } from '../components/charts';
import { PersonalCarbonFootprint } from '../components/activities';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-title pb-3">Analytics</h1>
      <p className="text-body mb-6">
        Detailed analysis of carbon emissions and your environmental footprint.
      </p>

      <PersonalCarbonFootprint className="mb-6" />

      <CountryEmissionsGraph className="mb-6" />
      {/* Global context section  */}
      <div className="global-content m-6">
        <h2 className="text-subtitle mb-4">Global Context</h2>
        <p className="text-body mb-4">
          Understanding historical emissions patterns helps contextualize the
          impact of individual actions. By comparing your carbon footprint to
          national and global averages, you can better appreciate how your
          lifestyle choices affect the environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-caption font-medium mb-2">
              What This Means For You
            </h3>
            <p className="text-small">
              Your personal carbon footprint can be compared against national
              averages to understand your environmental impact in context. The
              typical global average is about 4-5 tons of CO₂ per person
              annually, while sustainable levels are estimated at under 2 tons
              per person.
            </p>
          </div>
          <div>
            <h3 className="text-caption font-medium mb-2">Taking Action</h3>
            <p className="text-small">
              Explore the Activity Log to track your daily emissions and find
              ways to reduce your carbon footprint. Even small changes in
              transportation, diet, and energy use can add up to significant
              reductions over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
