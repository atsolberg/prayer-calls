import React, { useEffect } from "react";
import cx from "classnames";

import { useCalls } from "../../providers/CallsProvider";
import { getCallLineData } from "../../util/prayer-call";
import { months } from "../../util/constants";
import q from "../../util/element";

import { Link } from "react-router-dom";
import A from "../anchor/A";

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

function Hit({ line, term, onHide, onClick, highlight }) {
  const { text, textL = text.toLowerCase(), date, file } = line;
  const start = textL.indexOf(term);
  const end = start + term.length;
  const phrase = `${text.substring(
    0,
    start
  )}<span class="bg-sky-200 dark:bg-sky-500/25 p-0.5 rounded">${text.substring(
    start,
    end
  )}</span>${text.substring(end)}`;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      data-line={line.lineNum}
      className="hit pt-1 cursor-pointer"
      onClick={onClick}
    >
      <div
        className={cx(
          ["flex items-start justify-between", "text-sm", "p-1", "rounded-md"],
          { "bg-slate-700": highlight }
        )}
      >
        <span dangerouslySetInnerHTML={{ __html: phrase }} />
        <span className="whitespace-nowrap">
          <A as={Link} to={`/details/${file}`} onClick={onHide}>
            <span className="hidden sm:inline">{date}</span>
            <span className="sm:hidden">{abbrDate(date)}</span>
          </A>
        </span>
      </div>
    </div>
  );
}

function Line({ line, highlight }) {
  return (
    <div
      className={cx("px-1", "rounded-md", { "bg-sky-900": highlight })}
      data-line={line.lineNum}
      dangerouslySetInnerHTML={{ __html: line.html.innerHTML }}
    />
  );
}

function SearchResults({
  term,
  hits = [],
  onHide,
  highlight,
  setHighlight,
  refs,
}) {
  const calls = useCalls();

  const hit = hits[highlight] || {};
  const file = hit ? calls?.entities?.get(hit.file) : null;
  const lineNum = hit ? hit.lineNum : -1;

  const lines = file ? getCallLineData(file) : [];

  useEffect(() => {
    const preview = refs.preview.current;
    if (preview && lineNum !== -1) {
      const y = q.qs(preview, `[data-line="${lineNum}"]`)?.offsetTop;
      preview.scrollTo(0, Math.max(y - 60, 0));
    }
  }, [refs, lineNum]);

  return (
    <div>
      {/* HITS */}
      <div
        ref={refs.hits}
        className={cx([
          "relative",
          "my-5 px-2",
          "max-h-[30vh]",
          "sm:max-h-[150px]",
          "overflow-y-auto",
          "space-y-1",
          "divide-y",
          "divide-dashed",
          "divide-slate-300 dark:divide-slate-700",
        ])}
      >
        {hits.length ? (
          hits.map((h, i) => (
            <Hit
              key={lineKey(h)}
              line={h}
              term={term}
              onHide={onHide}
              highlight={highlight === i}
              onClick={() => setHighlight(i)}
            />
          ))
        ) : (
          <div className="text-sm">
            <i>No matching text found</i>
          </div>
        )}
      </div>

      {/* PREVIEW */}
      {file ? (
        <div
          ref={refs.preview}
          className={cx([
            "relative",
            "bg-slate-900",
            "border-t-4 border-slate-700",
            "mt-5 px-2 py-2",
            "space-y-1",
            "max-h-[30vh] sm:max-h-[250px]",
            "overflow-y-auto",
          ])}
        >
          {lines.map((l, i) => (
            <Line
              key={`${l.raw}-${i}`}
              line={l}
              highlight={l.lineNum === lineNum}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default SearchResults;
