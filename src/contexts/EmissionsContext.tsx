import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { getAvailableCountries } from '../utils/countryData';

export interface EmissionsData {
  country: string;
  year: number;
  totalEmissions: number;
  perCapitaEmissions: number;
}

interface CountriesData {
  [country: string]: EmissionsData[];
}

interface EmissionsContextType {
  countryList: string[];
  allCountriesData: CountriesData;
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: EmissionsContextType = {
  countryList: [],
  allCountriesData: {},
  loading: true,
  error: null,
  loaded: false,
};

const EmissionsContext = createContext<EmissionsContextType>(initialState);

export function EmissionsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EmissionsContextType>(initialState);

  useEffect(() => {
    const loadAllCountriesData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const countries = getAvailableCountries();
        setState(prev => ({ ...prev, countryList: countries }));

        // Create an array of promises to fetch all countries' data concurrently
        const promises = countries.map(async country => {
          try {
            const response = await fetch(
              `/src/datasets/country/${country}.csv`
            );
            if (!response.ok) {
              console.error(`Failed to load data for ${country}`);
              return { country, data: [] };
            }

            const csvText = await response.text();
            // Parse CSV data
            const rows = csvText.split('\n').slice(1); // Skip header
            const parsedData = rows
              .filter(row => row.trim() !== '')
              .map(row => {
                const columns = row.split(',');
                return {
                  country,
                  year: parseInt(columns[1], 10),
                  totalEmissions: parseFloat(columns[4]) / 1e9, // Convert to billion tons
                  perCapitaEmissions: parseFloat(columns[5]),
                };
              })
              .filter(data => !isNaN(data.year) && !isNaN(data.totalEmissions));

            return { country, data: parsedData };
          } catch (err) {
            console.error(`Error loading data for ${country}:`, err);
            return { country, data: [] };
          }
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        // Create the data object
        const countriesData: CountriesData = {};
        results.forEach(({ country, data }) => {
          countriesData[country] = data;
        });

        setState(prev => ({
          ...prev,
          allCountriesData: countriesData,
          loaded: true,
          loading: false,
        }));
      } catch (err) {
        console.error('Error loading emissions data:', err);
        setState(prev => ({
          ...prev,
          error: 'Failed to load emissions data',
          loading: false,
        }));
      }
    };

    loadAllCountriesData();
  }, []);

  return (
    <EmissionsContext.Provider value={state}>
      {children}
    </EmissionsContext.Provider>
  );
}

export function useEmissions() {
  const context = useContext(EmissionsContext);
  if (!context) {
    throw new Error('useEmissions must be used within an EmissionsProvider');
  }
  return context;
}

// Utility functions for working with emissions data
export function getCountryData(
  allCountriesData: CountriesData,
  country: string
): EmissionsData[] {
  return allCountriesData[country] || [];
}

export function getAvailableYears(
  allCountriesData: CountriesData,
  country: string
): number[] {
  const countryData = allCountriesData[country] || [];
  const years = countryData.map(d => d.year);
  return [...new Set(years)].sort((a, b) => a - b);
}

export function filterDataByYearRange(
  data: EmissionsData[],
  startYear: number,
  endYear: number
): EmissionsData[] {
  return data.filter(d => d.year >= startYear && d.year <= endYear);
}

export function calculateStatistics(filteredData: EmissionsData[]) {
  const averageTotalEmissions =
    filteredData.length > 0
      ? filteredData.reduce((sum, d) => sum + d.totalEmissions, 0) /
        filteredData.length
      : 0;

  const averagePerCapita =
    filteredData.length > 0
      ? filteredData.reduce((sum, d) => sum + d.perCapitaEmissions, 0) /
        filteredData.length
      : 0;

  return { averageTotalEmissions, averagePerCapita };
}
