import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";
import Magnifier from "../icons/Magnifier";
import usePrevious from "../../hooks/usePrevious";
import { useCalls } from "../../providers/CallsProvider";

function Search({ active, onHide, ...rest }) {
  const inputRef = useRef();

  const calls = useCalls();
  const [search, setSearch] = useState("");
  const prevActive = usePrevious(active);

  const onChange = ({ target: { value } }) => setSearch(value);
  const onEsc = ({ keyCode }) => keyCode === 27 /* esc */ && onHide();

  // Auto-focus on activation
  useEffect(() => {
    if (!prevActive && active) inputRef.current.focus();
  }, [active, prevActive]);

  return (
    <div
      className={cx([
        "absolute",
        "top-full",
        "rounded-b",
        "bg-gray-200 dark:bg-slate-900",
        "mx-auto w-11/12 lg:w-7/12",
        "border",
        "border-slate-300 dark:border-slate-50/[0.1]",
        "left-1/2",
        "-translate-x-1/2",
        { hidden: !active },
      ])}
      {...rest}
    >
      <div
        className={cx([
          "my-3",
          "border-1",
          "dark:border-slate-50/[0.1]",
          "border-y",
        ])}
      >
        <label
          htmlFor="search-q"
          className={cx([
            "flex items-center",
            "space-x-2",
            "dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700",
          ])}
        >
          <span className="sr-only">Search for text</span>

          <Magnifier />

          <input
            ref={inputRef}
            className={cx([
              "w-full",
              "focus-visible:outline-0 dark:focus-visible:outline-0",
              "text-sm",
              "leading-6",
              "text-slate-400",
              "dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700",
              "py-1.5 pl-2 pr-3",
            ])}
            id="search-q"
            value={search}
            placeholder="search for text..."
            onChange={onChange}
            onKeyDown={onEsc}
          />
        </label>
      </div>

      <div className="my-5 px-2">Results</div>
    </div>
  );
}

export default Search;
