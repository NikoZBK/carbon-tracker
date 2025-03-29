import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import DatePicker from '../forms/DatePicker';
import {
  formatDateToLocalISOString,
  parseLocalDate,
  getTodayString,
} from '../../utils/dateUtils';

interface TimelineProps {
  title: string;
  subtitle?: string;
  initialDate?: string;
  onDateChange?: (date: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export default function Timeline({
  title,
  subtitle = 'No data available for this date.',
  initialDate,
  onDateChange,
  children,
  className = '',
}: TimelineProps) {
  // Use our consistent date handling
  const [selectedDate, setSelectedDate] = useState<string>(
    initialDate || getTodayString()
  );

  // Update internal state when initialDate prop changes
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  // Function to navigate to previous/next day
  const navigateDate = (direction: 'prev' | 'next') => {
    // Parse the date correctly
    const date = parseLocalDate(selectedDate);

    if (direction === 'prev') {
      date.setDate(date.getDate() - 1);
    } else {
      date.setDate(date.getDate() + 1);
    }

    // Format the date correctly
    const newDate = formatDateToLocalISOString(date);
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  // Format the date for display
  const formatDateHeading = (dateString: string) => {
    const date = parseLocalDate(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return (
    <Card className={className}>
      <div className="flex flex-col items-center">
        <h2 className="text-subtitle mb-4">{title}</h2>

        <div className="flex items-center justify-center w-full mb-4">
          <button
            onClick={() => navigateDate('prev')}
            className="px-3 py-2 bg-light2 hover:bg-light3 rounded-l-md"
            aria-label="Previous day"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="px-4 flex-1 text-center">
            <p className="text-lg font-medium">
              {formatDateHeading(selectedDate)}
            </p>
          </div>

          <DatePicker selectedDate={selectedDate} onChange={handleDateChange} />

          <button
            onClick={() => navigateDate('next')}
            className="px-3 py-2 bg-light2 hover:bg-light3 rounded-r-md"
            aria-label="Next day"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {children ? (
          children
        ) : (
          <div className="py-8 text-center text-dark1">{subtitle}</div>
        )}
      </div>
    </Card>
  );
}
