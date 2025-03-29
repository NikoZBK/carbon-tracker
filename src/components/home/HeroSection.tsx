import React from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-title mb-4">{title}</h1>
      <p className="text-body text-lg max-w-3xl">{description}</p>
    </div>
  );
};

export default HeroSection;
