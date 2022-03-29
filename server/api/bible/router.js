import express from "express";
import BibleCache from "../../db/bible";
import { bibles_versions } from "../../../src/util/constants";
import { entityTable } from "../../db/util";
import { getBibles, getVerse } from "./api.bible";
import { getNetVerse } from "./net";

const router = express.Router();

// Get Bibles
router.get("/bibles", (req, res) => {
  const filter = Object.hasOwn(req.query, "filter");
  const uncached = Object.hasOwn(req.query, "uncached");

  const bibles = BibleCache.getBibles();

  if (!uncached && bibles?.allIds?.length) {
    res.send(bibles);
  } else {
    getBibles()
      .then((bibles) => {
        // Add other bibles we don't get from http://scripture.api.bible
        bibles.push({
          id: "NET",
          name: "New English Translation",
          abbr: "NET",
        });

        if (filter) {
          const ids = bibles_versions.map((bv) => bv.id);
          bibles = bibles.filter((b) => ids.includes(b.id));
        }
        if (uncached) {
          const table = entityTable();
          bibles.forEach((b) => {
            table.allIds.push(b.id);
            table.byId[b.id] = b;
          });
          res.send(table);
        } else {
          BibleCache.setBibles(bibles);
          res.send(BibleCache.getBibles());
        }
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
    const isNet = bibleId === "NET";
    const p = isNet
      ? getNetVerse(bibleId, verseId)
      : getVerse(bibleId, verseId);

    p.then((verse) => {
      BibleCache.setVerse(verse, verseId);
      res.send(BibleCache.getVerse(bibleId, verseId));
    }).catch((response) => {
      console.log("error getting verse", response);
      res.status(response.status);
      res.send(response.data);
    });
  }
});

export default router;
