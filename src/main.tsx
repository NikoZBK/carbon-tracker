import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/app.css';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext';

// Initialize theme on page load
document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
