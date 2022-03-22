import client from "./client";

let files = {
  loaded: false,
  allIds: [],
  byId: {},
};

/**
 * Get all markdown files as a entity table
 * @returns {Promise<*&{loaded: boolean}>|Promise<{loaded: boolean, byId: {}, allIds: string[]}>}
 */
export function getFiles() {
  if (files.loaded) return Promise.resolve(files);

  return client({ endpoint: "/api/files" }).then((resp) => {
    files = { ...resp.files, loaded: true };
    return files;
  });
}

/**
 * Get a single markdown file or null if not loaded yet
 * @param {string} id - the file id
 * @returns {Promise<null|string>}
 */
export function getFile(id) {
  if (files.loaded) return Promise.resolve(files.byId[id] || null);
  return new Promise((resolve) => {
    getFiles().then((files) => resolve(files.byId[id] || null));
  });
}

export function getBibles() {
  return client({ endpoint: "/api/bible/bibles" });
}

/**
 * Fetch books for the kjv which should work for all
 * the ones we will use.
 */
export function getBooks() {
  return client({ endpoint: "/api/bible/de4e12af7f28f599-02/books" });
}

/**
 * Get a verse from a specific bible edition
 * @property {string} bibleId - i.e. "de4e12af7f28f599-02"
 * @property {string} verseId - i.e. "GEN.1.1"
 * @returns {Promise<Response>}
 */
export function getVerse(bibleId, verseId) {
  return client({ endpoint: `/api/bible/${bibleId}/verse/${verseId}` });
}
