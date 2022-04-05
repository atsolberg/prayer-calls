import React from "react";
import { convertMdToHtml } from "../../util/markdown";

function PrayerCallLine({ text, lineNum }) {
  const __html = convertMdToHtml(text).outerHTML;
  return <div data-line={lineNum} dangerouslySetInnerHTML={{ __html }} />;
}

export default PrayerCallLine;
