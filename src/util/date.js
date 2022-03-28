import { months } from "./constants";

export function formatFileDate(fileDate) {
  const parts = fileDate.split("-");
  const year = parts[0];
  const month = months[Number(parts[1]) - 1];
  const day = Number(parts[2]);

  return `${month.name} ${day}, ${year}`;
}
