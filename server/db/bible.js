import { entityTable } from "./util";

const data = {
  bibles: entityTable(),
  verses: entityTable(),
};

const BibleCache = {
  /**
   * Set bibles in the database
   * @param {Bible[]} bibles
   */
  setBibles(bibles) {
    bibles.forEach((b) => {
      data.bibles.allIds.push(b.id);
      data.bibles.byId[b.id] = b;
    });
  },

  /**
   * Return entity table of bibles
   * @returns {{byId: {Object.<Bible>}, allIds: string[]}}
   */
  getBibles() {
    return data.bibles;
  },

  /**
   * Return a specific bible edition
   * @param {string} id - i.e. "de4e12af7f28f599-01
   * @returns {Bible|null}
   */
  getBible(id) {
    return data?.bibles?.byId?.[id] || null;
  },

  /**
   * Set a verse in the database
   * @param {Verse} verse - the verse to store
   */
  setVerse(verse, id) {
    const vid = `${verse.bibleId}.${id}`;
    data.verses.allIds.push(vid);
    data.verses.byId[vid] = verse;
  },

  /**
   * Get a verse by id for a specific bible edition
   * @param {string} bibleId - i.e. "de4e12af7f28f599-01"
   * @param {string} verseId - i.e. "GEN.1.1"
   * @returns {Verse|null}
   */
  getVerse(bibleId, verseId) {
    const id = `${bibleId}.${verseId}`;
    const verse = data.verses.byId?.[id];
    return verse || null;
  },
};

export default BibleCache;
