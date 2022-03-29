/**
 * @typedef ApiBibleVerse
 * @description Verse payload from http://scripture.api.bible/v1
 * @property {string} id - i.e. "GEN.1.1"
 * @property {string} orgId - i.e. "GEN.1.1"
 * @property {string} chapterId - i.e. "GEN.1"
 * @property {string} bibleId - i.e. "de4e12af7f28f599-01"
 * @property {string} reference - i.e. "Genesis 1:1"
 * @property {string} content - i.e. "<p class=\"p\">In the beginning God created the heaven and the earth. </p>",
 * @property {number} verseCount - i.e. 1
 * @property {string} copyright - i.e. "PUBLIC DOMAIN except in the United Kingdom, where a Crown Copyright applies to printing the KJV. See http://www.cambridge.org/about-us/who-we-are/queens-printers-patent",
 * @property {object} next
 * @property {string} next.id - i.e. "GEN.1.2"
 * @property {string} next.number - i.e. "2"
 * @property {object} previous
 * @property {string} previous.id - i.e. "GEN.intro.0"
 * @property {string} previous.number - i.e. "0"
 */

/**
 * @typedef Verse
 * @description Normalized verse payload
 * @property {string} id - i.e. "GEN.1.1" or "GEN.1.1-GEN-1.4"
 * @property {string} bibleId - i.e. "de4e12af7f28f599-01" or "NET
 * @property {string} content - i.e. "<p class=\"p\">In the beginning God created the heaven and the earth. </p>",
 * @property {string} copyright - i.e. "PUBLIC DOMAIN",
 */
