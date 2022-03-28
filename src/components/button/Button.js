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

/**
 * When you just need an unstyled button
 */
export const Btn = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <button ref={ref} type="button" {...rest}>
      {children}
    </button>
  );
});
Btn.displayName = "Btn";

export default Button;
