/**
 * Remove commas from a string and convert it to a number.
 *
 * @param {string} str The string containing commas
 * @returns {number} The resulting number after conversion
 */

const toNumber = (str: string = '0') => {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }

  const cleanedString = str.replace(/,/g, '');

  const number = parseFloat(cleanedString);

  if (isNaN(number)) {
    throw new Error(
      'The input string could not be converted to a valid number'
    );
  }

  return number;
};

export default toNumber;
