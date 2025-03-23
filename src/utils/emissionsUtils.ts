import { EmissionsData, CountriesData } from '../contexts/EmissionsContextDef';

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
