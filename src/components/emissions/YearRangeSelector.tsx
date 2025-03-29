import React from 'react';

interface YearRangeSelectorProps {
  availableYears: number[];
  startYear: number;
  endYear: number;
  onStartYearChange: (year: number) => void;
  onEndYearChange: (year: number) => void;
  orientation?: 'vertical' | 'horizontal';
}

const YearRangeSelector: React.FC<YearRangeSelectorProps> = ({
  availableYears,
  startYear,
  endYear,
  onStartYearChange,
  onEndYearChange,
  orientation = 'vertical',
}) => {
  const handleStartYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStartYearChange(parseInt(e.target.value, 10));
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onEndYearChange(parseInt(e.target.value, 10));
  };

  return (
    <div
      className={` ${
        orientation === 'horizontal'
          ? 'flex justify-self-auto gap-4 flex-wrap'
          : ''
      }`}
    >
      <div>
        <label className="block mb-2">Start Year</label>
        <select
          value={startYear}
          onChange={handleStartYearChange}
          className="w-full rounded-md border border-light3 p-2 bg-light1"
        >
          {availableYears.map(year => (
            <option key={`start-${year}`} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2">End Year</label>
        <select
          value={endYear}
          onChange={handleEndYearChange}
          className="w-full rounded-md border border-light3 p-2 bg-light1"
        >
          {availableYears
            .filter(year => year >= startYear)
            .map(year => (
              <option key={`end-${year}`} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default YearRangeSelector;
