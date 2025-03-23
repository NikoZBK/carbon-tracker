import { useState, useEffect, useRef } from 'react';
import { parseLocalDate, areDatesEqual } from '../../utils/dateUtils';

interface DatePickerProps {
  selectedDate: string;
  onChange: (date: string) => void;
  className?: string;
}

export default function DatePicker({
  selectedDate,
  onChange,
  className = '',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => parseLocalDate(selectedDate));
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Close the date picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update the view date when the selected date changes
  useEffect(() => {
    setViewDate(parseLocalDate(selectedDate));
  }, [selectedDate]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setViewDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateSelect = (date: Date) => {
    // Use the date passed in directly, but ensure it's in YYYY-MM-DD format
    // without timezone conversion issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    onChange(formattedDate);
    setIsOpen(false);
  };

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  // Generate days for the current month view
  const generateCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayIndex = firstDay.getDay();

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Last day of previous month
    const prevLastDay = new Date(year, month, 0);
    const prevDaysInMonth = prevLastDay.getDate();

    // Calculate how many days to show from previous month
    const prevDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const days = [];

    // Previous month's days
    for (let i = prevDays; i > 0; i--) {
      const date = new Date(year, month - 1, prevDaysInMonth - i + 1);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    // Current month's days
    const today = new Date();
    const selectedDateObj = parseLocalDate(selectedDate);

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: areDatesEqual(date, today),
        isSelected: areDatesEqual(date, selectedDateObj),
      });
    }

    // Next month's days to complete the grid (always 6 rows × 7 days = 42 cells)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className={`relative ${className}`} ref={datePickerRef}>
      {/* Date picker button */}
      <button
        className="px-3 py-2 bg-light2 hover:bg-light3 cursor-pointer"
        onClick={toggleDatePicker}
        title="Select date"
        aria-label="Open date picker"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {/* Calendar dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-theme border border-light3 rounded-md shadow-lg z-10 w-64">
          {/* Header with month/year navigation */}
          <div className="flex items-center justify-between p-3 border-b border-light3">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1 hover:bg-light2 rounded-full"
              aria-label="Previous month"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="font-medium">
              {viewDate.toLocaleDateString(undefined, {
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <button
              onClick={() => navigateMonth('next')}
              className="p-1 hover:bg-light2 rounded-full"
              aria-label="Next month"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center text-sm py-2 border-b border-light3">
            {weekdays.map(day => (
              <div key={day} className="text-dark1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 p-2">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(day.date)}
                className={`
                  w-8 h-8 mx-auto flex items-center justify-center text-sm rounded-full
                  ${day.isCurrentMonth ? 'text-text-primary' : 'text-dark1'} 
                  ${day.isToday ? 'border border-primary' : ''}
                  ${
                    day.isSelected ? 'bg-primary text-white' : 'hover:bg-light2'
                  }
                `}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>

          {/* Today button */}
          <div className="border-t border-light3 p-2 text-center">
            <button
              onClick={() => {
                const today = new Date();
                handleDateSelect(today);
              }}
              className="text-sm px-3 py-1 text-primary hover:bg-light2 rounded-md w-full"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
