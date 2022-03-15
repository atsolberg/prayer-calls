import fs from "fs";
import path from "path";

const directory = path.join(__dirname, "../../server/db/files");
const fileNames = fs.readdirSync(directory);
const files = fileNames.reduce(
  function (acc, name) {
    const file = { name, id: name, contents: null };

    acc.allIds.push(name);
    acc.byId[name] = file;

    const fpath = path.join(__dirname, `../../server/db/files/${name}`);
    const contents = fs.readFileSync(fpath, "utf8");
    file.contents = contents;

    return acc;
  },
  { allIds: [], byId: {} }
);

export function getFileDirectory() {
  return files;
}
