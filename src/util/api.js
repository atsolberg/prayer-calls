import client from "./client";
import q from "./element";

let files = {
  loaded: false,
  allIds: [],
  byId: {},
};

export function getFiles() {
  if (files.loaded) return Promise.resolve(files);

  return client({ endpoint: "http://localhost:3000/api/files" }).then(
    (resp) => {
      files = { ...resp.files, loaded: true };
      return files;
    }
  );
}

export function getFile(id) {
  if (files.loaded) return Promise.resolve(files.byId[id] || null);
  return new Promise((resolve) => {
    getFiles().then((files) => resolve(files.byId[id] || null));
  });
}

/**
 * Convert markdown to html
 * @param {string} markdown
 * @returns {HTMLDivElement}
 */
export function convertMdToHtml(md) {
  if (!md) return `<span>loading</span>`;

  const c = new window.showdown.Converter();
  const html = q.create(c.makeHtml(md));
  q.qsa(html, "h2").forEach((h2, i) => {
    const first = i === 0;
    q.addClass(h2, "text-sky-500 dark:text-sky-400 text-lg font-bold mb-2");
    if (!first) q.addClass(h2, "mt-2");
  });
  q.qsa(html, "em").forEach((em) => {
    q.addClass(em, "text-sky-500 dark:text-sky-400 py-1");
  });
  const div = document.createElement("div");
  div.append(html);

  return div;
}
