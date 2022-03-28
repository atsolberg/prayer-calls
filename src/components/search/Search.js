import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";

import usePrevious from "../../hooks/usePrevious";
import { useCalls } from "../../providers/CallsProvider";
import { months } from "../../util/constants";

import A from "../anchor/A";
import Magnifier from "../icons/Magnifier";
import { Link } from "react-router-dom";
import Button from "../button/Button";

function lineKey(l) {
  return `${l.timestamp}-${l.lineNum}`;
}
function abbrDate(date) {
  let abbr = date;
  months.forEach((m) => {
    abbr = abbr.replace(m.name, m.abbr);
  });
  return abbr;
}

function Hit({ line, term }) {
  const { text, textL = text.toLowerCase(), date, file } = line;
  const start = textL.indexOf(term);
  const end = start + term.length;
  const phrase = `${text.substring(
    0,
    start
  )}<span class="bg-sky-200 dark:bg-sky-900/75 p-0.5 rounded">${text.substring(
    start,
    end
  )}</span>${text.substring(end)}`;

  return (
    <div
      className={cx([
        "flex items-start justify-between",
        "pt-1",
        "border-1",
        "border-t",
        "border-slate-300 dark:border-slate-700",
        "first:border-t-0",
      ])}
    >
      <span dangerouslySetInnerHTML={{ __html: phrase }} />
      <span className="whitespace-nowrap">
        <A as={Link} to={`/details/${file}`}>
          <span className="hidden sm:inline">{date}</span>
          <span className="sm:hidden">{abbrDate(date)}</span>
        </A>
      </span>
    </div>
  );
}

function Results({ term, hits }) {
  return (
    <div className="my-5 px-2 max-h-[60vh] sm:max-h-[350px] overflow-y-auto space-y-1">
      {hits.length ? (
        hits.map((h) => <Hit key={lineKey(h)} line={h} term={term} />)
      ) : (
        <div className="text-sm">
          <i>No matching text found</i>
        </div>
      )}
    </div>
  );
}

function Search({ active, onHide, ...rest }) {
  const inputRef = useRef();

  const [search, setSearch] = useState("");
  const prevActive = usePrevious(active);

  const term = (search || "").toLowerCase();
  const lines = useCalls()?.line_data || [];
  const length = term.trim().length > 2;
  const hits = length
    ? lines.filter((l) => l.text.toLowerCase().includes(term))
    : [];
  const files = hits.reduce((set, h) => {
    set.add(h.file);
    return set;
  }, new Set()).size;

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
        "bg-slate-200 dark:bg-slate-800",
        "mx-auto w-11/12 lg:w-7/12",
        "border",
        "border-slate-300 dark:border-slate-50/[0.1]",
        "left-1/2",
        "-translate-x-1/2",
        { hidden: !active },
      ])}
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
            ref={inputRef}
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

      <Results term={term} hits={hits} />
    </div>
  );
}

export default Search;
