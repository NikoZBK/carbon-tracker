import { useTheme } from '../../hooks/useTheme';

type ColorOption = {
  name: string;
  value: 'blue' | 'green' | 'purple' | 'amber';
  primary: string;
};

const colorOptions: ColorOption[] = [
  {
    name: 'Blue',
    value: 'blue',
    primary: '#3b82f6',
  },
  {
    name: 'Green',
    value: 'green',
    primary: '#10b981',
  },
  {
    name: 'Purple',
    value: 'purple',
    primary: '#8b5cf6',
  },
  {
    name: 'Amber',
    value: 'amber',
    primary: '#f59e0b',
  },
];

export default function ColorPicker() {
  const { colorScheme, setColorScheme } = useTheme();

  return (
    <div className="ml-4 flex gap-1">
      {colorOptions.map(color => (
        <button
          key={color.value}
          className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
            colorScheme === color.value ? 'border-white' : 'border-transparent'
          }`}
          style={{ backgroundColor: color.primary }}
          onClick={() => setColorScheme(color.value)}
          title={color.name}
          aria-label={`Switch to ${color.name} color scheme`}
        />
      ))}
    </div>
  );
}
