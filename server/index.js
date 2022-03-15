import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import fs from "fs";

import api_router from "./api/router";
import App from "../src/App";

const PORT = process.env.PORT || 3000;
const html = fs.readFileSync("dist/frontend/index.html").toString();
const parts = html.split("not rendered");

const app = express();

app.disable("x-powered-by");

// Static resources
app.use("/frontend", express.static("dist/frontend"));

// Add middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// API routes
app.use("/api/files", api_router);

// HTML routes
app.use((req, res) => {
  res.write(parts[0]);
  const reactMarkup = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`\nlistening on http://localhost:${PORT}`);
});
