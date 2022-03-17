import { useEffect, useState } from "react";

import { getFiles } from "../util/api";
import FileCard from "../components/file-card/FileCard";
import Input from "../components/input/Input";

function Home() {
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
    <div className="my-0 mx-auto w-11/12 md:w-10/12 lg:w-9/12">
      <form className="hidden p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center">
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

      <div className="mt-16 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {files?.allIds?.length
          ? files.allIds.map((id) => (
              <FileCard key={id} file={files.byId[id]} />
            ))
          : null}
      </div>
    </div>
  );
}

export default Home;
