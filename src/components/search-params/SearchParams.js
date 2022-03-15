import { useEffect, useState } from "react";

import { getFiles } from "../../util/api";
import FileCard from "../file-card/FileCard";
import Input from "../input/Input";

function SearchParams() {
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState(null);

  function onChange({ target: { value } }) {
    setSearch(value);
  }

  // Fetch markdown files
  useEffect(() => {
    getFiles()
      .then((results) => setFiles(results))
      .catch((err) => console.log("Error fetching files", err));
  }, []);

  return (
    <div className="my-0 mx-auto w-11/12">
      <form className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center">
        <label htmlFor="text" className="search-label">
          Search for text
          <Input
            className="search-control"
            id="text"
            value={search}
            placeholder="text"
            onChange={onChange}
          />
        </label>
        <button
          type="submit"
          className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-slate-700"
        >
          Submit
        </button>
      </form>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {files?.allIds?.length
          ? Object.values(files.byId).map((f) => (
              <FileCard key={f.id} file={f} />
            ))
          : null}
      </div>
    </div>
  );
}

export default SearchParams;
