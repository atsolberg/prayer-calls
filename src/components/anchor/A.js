import React from "react";
import cx from "classnames";
import { bool } from "prop-types";

const classes = ["text-sky-500", "hover:underline"];

const A = React.forwardRef((props, ref) => {
  const { external, children, className = "", as = "a", ...rest } = props;
  const Comp = as;
  return (
    <Comp ref={ref} className={cx(className, classes)} {...rest}>
      {children}
      {external ? (
        <i className="fa-solid fa-xs fa-arrow-up-right-from-square ml-1" />
      ) : null}
    </Comp>
  );
});
A.displayName = "A";
A.propTypes = {
  external: bool, // if true, adds an external link icon after the content
};

export default A;
