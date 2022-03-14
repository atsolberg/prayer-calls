const files = {
  allIds: [1, 2, 3, 4],
  byId: {
    1: { id: 1, name: "01-01-2022.md", contents: "lorem ipsum" },
    2: { id: 2, name: "02-01-2022.md", contents: "foo bar" },
    3: { id: 3, name: "02-15-2022.md", contents: "foo bar" },
    4: { id: 4, name: "03-01-2022.md", contents: "foo bar" },
  },
};

export function getFiles() {
  return Object.values(files.byId).sort((a, b) => a.name.localeCompare(b.name));
}

export function getFile(id) {
  return Promise.resolve(files.byId[id] || null);
}
