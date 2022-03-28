import { formatFileDate } from "./date";

export function indexCallText(table) {
  const line_data = [];

  Object.values(table.byId).forEach((call) => {
    const lines = call.contents
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean) // reject empties
      .filter((l) => !l.includes("#")); // reject headers
    lines.forEach((l, i) => {
      let data = {
        file: call.id,
        date: formatFileDate(call.name),
        timestamp: new Date(call.name).getTime(),
        strong: l.startsWith("**"),
        verse: l.startsWith("_"),
        lineNum: i + 1,
        text: l.replaceAll("*", "").replaceAll("_", ""),
      };
      line_data.push(data);
    });
  });

  line_data.sort((a, b) => {
    if (a.timestamp !== b.timestamp) {
      return a.timestamp - b.timestamp;
    }
    return a.lineNum - b.lineNum;
  });
  line_data.forEach((ld) => {
    console.log(
      `date:`,
      ld.date,
      "line#:",
      ld.lineNum,
      "timestamp:",
      ld.timestamp
    );
  });

  return table;
}
