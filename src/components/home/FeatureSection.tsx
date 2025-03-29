import React from 'react';
import FeatureCard from './FeatureCard';

interface Feature {
  title: string;
  description: string;
  iconPath: string;
}

interface FeatureSectionProps {
  features: Feature[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ features }) => {
  const featureIconClasses = 'w-16 h-16 text-primary mb-4';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={
            <svg
              className={featureIconClasses}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={feature.iconPath}
              ></path>
            </svg>
          }
        />
      ))}
    </div>
  );
};

export default FeatureSection;
