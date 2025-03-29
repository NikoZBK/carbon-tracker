/**
 * Date utility functions to handle timezone-consistent operations
 */

/**
 * Formats a Date object to YYYY-MM-DD string in local timezone
 */
export function formatDateToLocalISOString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Creates a Date object from a YYYY-MM-DD string without timezone shifts
 */
export function parseLocalDate(dateString: string): Date {
  // Split the ISO string into parts
  const [year, month, day] = dateString.split('-').map(Number);

  // Create a new date using local timezone (month is 0-indexed in JS Date)
  return new Date(year, month - 1, day);
}

/**
 * Returns today's date as YYYY-MM-DD string in local timezone
 */
export function getTodayString(): string {
  return formatDateToLocalISOString(new Date());
}

/**
 * Compares two dates for equality (ignoring time)
 */
export function areDatesEqual(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
