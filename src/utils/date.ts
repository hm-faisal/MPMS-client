import { format, isValid } from 'date-fns';

/**
 * Formats a date using date-fns with built-in validation
 * @param {Date|string|number} date - Input date (Date object, ISO string, or timestamp)
 * @param {string} [formatStr='MMM d, yyyy'] - date-fns format string (default: 'MMM d, yyyy')
 * @param {Object} [options] - Additional options for date-fns format()
 * @returns {string} Formatted date string or 'Invalid Date'
 */
export function formatDate(
  date: Date | string | number,
  formatStr: string = 'MMM d, yyyy',
  options?: any,
): string {
  if (date == null) return 'Invalid Date';

  const dateObj =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;

  if (!isValid(dateObj)) return 'Invalid Date';

  return format(dateObj, formatStr, options);
}

import { differenceInCalendarDays, parseISO } from 'date-fns';

/**
 * Calculate the number of days between two ISO date strings (inclusive)
 * @param {string} startDateISO - Start date in ISO format (e.g. '2025-12-10')
 * @param {string} endDateISO - End date in ISO format (e.g. '2025-12-15')
 * @returns {number | null} Number of days, or null if invalid dates
 */
export function calculateDays(
  startDateISO: string,
  endDateISO: string,
): number | null {
  const start = parseISO(startDateISO);
  const end = parseISO(endDateISO);

  if (!isValid(start) || !isValid(end)) {
    return null;
  }

  return differenceInCalendarDays(end, start);
}
