import React from "react";
import { useSelect } from "downshift";
import cx from "classnames";
import {
  any,
  arrayOf,
  bool,
  func,
  node,
  string,
  oneOfType,
  oneOf,
  shape,
} from "prop-types";

const DropdownMenuItem_propTypes = {
  item: any,
  selected: bool.isRequired,
  highlighted: bool.isRequired,
};
const DropdownMenuItem = React.forwardRef((props, ref) => {
  const { children, selected, highlighted, ...rest } = props;
  return (
    <li
      ref={ref}
      className={cx(
        [
          "block",
          "whitespace-nowrap",
          "cursor-pointer",
          "px-3",
          "py-2",
          "border-1",
          "border-b",
          "border-slate-700",
          "last:border-b-0",
          "hover:text-slate-900",
          "hover:dark:text-white",
        ],
        { "bg-slate-50 dark:bg-slate-600/30": highlighted },
        { "text-sky-500": selected }
      )}
      {...rest}
    >
      {children}
    </li>
  );
});
DropdownMenuItem.propTypes = DropdownMenuItem_propTypes;
DropdownMenuItem.displayName = "DropdownMenuItem";

const dfs = {
  label: "Choose an element:",
  drop: "left",
  size: "md",
  labeler: ({ item }) => item,
  valuer: (item) => (item ? String(item) : ""),
  onSelect: () => {},
  border: true,
  overrides: { button: [], menu: [] },
  Item: DropdownMenuItem,
};
const DrowpdownPropTypes = {
  initial: any, // initially selected item
  items: arrayOf(any).isRequired,
  label: string, // sr only text
  placeholder: string, // button text when nothing selected
  onSelect: func, // fire on selection change
  labeler: func, // used to render button text, receives the selected item
  Item: oneOfType([node, func]), // Component to render an list item, receives item, selected, first, last as props
  drop: oneOf(["left" /* default */, "right"]),
  size: oneOf(["sm", "md" /* default */, "lg"]),
  overrides: shape({ button: any, menu: any }), // class list overrides
};
const Dropdown = React.forwardRef((props, ref) => {
  const { placeholder = "Select an item...", label = dfs.label } = props;
  const { overrides = dfs.overrides, size = dfs.size } = props;
  const { items, onSelect = dfs.onSelect, drop = dfs.drop } = props;
  const { labeler = dfs.labeler, valuer = dfs.valuer } = props;
  const { initial, Item = dfs.Item, className } = props;
  const classes = { ...dfs.overrides, ...overrides };

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    ...(initial ? { initialSelectedItem: initial } : {}),
    onSelectedItemChange: onSelect,
    itemToString: valuer,
  });

  return (
    <div ref={ref} className={cx("dropdown inline-block relative", className)}>
      <label className="sr-only" {...getLabelProps()}>
        {label}
      </label>

      <button
        type="button"
        className={cx(
          [
            "leading-5",
            "font-semibold",
            "bg-slate-400/10",
            "rounded-full",
            "flex",
            "items-center",
            "space-x-2",
            "hover:bg-slate-400/20",
            "dark:highlight-white/5",
          ],
          {
            "text-xs px-3 py-1": size === "sm",
            "text-md px-3 py-2": size === "md",
            "text-lg px-4 py-3": size === "lg",
          },
          classes.button
        )}
        {...getToggleButtonProps()}
      >
        <span className="mr-1">
          {selectedItem
            ? labeler({ item: selectedItem, ctx: "button" })
            : placeholder}
        </span>
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>

      <ul
        className={cx(
          [
            "dropdown-menu",
            "absolute",
            "top-full",
            "overflow-hidden",
            "text-gray-600 dark:text-gray-400",
            "font-semibold",
            "mt-1",
            "rounded-md",
            "bg-slate-50 dark:bg-slate-800",
            "ring-1",
            "ring-slate-400 dark:ring-slate-700",
          ],
          { hidden: !isOpen, "right-0": drop === "right" },
          classes.menu
        )}
        {...getMenuProps()}
      >
        {items.map((item, index) => (
          <Item
            key={`${item}${index}`}
            item={item}
            selected={valuer(item) === valuer(selectedItem)}
            highlighted={highlightedIndex === index}
            {...getItemProps({ item, index })}
          >
            {labeler({ item, ctx: "menu" })}
          </Item>
        ))}
      </ul>
    </div>
  );
});
Dropdown.propTypes = DrowpdownPropTypes;
Dropdown.displayName = "Dropdown";

export default Dropdown;
