import { months } from "./constants";

export function formatFileDate(fileDate) {
  const parts = fileDate.split("-");
  const year = parts[0];
  const month = months[Number(parts[1].replace("0", "")) - 1];
  const day = parts[2].replace("0", "");

  return `${month.name} ${day}, ${year}`;
}
