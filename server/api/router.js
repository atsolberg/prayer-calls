import express from "express";
import { getFileDirectory } from "../db/util";

const router = express.Router();
const files = getFileDirectory();

// https://scripture.api.bible/admin
const API_KEY = "696aaf815b655732b79bcba7e67311b2";

// Get All
router.get("/", (req, res) => {
  res.send({ files });
});

// Get One
router.get("/:id", (req, res) => {
  const file = files.byId[req.params.id];
  if (!file) res.sendStatus(404);
  else res.send({ file });
});

// Create One
router.post("/:id", (req, res) => {
  res.send({ message: "post ok", id: req.params.id });
});

// Update One
router.put("/:id", (req, res) => {
  res.send({ message: "put ok", id: req.params.id });
});

// Delete One
router.delete("/:id", (req, res) => {
  res.send({ message: "delete ok", id: req.params.id });
});

export default router;
