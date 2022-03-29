import { useEffect, useState } from "react";
import { css } from "@emotion/react";

import { convertMdToHtml } from "../../util/markdown";
import { books } from "../../util/constants";
import { getVerse } from "../../util/api";
import { useBibles } from "../../providers/BiblesProvider";

import A from "../anchor/A";

const vStyles = css`
  max-width: 500px;
  .v,
  b {
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

function Verse(props) {
  const [bibleId] = useBibles();
  const verse = props.verse.replace(/_/g, "");
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

  useEffect(() => {
    if (!book) {
      console.log("Invalid book name", name);
    } else {
      getVerse(bibleId, verseId)
        .then((resp) => setScripture(resp.content))
        .catch((err) => {
          console.log(`Error fetching verse id "${verseId}"`, err);
        });
    }
  }, [bibleId, book, name, verseId]);

  return (
    <div className="verse">
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
        dangerouslySetInnerHTML={{ __html: scripture }}
      />
    </div>
  );
}

function PrayerCall({ content }) {
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div className="space-y-1">
      {lines.map((l, i) => {
        const key = `${l}-${i}`;
        return l.startsWith("_") ? (
          <Verse key={key} verse={l} />
        ) : (
          <div
            key={key}
            dangerouslySetInnerHTML={{ __html: convertMdToHtml(l).outerHTML }}
          />
        );
      })}
    </div>
  );
}

export default PrayerCall;
