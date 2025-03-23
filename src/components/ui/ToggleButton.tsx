interface ToggleButtonProps<T extends string> {
  value: T;
  selectedValue: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * Reusable toggle button component with consistent styling and accessibility
 */
export default function ToggleButton<T extends string>({
  value,
  selectedValue,
  onChange,
  label,
  className = '',
  disabled = false,
  ariaLabel,
}: ToggleButtonProps<T>) {
  const isSelected = value === selectedValue;

  return (
    <button
      type="button"
      className={`touch-target px-3 py-1.5 text-caption font-medium transition-colors ${
        isSelected ? 'bg-primary text-white' : 'bg-light1 hover:bg-light2'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={() => !disabled && onChange(value)}
      disabled={disabled}
      aria-pressed={isSelected}
      aria-label={ariaLabel || label}
      role="switch"
    >
      {label}
    </button>
  );
}
