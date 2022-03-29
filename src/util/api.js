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

/**
 * Get a list of bible versions
 * @param filter
 * @param uncached
 * @returns {Promise<EntityTable<Bible>>}
 */
export function getBibles({ filter, uncached } = {}) {
  const params = {};
  if (filter) params.filter = true;
  if (uncached) params.uncached = true;
  return client({ endpoint: "/api/bible/bibles", params });
}

/**
 * Get a verse from a specific bible edition
 * @property {string} bibleId - i.e. "de4e12af7f28f599-01"
 * @property {string} verseId - i.e. "GEN.1.1"
 * @returns {Promise<Verse>}
 */
export function getVerse(bibleId, verseId) {
  return client({ endpoint: `/api/bible/${bibleId}/verse/${verseId}` });
}
