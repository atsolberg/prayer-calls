import { useEffect, useState } from "react";
import { css } from "@emotion/react";

import { convertMdToHtml } from "../../util/markdown";
import { books } from "../../util/constants";
import { getVerse } from "../../util/api";
import { useBibles } from "../../providers/BiblesProvider";

const vStyles = css`
  max-width: 500px;
  .v {
    margin-right: 5px;
    font-weight: bold;

    // super script
    top: -0.5em;
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
`;

function Verse(props) {
  const [bibleId] = useBibles();
  const verse = props.verse.replace(/_/g, "");
  const [scripture, setScripture] = useState("");

  useEffect(() => {
    const isRange = verse.includes("-");
    const end = verse.lastIndexOf(" ");
    const name = verse.substring(0, end).trim();
    const colon = verse.indexOf(":");
    const chapter = verse.substring(end, colon).trim();
    const v = verse.substring(
      colon + 1,
      isRange ? verse.indexOf("-") : undefined
    );
    const book = books.find((b) => b.name === name);
    if (!book) {
      console.log("Invalid book name", name);
    } else {
      let verseId = `${book.id}.${chapter}.${v}`;
      if (isRange) {
        const lv = verse.substring(verse.indexOf("-") + 1);
        verseId = `${verseId}-${book.id}.${chapter}.${lv}`;
      }
      getVerse(bibleId, verseId)
        .then((resp) => {
          setScripture(resp.content);
        })
        .catch((err) => {
          console.log(`Error fetching verse id "${verseId}"`, err);
        });
    }
  }, [bibleId, verse]);

  return (
    <div className="verse">
      <div className="verse text-sky-500 dark:text-sky-400 py-1">{verse}</div>
      <blockquote
        css={vStyles}
        className="m-2 p-4 inset-0 dark:bg-slate-700/25 rounded"
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
    <div>
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
