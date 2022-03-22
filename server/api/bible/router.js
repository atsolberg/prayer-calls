import express from "express";
import axios from "axios";
import BibleCache from "../../db/bible";

const router = express.Router();
const base = "https://api.scripture.api.bible/v1";

// https://scripture.api.bible/admin
const API_KEY = "696aaf815b655732b79bcba7e67311b2";
const config = { headers: { "api-key": API_KEY } };

// Get Bibles
router.get("/bibles", (req, res) => {
  const bibles = BibleCache.getBibles();
  if (bibles?.allIds?.length) {
    res.send(bibles);
  } else {
    axios
      .get(`${base}/bibles`, { ...config, params: { language: "eng" } })
      .then((response) => {
        const bibles = response.data.data;
        BibleCache.setBibles(bibles);
        res.send(BibleCache.getBibles());
      })
      .catch((response) => {
        res.status(response.status);
        res.send(response.data);
      });
  }
});

// Get books for a bible edition
router.get("/:bible/books", (req, res) => {
  const bibleId = req.params.bible;
  const books = BibleCache.getBooks(bibleId);
  if (books?.length) {
    res.send(books);
  } else {
    axios
      .get(`${base}/bibles/${bibleId}/books`, config)
      .then((response) => {
        const books = response.data.data;
        BibleCache.setBooks(books);
        res.send(BibleCache.getBooks(bibleId));
      })
      .catch((response) => {
        res.status(response.status);
        res.send(response.data);
      });
  }
});

// Get a specific verse of a bible edition
router.get("/:bible/verse/:id", (req, res) => {
  const verseId = req.params.id;
  const bibleId = req.params.bible;
  const isRange = verseId.includes("-");

  const verse = BibleCache.getVerse(bibleId, verseId);
  if (verse) {
    res.send(verse);
  } else {
    axios
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
        BibleCache.setVerse(verse, verseId);
        res.send(BibleCache.getVerse(bibleId, verseId));
      })
      .catch((response) => {
        console.log("error getting verse", response);
        res.status(response.status);
        res.send(response.data);
      });
  }
});

export default router;
