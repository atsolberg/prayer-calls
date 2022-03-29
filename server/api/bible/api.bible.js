import axios from "axios";

/**
 * Api module for https://docs.api.bible/
 */

const base = "https://api.scripture.api.bible/v1";
// https://scripture.api.bible/admin
const API_KEY = "696aaf815b655732b79bcba7e67311b2";
const config = { headers: { "api-key": API_KEY } };

function cleanNames(bibles) {
  bibles.forEach(
    (b) => (b.nameLocal = b.nameLocal.replace("The Holy Bible, ", ""))
  );
}

/**
 * Return a list of bibles from the api.bible api
 * @returns {Promise<AxiosResponse<EntityTable<Bible>>>}
 */
export function getBibles() {
  return axios
    .get(`${base}/bibles`, { ...config, params: { language: "eng" } })
    .then((response) => {
      const bibles = response.data.data;
      cleanNames(bibles);

      return bibles.map((b) => ({
        id: b.id,
        name: b.nameLocal,
        abbr: b.abbreviationLocal,
      }));
    });
}

export function getVerse(bibleId, verseId) {
  const isRange = verseId.includes("-");

  return axios
    .get(
      `${base}/bibles/${bibleId}/verses/${verseId}`,
      Object.assign({}, config, {
        params: {
          "include-chapter-numbers": false,
          "include-verse-numbers": isRange,
        },
      })
    )
    .then((response) => {
      const verse = response.data.data;
      return {
        id: verseId,
        bibleId: verse.bibleId,
        content: verse.content,
        copyright: verse.copyright,
      };
    });
}
