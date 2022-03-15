import React from "react";
import { Link } from "react-router-dom";
import { shape, string } from "prop-types";

import q from "../../util/element";
import styles from "./styles";

function getHtml(file) {
  if (!file?.contents) return `<span>loading</span>`;

  const c = new window.showdown.Converter();
  const html = q.create(c.makeHtml(file.contents));
  q.qsa(html, "h2").forEach((h2) => {
    q.addClass(h2, "text-sky-500 dark:text-sky-400 text-lg font-bold");
  });
  q.qsa(html, "em").forEach((em) => {
    q.addClass(em, "text-sky-500 dark:text-sky-400 py-1");
  });
  const div = document.createElement("div");
  div.append(html);

  return div;
}

FileCard.propTypes = {
  file: shape({
    id: string.isRequired,
    name: string.isRequired,
    contents: string.isRequired,
  }),
};
function FileCard({ file }) {
  return (
    <div css={styles} className="border relative">
      <div className="square">
        <div
          className="square-content"
          dangerouslySetInnerHTML={{ __html: getHtml(file).outerHTML }}
        />
      </div>
      <Link
        to={`/details/${file.id}`}
        className="absolute top-0 right-0 mr-2 mt-2 p-1 bg-slate-700 rounded"
      >
        {file.name}
      </Link>
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-b from-transparent to-slate-900"></div>
    </div>
  );
}

export default FileCard;
