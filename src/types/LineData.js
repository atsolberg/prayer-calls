/**
 * @typedef LineDataEntry
 * @property {string} file - the call/file id, i.e. "2022-03-23.md'
 * @property {string} date - the formatted date, i.e. 'March 23rd, 2022'
 * @property {number} timestamp - the call date as a unix timestamp
 * @property {boolean} strong - was this a strong statement
 * @property {boolean} verse - was this a verse reference
 * @property {number} lineNum - the line this text appeared in the call file
 * @property {string} text - the raw text stripped of '*' and '_' characters
 */

/**
 * @typedef {Object} LineData
 * @property {LineDataEntry[]} line_data - array of data for each line
 */
