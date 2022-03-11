import { useState } from "react";

function SearchParams() {
  const [search, setSearch] = useState("");

  function onChange({ target: { value } }) {
    setSearch(value);
  }

  return (
    <div className="search-params">
      <form>
        <label htmlFor="text">
          Search for text
          <input
            type="text"
            id="text"
            value={search}
            placeholder="text"
            onChange={onChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchParams;
