interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
  className?: string;
}

export default function ProgressBar({
  label,
  percentage,
  color = 'bg-primary',
  className = '',
}: ProgressBarProps) {
  return (
    <div className={className}>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="bg-light3 rounded-full h-2 overflow-hidden">
        <div
          className={`${color} h-full rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
