import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import { shape, string } from "prop-types";

import { convertMdToHtml } from "../../util/markdown";
import { formatFileDate } from "../../util/date";

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
        className={cx([
          "block",
          "relative",
          "bg-slate-300/25 dark:bg-slate-700/25",
          "hover:bg-slate-400/25 hover:dark:bg-slate-600/25",
          "rounded-lg",
          "ring-1",
          "ring-slate-300/75 dark:ring-slate-800",
        ])}
      >
        <div className="square">
          <div
            className="square-content"
            data-testid="thumbnail"
            dangerouslySetInnerHTML={{
              __html: convertMdToHtml(contents).outerHTML,
            }}
          />
        </div>
        <div
          className={cx([
            "absolute",
            "bottom-0",
            "left-0",
            "w-full",
            "h-1/6",
            "bg-gradient-to-b",
            "from-transparent",
            "to-slate-200",
            "dark:to-slate-900",
            "rounded-b-lg",
          ])}
        />
      </Link>
      <span className="absolute top-0 right-1 mr-1 mt-1 p-1 font-bold text-sky-500">
        {formatFileDate(name)}
      </span>
    </div>
  );
}

export default FileCard;
