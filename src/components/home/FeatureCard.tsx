import React, { ReactNode } from 'react';
import Card from '../ui/Card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <Card className="flex flex-col items-center text-center p-6">
      {icon}
      <h2 className="text-subtitle mb-4">{title}</h2>
      <p className="text-body">{description}</p>
    </Card>
  );
};

export default FeatureCard;
