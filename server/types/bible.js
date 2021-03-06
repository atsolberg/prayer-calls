/**
 * @typedef ApiBible
 * @description Bible payload from http://scripture.api.bible/v1
 * @property {string} id - i.e. "de4e12af7f28f599-01"
 * @property {string} dblId - i.e. "de4e12af7f28f599"
 * @property {*} [dblId] - i.e. null
 * @property {string} name - i.e. "King James (Authorised) Version"
 * @property {string} nameLocal - i.e. "King James Version"
 * @property {string} abbreviation - i.e. "engKJV"
 * @property {string} abbreviationLocal - i.e. "KJV"
 * @property {string} description - i.e. "Protestant"
 * @property {string} descriptionLocal - i.e. "Protestant"
 * @property {string} descriptionLocal - i.e. "Protestant"
 * @property {Language} language
 * @property {Country[]} countries
 * @property {string} type - i.e. "text"
 * @property {string} updatedAt - i.e. "2022-01-07T15:05:57.000Z"
 * @property {Array} audioBibles - ?
 */

/**
 * @typedef Bible
 * @description Normalized bible payload
 * @property {string} id - i.e. "de4e12af7f28f599-01" or "NET"
 * @property {string} name - i.e. "King James Version"
 * @property {string} abbr - i.e. "KJV"
 */
