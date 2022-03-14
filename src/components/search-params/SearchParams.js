import { useEffect, useState } from "react";

import { getFiles } from "../../api";
import FileCard from "../file-card/FileCard";
import Input from "../input/Input";

function SearchParams() {
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState([]);

  function onChange({ target: { value } }) {
    setSearch(value);
  }

  useEffect(() => {
    setFiles(getFiles());
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
        {files.map((f) => (
          <FileCard key={f.id} file={f} />
        ))}
      </div>
    </div>
  );
}

export default SearchParams;
