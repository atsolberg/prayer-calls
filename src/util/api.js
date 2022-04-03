import client from "./client";
import EntityTable from "../../shared/util/EntityTable";

const files = {
  loaded: false,
  entities: new EntityTable(),
};

/**
 * Get all markdown files as a entity table
 * @returns {Promise<{ loaded: boolean, entities: EntityTable<CallFile> }>}
 */
export function getFiles() {
  if (files.loaded) return Promise.resolve(files);

  return client({ endpoint: "/api/files" }).then((resp) => {
    const table = new EntityTable(Object.values(resp.files.byId));
    table.sort((a, b) => {
      const d1 = new Date(table.get(a).name);
      const d2 = new Date(table.get(b).name);
      if (d1 < d2) return 1;
      if (d1 > d2) return -1;
      return 0;
    });
    files.entities = table;
    files.loaded = true;
    return files;
  });
}

/**
 * Get a single markdown file or null if not loaded yet
 * @param {string} id - the file id
 * @returns {Promise<null|string>}
 */
export function getFile(id) {
  if (files.loaded) return Promise.resolve(files.entities.get(id) || null);
  return new Promise((resolve) => {
    getFiles().then((files) => resolve(files.entities.get(id) || null));
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
