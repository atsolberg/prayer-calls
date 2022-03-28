import React from "react";
import cx from "classnames";

const classes = ["text-sky-500", "hover:underline"];

const A = React.forwardRef((props, ref) => {
  const { children, className = "", as = "a", ...rest } = props;
  const Comp = as;
  return (
    <Comp ref={ref} className={cx(className, classes)} {...rest}>
      {children}
    </Comp>
  );
});
A.displayName = "A";

export default A;
