import q from "./element";
import showdown from "showdown";

/**
 * Convert markdown to html
 * @param {string} markdown
 * @returns {HTMLDivElement}
 */
export function convertMdToHtml(md) {
  if (!md) return `<span>loading</span>`;

  const c = new showdown.Converter();
  const html = q.create(c.makeHtml(md));
  const div = document.createElement("div");
  div.append(html);

  q.qsa(div, "h2").forEach((h2) => q.addClass(h2, "text-lg font-bold my-2"));
  q.qsa(div, "em").forEach((em) => {
    q.addClass(em, "verse text-sky-500 py-1");
  });

  return div;
}
