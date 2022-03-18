import q from "./element";

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
    q.addClass(h2, "text-lg font-bold mb-2");
    if (!first) q.addClass(h2, "mt-2");
  });
  q.qsa(html, "em").forEach((em) => {
    q.addClass(em, "verse text-sky-500 dark:text-sky-400 py-1");
  });
  const div = document.createElement("div");
  div.append(html);

  return div;
}
