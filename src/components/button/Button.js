import React from "react";
import cx from "classnames";
import { bool, oneOf } from "prop-types";

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

const sizes = {
  xs: ["text-xs", "px-1", "py-0.5"],
  sm: ["text-sm", "px-2", "py-1"],
  md: ["text-md", "px-3", "py-1"],
  lg: ["text-lg", "px-4", "py-2"],
};
const themes = {
  primary: ["text-white", "bg-sky-500", "border-sky-500"],
  secondary: [
    "text-slate-600 dark:text-slate-400",
    "bg-slate-300 border-slate-300",
    "dark:bg-slate-700 dark:border-slate-700",
  ],
  outline: ["bg-transparent", "border-slate-500"],
  hover: [
    "bg-tranparent",
    "border-transparent",
    "text-sky-500 dark:text-white",
    "hover:bg-sky-500",
    "hover:border-sky-500",
    "hover:text-white dark:text-white",
  ],
};

const propTypes = {
  theme: oneOf(Object.keys(themes)),
  size: oneOf(Object.keys(sizes)),
  pill: bool,
};
const Button = React.forwardRef((props, ref) => {
  const {
    children,
    className = "",
    size = "sm",
    theme = "primary",
    upper = true,
    pill = false,
    bold = true,
    ...rest
  } = props;

  const classes = ["border", pill ? "rounded-full" : "rounded"];
  if (bold) classes.push("font-bold");
  if (upper) classes.push("uppercase");
  classes.push(themes[theme], sizes[size]);

  const Comp = rest.href ? "a" : Btn;

  return (
    <Comp ref={ref} className={cx(className, classes)} {...rest}>
      {children}
    </Comp>
  );
});
Button.displayName = "Button";
Button.propTypes = propTypes;

export default Button;
