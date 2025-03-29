import ToggleButton from './ToggleButton';

interface ToggleOption<T extends string> {
  value: T;
  label: string;
}

interface ToggleButtonGroupProps<T extends string> {
  options: ToggleOption<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  className?: string;
}

/**
 * A group of toggle buttons with consistent styling
 */
export default function ToggleButtonGroup<T extends string>({
  options,
  selectedValue,
  onChange,
  className = '',
}: ToggleButtonGroupProps<T>) {
  return (
    <div
      className={`flex border border-light3 rounded-md overflow-hidden ${className}`}
    >
      {options.map(option => (
        <ToggleButton
          key={option.value}
          value={option.value}
          selectedValue={selectedValue}
          onChange={onChange}
          label={option.label}
        />
      ))}
    </div>
  );
}
