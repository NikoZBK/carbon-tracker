import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import CountrySelector from './CountrySelector';
import YearRangeSelector from './YearRangeSelector';
import EmissionsStatistics from './EmissionsStatistics';
import EmissionsChart from './EmissionsChart';
import {
  useEmissions,
  getCountryData,
  getAvailableYears,
  filterDataByYearRange,
  calculateStatistics,
} from '../../contexts/EmissionsContext';

interface CountryEmissionsGraphProps {
  className?: string;
}

export default function CountryEmissionsGraph({
  className = '',
}: CountryEmissionsGraphProps) {
  const [selectedCountry, setSelectedCountry] =
    useState<string>('United_States');
  const [startYear, setStartYear] = useState<number>(2000);
  const [endYear, setEndYear] = useState<number>(2020);

  // Use our emissions context to access the globally loaded data
  const { countryList, allCountriesData, loading, error } = useEmissions();

  // Get data for the selected country from the context
  const countryData = getCountryData(allCountriesData, selectedCountry);

  // Get available years for the selected country
  const availableYears = getAvailableYears(allCountriesData, selectedCountry);

  // Set default time range when available years change
  useEffect(() => {
    if (availableYears.length > 0) {
      // Set initial time range to last 20 years of available data or all if less
      const latestYear = availableYears[availableYears.length - 1];
      const earliestYear = availableYears[0];

      // If we have more than 20 years of data, show the last 20
      if (availableYears.length > 20) {
        setStartYear(Math.max(earliestYear, latestYear - 20));
      } else {
        setStartYear(earliestYear);
      }
      setEndYear(latestYear);
    }
  }, [availableYears]);

  // Handle country change
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  // Handle start year change
  const handleStartYearChange = (year: number) => {
    setStartYear(year);
    if (year >= endYear) {
      // Ensure at least one year of data is shown
      setEndYear(Math.min(year + 1, Math.max(...availableYears)));
    }
  };

  // Handle end year change
  const handleEndYearChange = (year: number) => {
    setEndYear(year);
  };

  // Filter data for the selected time period
  const filteredData = filterDataByYearRange(countryData, startYear, endYear);

  // Calculate statistics
  const { averageTotalEmissions, averagePerCapita } =
    calculateStatistics(filteredData);

  // Format country name for display (replace underscores with spaces)
  const displayCountryName = selectedCountry.replace(/_/g, ' ');

  return (
    <Card className={`${className}`}>
      <h2 className="text-subtitle mb-6">Historical Carbon Emissions</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Controls Section - 1/4 of the width on large screens */}
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-medium mb-4">Select Data Range</h3>

          <div className="space-y-4">
            <CountrySelector
              countryList={countryList}
              selectedCountry={selectedCountry}
              onChange={handleCountryChange}
            />

            <YearRangeSelector
              availableYears={availableYears}
              startYear={startYear}
              endYear={endYear}
              onStartYearChange={handleStartYearChange}
              onEndYearChange={handleEndYearChange}
              orientation="horizontal"
            />
          </div>

          {/* Statistics summary */}
          <EmissionsStatistics
            countryName={displayCountryName}
            startYear={startYear}
            endYear={endYear}
            averageTotalEmissions={averageTotalEmissions}
            averagePerCapita={averagePerCapita}
          />
        </Card>

        {/* Graph Section - 3/4 of the width on large screens */}
        <Card className="lg:col-span-3">
          {error && <p className="text-red-500 text-center py-4">{error}</p>}

          <EmissionsChart
            data={filteredData}
            countryName={displayCountryName}
            loading={loading && countryData.length === 0}
          />
        </Card>
      </div>
    </Card>
  );
}
