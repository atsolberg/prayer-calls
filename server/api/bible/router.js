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
    return bibles;
  } else {
    console.log("fetching bibles");
    axios
      .get(`${base}/bibles`, config)
      .then((response) => {
        const bibles = response.data.data;
        BibleCache.setBibles(bibles);
        res.send(bibles);
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
    console.log("fetching books");
    axios
      .get(`${base}/bibles/${bibleId}/books`)
      .then((response) => {
        const books = response.data.data;
        BibleCache.setBooks(books);
        res.send(books);
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

  const verse = BibleCache.getVerse(bibleId, verseId);
  if (verse) {
    res.send(verse);
  } else {
    console.log("fetching verse");
    axios
      .get(
        `${base}/bibles/${bibleId}/verses/${verseId}`,
        Object.assign({}, config, {
          "include-chapter-numbers": "false",
          "include-verse-numbers": "false",
        })
      )
      .then((response) => {
        const verse = response.data.data;
        BibleCache.setVerse(verse);
        res.send(verse);
      })
      .catch((response) => {
        res.status(response.status);
        res.send(response.data);
      });
  }
});

export default router;
