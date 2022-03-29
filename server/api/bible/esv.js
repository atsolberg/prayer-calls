import axios from "axios";
import { books } from "../../../src/util/constants";

/**
 * Api module to get scriptures from the api.esv.org api
 */

const base = "https://api.esv.org/v3/passage/html";
const API_KEY = "5d9179a576acd215a5f53a4d3af97c977570ed46";
const config = {
  headers: { Authorization: `Token ${API_KEY}` },
  params: {
    "include-passage-references": false,
    "include-headings": false,
    "include-footnotes": false,
    "include-chapter-numbers": false,
    "include-subheadings": false,
    "include-audio-link": false,
    "include-short-copyright": false,
  },
};

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
 * Get a verse from the api.esv.org api
 * @param {string} bibleId - i.e. "ESV"
 * @param {string} verseId - i.e. "GEN.1.1-GEN.1.4"
 * @returns {Promise<Verse>}
 */
export function getEsvVerse(bibleId, verseId) {
  const isRange = verseId.includes("-");

  const esv_config = { ...config };
  esv_config.params = {
    ...esv_config.params,
    ...{
      "include-verse-numbers": isRange,
      q: getVerseParam(verseId),
    },
  };

  return axios.get(`${base}`, esv_config).then((response) => {
    const verse = response.data;
    return {
      id: verseId,
      bibleId: bibleId,
      content: verse.passages[0],
      copyright: {
        href: "http://www.esv.org",
        hover: "Copyright ©2022 esv.org",
        text: "ESV",
      },
    };
  });
}
