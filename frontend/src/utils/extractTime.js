/**
 * Extracts the time in HH:MM format from a given date string.
 * @param {string} dateString - The date string to extract the time from.
 * @returns {string} The formatted time as HH:MM.
 * @throws {Error} Throws an error if the input is not a valid date string.
 */
export function extractTime(dateString) {
    if (typeof dateString !== 'string') {
      throw new Error('Invalid input: dateString must be a string.');
    }
  
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string.');
    }
  
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
  
    return `${hours}:${minutes}`;
  }
  
  /**
   * Pads single-digit numbers with a leading zero.
   * @param {number} number - The number to pad.
   * @returns {string} The number padded with a leading zero if necessary.
   */
  function padZero(number) {
    return number.toString().padStart(2, '0');
  }
  