import client from "./client";

let files = {
  loaded: false,
  allIds: [],
  byId: {},
};

export function getFiles() {
  if (files.loaded) return Promise.resolve(files);

  return client({ endpoint: "http://localhost:3000/api/files" }).then(
    (resp) => {
      files = { ...resp.files, loaded: true };
      return files;
    }
  );
}

export function getFile(id) {
  if (files.loaded) return Promise.resolve(files.byId[id] || null);
  return new Promise((resolve) => {
    getFiles().then((files) => resolve(files.byId[id] || null));
  });
}
