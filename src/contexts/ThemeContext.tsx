import { createContext, ReactNode, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEvent } from '../hooks/useEvent';
import { APP_EVENTS } from '../constants/events';

// Types for theme settings
type ThemeType = 'system' | 'light' | 'dark';
type ColorScheme = 'blue' | 'green' | 'purple' | 'amber';

// Color values for each scheme
const colorValues = {
  blue: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
  },
  green: {
    primary: '#10b981',
    primaryHover: '#059669',
  },
  purple: {
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
  },
  amber: {
    primary: '#f59e0b',
    primaryHover: '#d97706',
  },
};

interface ThemeContextType {
  theme: ThemeType;
  colorScheme: ColorScheme;
  setTheme: (theme: ThemeType) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  colorScheme: 'blue',
  setTheme: () => {},
  setColorScheme: () => {},
  toggleTheme: () => {},
});

// Export context for the hook file to use
export { ThemeContext };

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useLocalStorage<ThemeType>('theme', 'system');
  const [colorScheme, setColorSchemeState] = useLocalStorage<ColorScheme>(
    'colorScheme',
    'blue'
  );
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const { emit } = useEvent();

  // Set theme and emit event
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    emit(APP_EVENTS.THEME_CHANGED, { theme: newTheme });
  };

  // Set color scheme and emit event
  const setColorScheme = (newColorScheme: ColorScheme) => {
    setColorSchemeState(newColorScheme);
    emit(APP_EVENTS.SETTINGS_UPDATED, {
      key: 'colorScheme',
      value: newColorScheme,
    });
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    let newTheme: ThemeType;
    if (theme === 'light') newTheme = 'dark';
    else if (theme === 'dark') newTheme = 'light';
    else newTheme = systemTheme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
  };

  // Effect to detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Set initial value
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply color scheme
    const colors = colorValues[colorScheme];

    // Add transition effect for smooth color changes
    document.documentElement.style.setProperty(
      '--color-primary-transition',
      'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease'
    );
    document.documentElement.style.setProperty(
      '--color-primary',
      colors.primary
    );
    document.documentElement.style.setProperty(
      '--color-primary-hover',
      colors.primaryHover
    );
    document.documentElement.dataset.colorScheme = colorScheme;
  }, [theme, colorScheme, systemTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        setTheme,
        setColorScheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
