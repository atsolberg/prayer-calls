import axios from "axios";
import { books } from "../../../src/util/constants";

const base = "http://labs.bible.org/api";
// const base = "http://labs.bible.org/api/?passage=John+3:16-17"

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
 * Return a specific verse or passage from the bible.org api
 * @param {string} verseId - i.e. 'GEN.1.1' or 'GEN.2.4-GEN.2.10'
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
        copyright: "Copyright ©1996-2020 Bible.org",
      };
    });
}
