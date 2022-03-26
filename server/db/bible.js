import { entityTable } from "./util";

const data = {
  bibles: entityTable(),
  books: entityTable(),
  chapters: entityTable(),
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
   * Set books in the database
   * @param {Book[]} books
   */
  setBooks(books) {
    const [first] = books;
    const { bibleId } = first;

    books.forEach((b) => {
      const id = `${bibleId}.${b.id}`;
      data.books.allIds.push(id);
      data.books.byId[id] = b;
    });
  },

  /**
   * Get all books for a bible edition
   * @param {string} bibleId - i.e. "de4e12af7f28f599-01
   * @returns {Bible[]}
   */
  getBooks(bibleId) {
    const all = Object.values(data?.books?.byId || {});
    const books = all?.filter((b) => b.bibleId === bibleId);
    return books;
  },

  /**
   * Get a book from the database
   * @param {string} bibleId - i.e. "de4e12af7f28f599-01"
   * @param {string} bookId - i.e. "GEN.1.1"
   * @returns {Book|null}
   */
  getBook(bibleId, bookId) {
    const id = `${bibleId}.${bookId}`;
    const book = data?.books?.byId?.[id];
    return book || null;
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
