import './css/app.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Menu, Header, Footer } from './components/layout';
import { useMenu } from './hooks/useMenu';
import { ActivityProvider } from './contexts/ActivityContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { MenuProvider } from './contexts/MenuContext';
import { EmissionsProvider } from './contexts/EmissionsContext';
import { useState, useEffect } from 'react';

// Import page components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import About from './pages/About';
import ActivityLog from './pages/ActivityLog';

function AppContent() {
  const { isCollapsed } = useMenu();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  // Handle resize events to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
      // Close mobile menu when switching to desktop
      if (window.innerWidth > 767) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`app-grid ${isCollapsed ? 'menu-collapsed' : ''}`}>
      <Header className="app-header">
        <div className="flex justify-items-normal items-center p-4">
          {isMobile && (
            <button
              className="touch-target mr-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}

          <svg
            className="w-8 h-8 mr-3 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-4xl" role="heading" aria-level={1}>
            Carbon Tracker
          </div>
        </div>
      </Header>

      {/* Regular sidebar menu (desktop) */}
      <Menu
        className={`app-menu hide-on-mobile ${isCollapsed ? 'collapsed' : ''}`}
      />

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-hidden="true"
      ></div>

      {/* Mobile menu panel */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="p-4">
          <button
            className="touch-target flex justify-end w-full mb-4"
            onClick={toggleMobileMenu}
            aria-label="Close mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Menu className="border-none bg-transparent p-0" />
        </div>
      </div>

      {/* Main content */}
      <main id="main-content" className="app-main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activities" element={<ActivityLog />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer className="app-footer">
        <div className="text-small p-4 text-center">
          &copy; {new Date().getFullYear()} Carbon Tracker. All rights reserved.
        </div>
      </Footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <SettingsProvider>
          <MenuProvider>
            <ActivityProvider>
              <EmissionsProvider>
                <AppContent />
              </EmissionsProvider>
            </ActivityProvider>
          </MenuProvider>
        </SettingsProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
