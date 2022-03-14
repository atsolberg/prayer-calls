import React from "react";
import { Link } from "react-router-dom";
import { shape, string } from "prop-types";

FileCard.propTypes = {
  file: shape({
    id: string.isRequired,
    name: string.isRequired,
    contents: string.isRequired,
  }),
};
function FileCard({ file }) {
  return (
    <div className="file border relative">
      <img
        data-testid="thumbnail"
        alt=""
        src="https://via.placeholder.com/768x768.png?text=FPO+Text"
      />
      <Link
        to={`/details/${file.id}`}
        className="absolute bottom-0 left-0 p-2 bg-gradient-to-tr from-white to-transparent"
      >
        {file.name}
      </Link>
    </div>
  );
}

export default FileCard;
