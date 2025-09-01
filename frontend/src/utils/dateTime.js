/**
 * Date and time utility functions
 */

// Default date format options
const DEFAULT_DATE_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

// Default time format options
const DEFAULT_TIME_OPTIONS = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

// Default date-time format options
const DEFAULT_DATETIME_OPTIONS = {
  ...DEFAULT_DATE_OPTIONS,
  ...DEFAULT_TIME_OPTIONS,
};

/**
 * Format a date string or timestamp into a localized date string
 * @param {string|number|Date} date - The date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted date string
 */
const formatDate = (date, options = {}, locale = 'en-US') => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return 'Invalid Date';
    
    const formatOptions = { ...DEFAULT_DATE_OPTIONS, ...options };
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Format a date string or timestamp into a localized time string
 * @param {string|number|Date} date - The date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted time string
 */
const formatTime = (date, options = {}, locale = 'en-US') => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return 'Invalid Time';
    
    const formatOptions = { ...DEFAULT_TIME_OPTIONS, ...options };
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid Time';
  }
};

/**
 * Format a date string or timestamp into a localized date-time string
 * @param {string|number|Date} date - The date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted date-time string
 */
const formatDateTime = (date, options = {}, locale = 'en-US') => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return 'Invalid Date/Time';
    
    const formatOptions = { ...DEFAULT_DATETIME_OPTIONS, ...options };
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting date/time:', error);
    return 'Invalid Date/Time';
  }
};

/**
 * Format a duration in milliseconds into a human-readable string
 * @param {number} ms - Duration in milliseconds
 * @param {boolean} includeSeconds - Whether to include seconds in the output
 * @returns {string} Formatted duration string (e.g., "2h 30m" or "2h 30m 15s")
 */
const formatDuration = (ms, includeSeconds = false) => {
  if (isNaN(ms)) return '--';
  
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;
  
  const parts = [];
  
  if (days > 0) parts.push(`${days}d`);
  if (remainingHours > 0) parts.push(`${remainingHours}h`);
  if (remainingMinutes > 0) parts.push(`${remainingMinutes}m`);
  if (includeSeconds && remainingSeconds > 0) parts.push(`${remainingSeconds}s`);
  
  return parts.length > 0 ? parts.join(' ') : '0m';
};

/**
 * Get the time elapsed since a given date
 * @param {string|number|Date} date - The date to compare
 * @param {string|number|Date} [now=new Date()] - The reference date (defaults to now)
 * @returns {string} Human-readable time ago string (e.g., "2 hours ago")
 */
const timeAgo = (date, now = new Date()) => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    const nowObj = now instanceof Date ? now : new Date(now);
    
    if (isNaN(dateObj.getTime()) || isNaN(nowObj.getTime())) {
      return 'Invalid date';
    }
    
    const seconds = Math.floor((nowObj - dateObj) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return `${years} year${years === 1 ? '' : 's'} ago`;
    if (months > 0) return `${months} month${months === 1 ? '' : 's'} ago`;
    if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`;
    if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    if (seconds > 0) return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    
    return 'just now';
  } catch (error) {
    console.error('Error calculating time ago:', error);
    return '--';
  }
};

/**
 * Check if a date is today
 * @param {string|number|Date} date - The date to check
 * @returns {boolean} True if the date is today
 */
const isToday = (date) => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return false;
    
    const today = new Date();
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  } catch (error) {
    console.error('Error checking if date is today:', error);
    return false;
  }
};

/**
 * Check if a date is in the past
 * @param {string|number|Date} date - The date to check
 * @returns {boolean} True if the date is in the past
 */
const isPast = (date) => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return false;
    
    return dateObj < new Date();
  } catch (error) {
    console.error('Error checking if date is in past:', error);
    return false;
  }
};

/**
 * Check if a date is in the future
 * @param {string|number|Date} date - The date to check
 * @returns {boolean} True if the date is in the future
 */
const isFuture = (date) => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return false;
    
    return dateObj > new Date();
  } catch (error) {
    console.error('Error checking if date is in future:', error);
    return false;
  }
};

/**
 * Add days to a date
 * @param {string|number|Date} date - The start date
 * @param {number} days - Number of days to add (can be negative)
 * @returns {Date} New date with days added
 */
const addDays = (date, days) => {
  try {
    const dateObj = date instanceof Date ? new Date(date) : new Date(date);
    if (isNaN(dateObj.getTime())) return new Date(NaN);
    
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj;
  } catch (error) {
    console.error('Error adding days to date:', error);
    return new Date(NaN);
  }
};

/**
 * Get the difference in days between two dates
 * @param {string|number|Date} date1 - The first date
 * @param {string|number|Date} date2 - The second date
 * @returns {number} Difference in days (positive if date1 > date2, negative if date1 < date2)
 */
const diffInDays = (date1, date2) => {
  try {
    const d1 = date1 instanceof Date ? date1 : new Date(date1);
    const d2 = date2 instanceof Date ? date2 : new Date(date2);
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return NaN;
    
    const diffTime = d1 - d2;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error('Error calculating difference in days:', error);
    return NaN;
  }
};

/**
 * Format a date range as a string
 * @param {string|number|Date} startDate - The start date
 * @param {string|number|Date} endDate - The end date
 * @param {Object} options - Formatting options
 * @param {string} options.locale - Locale string (default: 'en-US')
 * @param {boolean} options.showTime - Whether to include time in the output
 * @param {boolean} options.showYear - Whether to always show the year (default: true)
 * @returns {string} Formatted date range string (e.g., "Jan 1 - 15, 2023")
 */
const formatDateRange = (startDate, endDate, options = {}) => {
  try {
    const {
      locale = 'en-US',
      showTime = false,
      showYear = true,
    } = options;
    
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    const end = endDate instanceof Date ? endDate : new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Invalid date range';
    }
    
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const sameYear = startYear === endYear;
    const sameMonth = sameYear && start.getMonth() === end.getMonth();
    
    let dateOptions = {
      month: 'short',
      day: 'numeric',
    };
    
    if (!sameYear || showYear) {
      dateOptions.year = 'numeric';
    }
    
    if (showTime) {
      dateOptions = {
        ...dateOptions,
        hour: '2-digit',
        minute: '2-digit',
      };
    }
    
    const startStr = start.toLocaleDateString(locale, dateOptions);
    
    if (sameYear && sameMonth) {
      const dayPart = end.toLocaleDateString(locale, { day: 'numeric' });
      const timePart = showTime 
        ? end.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
        : '';
      
      return `${startStr} - ${dayPart}${timePart ? `, ${timePart}` : ''}`;
    }
    
    const endStr = end.toLocaleDateString(locale, dateOptions);
    return `${startStr} - ${endStr}`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return 'Invalid date range';
  }
};

export {
  formatDate,
  formatTime,
  formatDateTime,
  formatDuration,
  timeAgo,
  isToday,
  isPast,
  isFuture,
  addDays,
  diffInDays,
  formatDateRange,
};

export default {
  formatDate,
  formatTime,
  formatDateTime,
  formatDuration,
  timeAgo,
  isToday,
  isPast,
  isFuture,
  addDays,
  diffInDays,
  formatDateRange,
};
