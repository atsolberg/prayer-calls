import { formatFileDate } from "./date";
import { convertMdToHtml } from "./markdown";

/**
 * Takes a call file and returns the line data.
 * @param {CallFile} call
 * @return {LineData[]}
 */
export function getCallLineData(call) {
  const lines = call.contents
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean) // reject empties
    .map((l, i) => ({
      file: call.id,
      date: formatFileDate(call.name),
      timestamp: new Date(call.name).getTime(),
      strong: l.startsWith("**"),
      verse: l.startsWith("_"),
      lineNum: i + 1,
      raw: l,
      text: l.replaceAll("*", "").replaceAll("_", ""),
      html: convertMdToHtml(l),
    }));

  return lines;
}

/**
 * Returns the {EntityTable} with `line_data` added to it
 * @param {Object} table
 * @param {EntityTable<CallFile>} table.entities
 * @return {LineData[]}
 */
export function indexCallText(table) {
  let line_data = [];

  table.entities.all().forEach((call) => {
    const lines = getCallLineData(call);
    line_data = [...line_data, ...lines];
  });

  line_data.sort((a, b) => {
    if (a.timestamp !== b.timestamp) {
      return a.timestamp - b.timestamp;
    }
    return a.lineNum - b.lineNum;
  });

  return line_data;
}
