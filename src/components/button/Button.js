import React from "react";
import cx from "classnames";

const classes = [
  "text-sm",
  "px-3",
  "py-1",
  "uppercase",
  "font-bold",
  "rounded",
  "border",
  "border-slate-500",
];

const Button = React.forwardRef((props, ref) => {
  const { children, className = "", ...rest } = props;
  return (
    <button
      ref={ref}
      type="button"
      className={cx(className, classes)}
      {...rest}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

export default Button;
