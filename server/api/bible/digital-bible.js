import axios from "axios";
import {
  bibles_versions,
  books,
  copyright_info,
} from "../../../src/util/constants";

/**
 * Api module to get scriptures from the digital bible api
 * @see https://www.faithcomesbyhearing.com/bible-brain/api-reference
 */

const base = "https://b4.dbt.io/api/bibles/filesets";
const API_KEY = "7f89799e-37f0-4d1f-8c05-4d1b4d1b4104";

/**
 * Returns the chapter and verse values for a verseId part.
 * i.e. getChapterAndVerse('GEN.2.4') -> { c: '2', v: '4' }
 * @param {string} part - i.e. "GEN.2.4"
 * @return {{ c: number, v: number }} i.e. { c: 2, v: 4 }
 */
function getChapterAndVerse(part) {
  const ld = part.lastIndexOf(".");
  const chapter = part.substring(4, ld);
  const verse = part.substring(ld + 1);
  return { c: chapter, v: verse };
}

/**
 * Rerturns the start and end verse params
 * @param {string} verseId - i.e. "GEN.1.1", or "GEN.1.1-GEN.1.4"
 * @return {{
 *   book: {string},
 *   chapter: {number},
 *   verse_end: {number},
 *   verse_start: {number}
 * }}
 */
function getVerseParam(verseId) {
  const parts = verseId.split("-");
  const first = parts[0];
  const book = books.find((b) => b.id === first.substring(0, 3));
  const { c, v } = getChapterAndVerse(first);
  const verse_start = v;
  let verse_end = verse_start;

  const isRange = parts.length === 2;
  if (isRange) {
    const { v } = getChapterAndVerse(parts[1]);
    verse_end = v;
  }

  return { book: book.id, chapter: c, verse_start, verse_end };
}

/**
 * Get a verse from the api.esv.org api
 * @param {string} bibleId - i.e. "NAS"
 * @param {string} verseId - i.e. "GEN.1.1-GEN.1.4"
 * @returns {Promise<Verse>}
 */
export function getBibleBrainVerse(bibleId, verseId) {
  const { book, chapter, verse_start, verse_end } = getVerseParam(verseId);
  const bible = bibles_versions.find((bv) => bv.id === bibleId);

  let url = `${base}/ENG${bibleId}/${book}/${chapter}`;
  let params = {
    key: API_KEY,
    v: "4",
    verse_start,
    verse_end,
  };

  return axios.get(url, { params: params }).then((response) => {
    const verses = response.data.data;
    const isRange = verses.length > 1;

    const content = verses.reduce((html, v) => {
      if (isRange) html += `<b>${v.verse_start}</b>&nbsp;`;
      html += `<span>${v.verse_text.replaceAll("``", '"')}</span>&nbsp;`;
      return html;
    }, "");

    return {
      id: verseId,
      bibleId: bibleId,
      content,
      copyright: {
        href: "",
        hover: copyright_info[bible.id].copy,
        text: bible.abbr,
      },
    };
  });
}
