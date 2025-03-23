import {
  HeroSection,
  FeatureSection,
  GetStartedSection,
} from '../components/home';

// Feature data
const features = [
  {
    title: 'Track Your Emissions',
    description:
      'Record daily activities and see their carbon impact in real-time. Our detailed dashboard provides a comprehensive view of your carbon footprint.',
    iconPath:
      'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    title: 'Analyze Patterns',
    description:
      'Visualize your data with interactive charts and graphs. Compare your footprint to global and national averages to contextualize your impact.',
    iconPath:
      'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    title: 'Reduce Your Impact',
    description:
      'Get personalized suggestions based on your activity patterns. Small changes add up to significant reductions in your carbon footprint over time.',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
];

// Get Started data
const getStartedSteps = [
  'Visit your Dashboard to see an overview of your impact',
  'Log your daily activities in the Activity Log',
  'Check Analytics for insights and comparisons',
  'Review personalized tips to reduce your footprint',
];

export default function Home() {
  return (
    <>
      <HeroSection
        title="Welcome to Carbon Tracker"
        description="Monitor, understand, and reduce your environmental impact with our comprehensive carbon footprint tracking tools. Make informed decisions that benefit the planet."
      />

      <FeatureSection features={features} />

      <GetStartedSection
        description="Begin your journey to a more sustainable lifestyle with these simple steps:"
        steps={getStartedSteps}
        buttonText="Go to Dashboard"
        buttonLink="/dashboard"
      />
    </>
  );
}
