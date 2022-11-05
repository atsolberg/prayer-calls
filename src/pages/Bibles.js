import React, { useEffect, useState } from "react";
import { getBibles } from "../util/api";

function Bibles() {
  const [bibles, setBible] = useState({ byId: {}, allId: [] });

  useEffect(() => {
    getBibles({ uncached: true }).then((resp) => setBible(resp));
  }, []);

  return (
    <div className="my-0 mx-auto w-11/12 md:w-10/12 lg:w-9/12">
      <h1 className="mb-3 mt-4 text-gray-400 font-bold text-lg sm:text-xl">
        Bibles
      </h1>

      {Object.values(bibles.byId).map((b) => (
        <div key={b.id} className="py-3 border-b border-1 border-slate-700">
          {b.abbr} - {b.name} - {b.id}
        </div>
      ))}
    </div>
  );
}

export default Bibles;
