import React from "react";
import { Link } from "react-router-dom";
import { shape, string } from "prop-types";

import { convertMdToHtml } from "../../util/api";
import styles from "./styles";

FileCard.propTypes = {
  file: shape({
    id: string.isRequired,
    name: string.isRequired,
    contents: string.isRequired,
  }),
};
function FileCard({ file }) {
  const { id, name, contents } = file;
  return (
    <div className="relative">
      <Link
        to={`/details/${id}`}
        css={styles}
        className="block border border-slate-400 hover:border-sky-500 hover:border-2 relative"
      >
        <div className="square">
          <div
            className="square-content"
            dangerouslySetInnerHTML={{
              __html: convertMdToHtml(contents).outerHTML,
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-b from-transparent to-slate-900" />
      </Link>
      <span className="absolute top-0 right-0 mt-2 mr-1.5 p-1 bg-slate-700 rounded">
        {name}
      </span>
    </div>
  );
}

export default FileCard;
