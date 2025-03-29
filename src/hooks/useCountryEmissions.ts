import { useState, useEffect } from 'react';
import { getAvailableCountries } from '../utils/countryData';

export interface EmissionsData {
  year: number;
  totalEmissions: number;
  perCapitaEmissions: number;
}

export interface CountryEmissionsState {
  countryList: string[];
  emissionsData: EmissionsData[];
  availableYears: number[];
  loading: boolean;
  error: string | null;
}

export const useCountryEmissions = (selectedCountry: string) => {
  const [state, setState] = useState<CountryEmissionsState>({
    countryList: [],
    emissionsData: [],
    availableYears: [],
    loading: true,
    error: null,
  });

  // Load the list of available countries
  useEffect(() => {
    const countries = getAvailableCountries();
    setState(prev => ({ ...prev, countryList: countries }));
  }, []);

  // Load the selected country's emissions data
  useEffect(() => {
    const loadCountryData = async () => {
      if (!selectedCountry) return;

      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const response = await fetch(
          `/src/datasets/country/${selectedCountry}.csv`
        );
        if (!response.ok) {
          throw new Error(`Failed to load data for ${selectedCountry}`);
        }

        const csvText = await response.text();

        // Parse CSV data
        const rows = csvText.split('\n').slice(1); // Skip header
        const parsedData: EmissionsData[] = rows
          .filter(row => row.trim() !== '')
          .map(row => {
            const columns = row.split(',');
            return {
              year: parseInt(columns[1], 10),
              totalEmissions: parseFloat(columns[4]) / 1e9, // Convert to billion tons
              perCapitaEmissions: parseFloat(columns[5]),
            };
          })
          .filter(data => !isNaN(data.year) && !isNaN(data.totalEmissions));

        // Create list of available years for this country
        const years = parsedData.map(d => d.year);
        const uniqueYears = [...new Set(years)].sort((a, b) => a - b);

        setState(prev => ({
          ...prev,
          emissionsData: parsedData,
          availableYears: uniqueYears,
          loading: false,
        }));
      } catch (err) {
        console.error(`Error loading data for ${selectedCountry}:`, err);
        setState(prev => ({
          ...prev,
          error: `Failed to load emissions data for ${selectedCountry.replace(
            /_/g,
            ' '
          )}`,
          emissionsData: [],
          availableYears: [],
          loading: false,
        }));
      }
    };

    loadCountryData();
  }, [selectedCountry]);

  return state;
};

// Helper function to filter data by year range
export const filterDataByYearRange = (
  data: EmissionsData[],
  startYear: number,
  endYear: number
): EmissionsData[] => {
  return data.filter(d => d.year >= startYear && d.year <= endYear);
};

// Helper function to calculate statistics
export const calculateStatistics = (filteredData: EmissionsData[]) => {
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
};
