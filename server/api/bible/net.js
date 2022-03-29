import axios from "axios";
import { books } from "../../../src/util/constants";

const base = "http://labs.bible.org/api";

/**
 * Returns the chapter and verse values for a verseId part.
 * i.e. getChapterAndVerse('GEN.2.4') -> { c: '2', v: '4' }
 * @param {string} part - i.e. "GEN.2.4"
 */
function getChapterAndVerse(part) {
  const ld = part.lastIndexOf(".");
  const chapter = part.substring(4, ld);
  const verse = part.substring(ld + 1);
  return { c: chapter, v: verse };
}

function getVerseParam(verseId) {
  const parts = verseId.split("-");
  const first = parts[0];
  const book = books.find((b) => b.id === first.substring(0, 3));
  const { c, v } = getChapterAndVerse(first);

  const isRange = parts.length === 2;
  let verseParam = `${book.name}+${c}:${v}`;

  if (isRange) {
    const { c, v } = getChapterAndVerse(parts[1]);
    verseParam = `${verseParam}-${c}:${v}`;
  }

  return verseParam;
}

/**
 * Get a verse from the labs.bible.org/api api
 * @param {string} bibleId - i.e. "NET"
 * @param {string} verseId - i.e. "GEN.1.1-GEN.1.4"
 * @returns {Promise<Verse>}
 */
export function getNetVerse(bibleId, verseId) {
  const verseParam = getVerseParam(verseId);

  return axios
    .get(`${base}`, { params: { passage: verseParam } })
    .then((response) => {
      const verse = response.data;
      return {
        id: verseId,
        bibleId: bibleId,
        content: verse,
        copyright: {
          href: "http://www.bible.org",
          hover: "Copyright ©1996-2022 Bible.org",
          text: "NET",
        },
      };
    });
}
