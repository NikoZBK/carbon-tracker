import { useState, useEffect, ReactNode } from 'react';
import { getAvailableCountries } from '../utils/countryData';
import {
  EmissionsContext,
  CountriesData,
  EmissionsContextType,
} from './EmissionsContextDef';

export function EmissionsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EmissionsContextType>({
    countryList: [],
    allCountriesData: {},
    loading: true,
    error: null,
    loaded: false,
  });

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
