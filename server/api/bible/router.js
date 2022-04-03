import express from "express";

import BibleCache from "../../db/bible";
import { bibles_versions } from "../../../src/util/constants";
import { entityTable } from "../../db/util";
import { getBibles, getVerse } from "./api.bible";
import { getNetVerse } from "./net";
import { getEsvVerse } from "./esv";
import { getBibleBrainVerse } from "./digital-bible";
import { handleApiError } from "./utils";

const router = express.Router();

function getVerseStrategy(bibleId) {
  switch (bibleId) {
    case "ESV": {
      return getEsvVerse;
    }
    case "NET": {
      return getNetVerse;
    }
    case "NAS": {
      return getBibleBrainVerse;
    }
    default: {
      return getVerse;
    }
  }
}

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
        bibles.push(
          {
            id: "NET",
            name: "New English Translation",
            abbr: "NET",
          },
          {
            id: "ESV",
            name: "English Standard Version",
            abbr: "ESV",
          },
          {
            id: "NAS",
            name: "New American Standard Bible",
            abbr: "NASB",
          }
        );

        // filter to shorter list
        if (filter) {
          const ids = bibles_versions.map((bv) => bv.id);
          bibles = bibles.filter((b) => ids.includes(b.id));
        }

        // sort by preferred versions
        bibles.sort((a, b) => {
          let ia = bibles_versions.findIndex((v) => v.id === a.id);
          let ib = bibles_versions.findIndex((v) => v.id === b.id);
          if (ia === -1) ia = 9999;
          if (ib === -1) ib = 9999;
          return ia - ib;
        });

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
      .catch((r2) => handleApiError("Error fetching bible", r2, res));
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
    const strategy = getVerseStrategy(bibleId);
    strategy(bibleId, verseId)
      .then((verse) => {
        BibleCache.setVerse(verse, verseId);
        res.send(BibleCache.getVerse(bibleId, verseId));
      })
      .catch((r2) => handleApiError("Error fetching verse", r2, res));
  }
});

export default router;
