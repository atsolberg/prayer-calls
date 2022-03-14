import cx from "classnames";

const classes = [
  "focus:ring-2",
  "focus:ring-blue-500",
  "focus:outline-none",
  "appearance-none",
  "text-sm",
  "leading-6",
  "text-slate-900",
  "placeholder-slate-400",
  "rounded-md",
  "py-2",
  "px-4",
  "ring-1",
  "ring-slate-200",
  "shadow-sm",
  "disabled:opacity-50",
];

function Input({ className = "", ...rest }) {
  return (
    <input
      className={cx(classes, className)}
      type="text"
      aria-label="Filter projects"
      placeholder="Filter projects..."
      {...rest}
    />
  );
}

export default Input;
