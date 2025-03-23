import { Card } from '../components/ui';
import { useTheme } from '../hooks/useTheme';
import { useSettings } from '../hooks/useSettings';
import { EventLogger } from '../components/system';

export default function Settings() {
  const { theme, colorScheme, setTheme, setColorScheme } = useTheme();

  const {
    dataCollection,
    anonymizeData,
    storageLimit,
    units,
    dateFormat,
    setDataCollection,
    setAnonymizeData,
    setStorageLimit,
    setUnits,
    setDateFormat,
    resetToDefaults,
  } = useSettings();

  return (
    <>
      <h1 className="text-title pb-3">Settings</h1>
      <p className="text-body">
        Configure your preferences, including theme settings, data privacy
        options, and measurement units, as well as data export options.
      </p>
      <div className="settings-page grid grid-cols-1 gap-6">
        {/* Display & Theme */}{' '}
        <h2 className="text-settings-title">Display & Theme</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-dark1 mb-1" htmlFor="theme">
                Theme
              </label>
              <select
                id="theme"
                className="w-full p-2 border border-light3 rounded-md bg-theme"
                value={theme}
                onChange={e =>
                  setTheme(e.target.value as 'system' | 'light' | 'dark')
                }
              >
                <option value="system">System Default</option>
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div>

            <div>
              <label className="block text-dark1 mb-1" htmlFor="colorScheme">
                Color Scheme
              </label>
              <select
                id="colorScheme"
                className="w-full p-2 border border-light3 rounded-md bg-theme"
                value={colorScheme}
                onChange={e =>
                  setColorScheme(
                    e.target.value as 'blue' | 'green' | 'purple' | 'amber'
                  )
                }
              >
                <option value="blue">Blue (Default)</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="amber">Amber</option>
              </select>
            </div>
          </div>
        </Card>
        {/* Data & Privacy */}{' '}
        <h2 className="text-settings-title">Data & Privacy</h2>
        <Card>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="dataCollection"
                type="checkbox"
                className="mr-2"
                checked={dataCollection}
                onChange={e => setDataCollection(e.target.checked)}
              />
              <label htmlFor="dataCollection">Enable usage analytics</label>
            </div>

            <div className="flex items-center">
              <input
                id="anonymizeData"
                type="checkbox"
                className="mr-2"
                checked={anonymizeData}
                onChange={e => setAnonymizeData(e.target.checked)}
              />
              <label htmlFor="anonymizeData">Anonymize personal data</label>
            </div>

            <div>
              <label className="block text-dark1 mb-1" htmlFor="storageLimit">
                Data Retention Period (days)
              </label>
              <select
                id="storageLimit"
                className="w-full p-2 border border-light3 rounded-md bg-theme"
                value={storageLimit}
                onChange={e =>
                  setStorageLimit(
                    e.target.value as '30' | '90' | '180' | '365' | 'unlimited'
                  )
                }
              >
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
                <option value="unlimited">Unlimited</option>
              </select>
            </div>

            <div className="mt-2">
              <button className="px-4 py-2 bg-light3 text-dark2 rounded-md hover:bg-light4 transition-colors">
                Export All Data (JSON)
              </button>
            </div>
          </div>
        </Card>
        {/* Measurement Preferences */}{' '}
        <h2 className="text-settings-title">Measurement Preferences</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-dark1 mb-1" htmlFor="units">
                Unit System
              </label>
              <select
                id="units"
                className="w-full p-2 border border-light3 rounded-md bg-theme"
                value={units}
                onChange={e =>
                  setUnits(e.target.value as 'metric' | 'imperial')
                }
              >
                <option value="metric">Metric (kg, km)</option>
                <option value="imperial">Imperial (lb, mi)</option>
              </select>
            </div>

            <div>
              <label className="block text-dark1 mb-1" htmlFor="dateFormat">
                Date Format
              </label>
              <select
                id="dateFormat"
                className="w-full p-2 border border-light3 rounded-md bg-theme"
                value={dateFormat}
                onChange={e =>
                  setDateFormat(
                    e.target.value as 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'
                  )
                }
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
              </select>
            </div>
          </div>
        </Card>
        {/* Event System Logs */}
        <h2 className="text-settings-title">Event System</h2>
        <EventLogger />
        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-light3 text-dark2 rounded-md hover:bg-light4 transition-colors"
            onClick={resetToDefaults}
          >
            Reset to Defaults
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
