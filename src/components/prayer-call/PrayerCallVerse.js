import React, { useContext, useEffect, useState } from "react";
import { css } from "@emotion/react";
import cx from "classnames";

import { useBibles } from "../../providers/BiblesProvider";
import { books } from "../../util/constants";
import { getVerse } from "../../util/api";
import { truncate } from "../../util/string";

import A from "../anchor/A";
import Button from "../button/Button";
import PcCtx from "./context";

const vStyles = css`
  max-width: 500px;
  .v, // scripture.api.bible
  .verse-num, // api.esv.org
  b {
    // bible.org (NET)
    font-weight: bold;

    // super script
    top: -0.5em;
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  .v {
    margin-right: 5px;
  }
`;

function PrayerCallVerse({ text, lineNum }) {
  const [bibleId] = useBibles();
  const [setModalOpen, setModalCopy] = useContext(PcCtx);

  const verse = text.replace(/_/g, "");
  const [scripture, setScripture] = useState("");
  const isRange = verse.includes("-");
  const end = verse.lastIndexOf(" ");
  const name = verse.substring(0, end).trim();
  const colon = verse.indexOf(":");
  const chapter = verse.substring(end, colon).trim();
  const book = books.find((b) => b.name === name);
  const v = verse.substring(
    colon + 1,
    isRange ? verse.indexOf("-") : undefined
  );
  let verseId = `${book?.id}.${chapter}.${v}`;
  if (isRange) {
    const lv = verse.substring(verse.indexOf("-") + 1);
    verseId = `${verseId}-${book?.id}.${chapter}.${lv}`;
  }

  const copyrightProps = {};
  let copyrightClick = false;
  if (scripture?.copyright?.href) {
    copyrightClick = true;
    copyrightProps.href = scripture.copyright.href;
    copyrightProps.target = "_blank";
    copyrightProps.rel = "noreferrer";
  }
  const truncated = scripture?.copyright?.hover?.length > 120;
  if (!scripture?.copyright?.href && truncated) {
    copyrightClick = true;
    copyrightProps.onClick = () => {
      setModalCopy(scripture.copyright.hover);
      setModalOpen(true);
    };
  }

  // Fetch verse from api
  useEffect(() => {
    if (!book) {
      console.log("Invalid book name", name);
    } else {
      getVerse(bibleId, verseId)
        .then((resp) => setScripture(resp))
        .catch((err) => {
          console.log(`Error fetching verse id "${verseId}"`, err);
        });
    }
  }, [bibleId, book, name, verseId]);

  return (
    <div data-line={lineNum} className="verse">
      <p className="py-1">
        <A
          href={`https://my.bible.com/bible/1/${book?.id}.${chapter}.KJV`}
          className="text-sky-500"
          target="_blank"
          rel="noreferrer"
        >
          {verse}
        </A>
      </p>
      <blockquote
        css={vStyles}
        className="m-2 p-4 inset-0 bg-slate-300/25 dark:bg-slate-700/25 rounded"
      >
        <div dangerouslySetInnerHTML={{ __html: scripture.content }} />
        {scripture ? (
          <div className="text-right mt-1">
            <Button
              size="xs"
              theme="secondary"
              className={cx("relative group", {
                "cursor-auto": !copyrightClick,
              })}
              {...copyrightProps}
            >
              {scripture.copyright.text}
              <div
                className={cx([
                  "hidden",
                  "group-hover:block",
                  "absolute",
                  "top-[82%]",
                  "right-[-1px]",
                  "bg-slate-300 dark:bg-slate-700",
                  "p-1",
                  "rounded",
                  "text-xs",
                  "text-left",
                  "normal-case",
                  {
                    "whitespace-nowrap": scripture.copyright.hover.length < 50,
                    "min-w-[275px]": truncated,
                  },
                ])}
              >
                {truncate(scripture.copyright.hover, 120)}
              </div>
            </Button>
          </div>
        ) : null}
      </blockquote>
    </div>
  );
}

export default PrayerCallVerse;
