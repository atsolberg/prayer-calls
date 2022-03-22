import React from "react";
import cx from "classnames";

const classes = ["text-sky-500", "dark:text-sky-400", "hover:underline"];

const A = React.forwardRef((props, ref) => {
  const { children, className = "", ...rest } = props;
  return (
    <a ref={ref} className={cx(className, classes)} {...rest}>
      {children}
    </a>
  );
});
A.displayName = "A";

export default A;
