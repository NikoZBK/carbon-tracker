interface CarbonFootprintDisplayProps {
  value: string;
  className?: string;
}

/**
 * Displays a carbon footprint value with consistent styling
 */
export default function CarbonFootprintDisplay({
  value,
  className = '',
}: CarbonFootprintDisplayProps) {
  return (
    <div className={`mb-4 p-3 bg-light2 rounded-md ${className}`}>
      <p className="font-medium">Carbon Footprint:</p>
      <p className="text-accent text-xl font-bold">{value} kg CO₂</p>
    </div>
  );
}
