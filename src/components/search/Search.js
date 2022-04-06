import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";

import usePrevious from "../../hooks/usePrevious";
import { useCalls } from "../../providers/CallsProvider";
import { key_codes } from "../../util/constants";
import q from "../../util/element";

import Magnifier from "../icons/Magnifier";
import Button from "../button/Button";
import SearchResults from "./SearchResults";

function Search({ active, onHide, ...rest }) {
  const refs = useRef({
    input: useRef(),
    preview: useRef(),
    hits: useRef(),
  }).current;

  const [highlight, setHighlight] = useState(0);
  const [search, setSearch] = useState("");
  const prevActive = usePrevious(active);

  const term = (search || "").toLowerCase();
  const lines = useCalls()?.line_data || [];
  const length = term.trim().length > 2;
  const hits = length
    ? lines
        .filter((l) => !l.text.startsWith("#"))
        .filter((l) => l.text.toLowerCase().includes(term))
    : [];

  const files = hits.reduce((set, h) => {
    set.add(h.file);
    return set;
  }, new Set()).size;

  function onChange({ target: { value } }) {
    setHighlight(0); // first hit if any
    setSearch(value);
  }
  function onEsc({ keyCode }) {
    if (keyCode === 27 /* esc */) onHide();
  }
  function onUpDown(e) {
    const { keyCode } = e;
    if (keyCode === key_codes.up || keyCode === key_codes.down) {
      const up = keyCode === key_codes.up;
      const next = up
        ? Math.max(highlight - 1, 0)
        : Math.min(highlight + 1, hits.length - 1);
      setHighlight(next);

      const hitsContainer = refs.hits.current;
      const height = q.height(hitsContainer);
      const highlighted = q.qs(hitsContainer, `.hit:nth-child(${next + 1})`);
      const top = highlighted?.offsetTop;
      if (!up && top + 15 > height) {
        const nextTop = top - height + q.outerHeight(highlighted) + 2;
        hitsContainer.scrollTo({ top: nextTop, left: 0, behavior: "smooth" });
      }
      if (up && top < hitsContainer.scrollTop) {
        hitsContainer.scrollTo({ top, left: 0, behavior: "smooth" });
      }
    }
  }

  // Auto-focus on activation
  useEffect(() => {
    if (!prevActive && active) refs.input.current.focus();
  }, [active, prevActive, refs.input]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cx([
        "absolute",
        "top-full",
        "rounded-b-lg",
        "overflow-hidden",
        "bg-slate-200 dark:bg-slate-800",
        "mx-auto w-11/12 lg:w-5/12",
        "border",
        "border-slate-300 dark:border-slate-50/[0.1]",
        "left-1/2",
        "-translate-x-1/2",
        { hidden: !active },
      ])}
      onKeyDown={onUpDown}
      {...rest}
    >
      <div className="p-2 flex items-center justify-between">
        <div>
          <span className="text-md font-semibold">Find Text in Calls</span>{" "}
          <span className={cx("text-xs", { hidden: !length })}>
            - <b>{hits.length}</b> matches on <b>{files}</b> dates
          </span>
        </div>
        <Button size="xs" theme="secondary" upper={false} onClick={onHide}>
          <span className="hidden sm:inline">esc</span>
          <span className="sm:hidden">x</span>
        </Button>
      </div>

      <div
        className={cx([
          "mb-3",
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
            "bg-slate-300 dark:bg-slate-700 dark:highlight-white/5",
          ])}
        >
          <span className="sr-only">Search for text</span>

          <Magnifier />

          <input
            ref={refs.input}
            className={cx([
              "w-full",
              "focus-visible:outline-0 dark:focus-visible:outline-0",
              "text-sm",
              "leading-6",
              "text-slate-500 dark:text-slate-400",
              "bg-slate-300 dark:bg-slate-700 dark:highlight-white/5",
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

      <SearchResults
        term={term}
        hits={hits}
        onHide={onHide}
        highlight={highlight}
        setHighlight={setHighlight}
        refs={refs}
      />
    </div>
  );
}

export default Search;
