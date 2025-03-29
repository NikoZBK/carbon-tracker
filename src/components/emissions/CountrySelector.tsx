import React from 'react';

interface CountrySelectorProps {
  countryList: string[];
  selectedCountry: string;
  onChange: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countryList,
  selectedCountry,
  onChange,
}) => {
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      <label className="block mb-2">Select Country:</label>
      <select
        value={selectedCountry}
        onChange={handleCountryChange}
        className="w-full rounded-md border border-light3 p-2 bg-light1"
      >
        {countryList.length === 0 ? (
          <option value="">Loading countries...</option>
        ) : (
          [...countryList]
            .sort((a, b) =>
              a.replace(/_/g, ' ').localeCompare(b.replace(/_/g, ' '))
            )
            .map(country => (
              <option key={country} value={country}>
                {country.replace(/_/g, ' ')}
              </option>
            ))
        )}
      </select>
    </div>
  );
};

export default CountrySelector;
