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
    <div css={styles} className="border relative">
      <div className="square">
        <div
          className="square-content"
          dangerouslySetInnerHTML={{
            __html: convertMdToHtml(contents).outerHTML,
          }}
        />
      </div>
      <Link
        to={`/details/${id}`}
        className="absolute top-0 right-0 mr-2 mt-2 p-1 bg-slate-700 rounded"
      >
        {name}
      </Link>
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-b from-transparent to-slate-900" />
    </div>
  );
}

export default FileCard;
