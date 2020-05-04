const settings = require('./settings');

/**
 * Returns value if passed css variable presents in application styles settings
 *
 * @param {string} value - variable name to check
 * @return {string} returns variable from settings by key or variable passed in params
 */
function isSettingsVariable(value) {
  if (typeof value === 'string' && value.charAt(0) === '$' && value.length > 1) {
    const settingsVariable = settings.defaults[value.slice(1, value.length)];

    // If key was found in application settings - return it, otherwise return initial value
    return settingsVariable || value;
  }
  return value;
}

/**
 * Converts input number to be used as % property
 *
 * @param {number} number - input number to be converted
 * @return {string} %
 */
const percentage = (number) => `${number < 10 ? number * 100 : Math.min(100, number)}%`;

module.exports = { percentage, isSettingsVariable };
