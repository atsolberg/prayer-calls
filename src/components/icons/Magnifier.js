import React from "react";
import cx from "classnames";

function Magnifier({ className, ...rest }) {
  return (
    <svg width="24" height="24" fill="none" className={cx(className)} {...rest}>
      <path
        d="m19 19-3.5-3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="11"
        cy="11"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Magnifier;
