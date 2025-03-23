interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * A reusable toggle button group component
 */
export default function ToggleGroup({
  options,
  value,
  onChange,
  className = '',
}: ToggleGroupProps) {
  return (
    <div className={`flex justify-center mb-4 ${className}`}>
      <div className="bg-light2 p-1 rounded-lg">
        {options.map(option => (
          <button
            key={option.value}
            type="button"
            className={`px-4 py-2 rounded-md transition-colors ${
              value === option.value
                ? 'bg-primary text-inverse'
                : 'hover:bg-light3'
            }`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
