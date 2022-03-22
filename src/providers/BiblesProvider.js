import React, { useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { getBibles } from "../util/api";

const initial = Cookies.get("bibleId") || "de4e12af7f28f599-02";
const BiblesContext = React.createContext();

/**
 * Component to provide bible versions from the
 * https://scripture.api.bible/livedocs#/ api.
 */
function BiblesProvider(props) {
  const [bibles, setBibles] = useState({ loaded: false, byId: {}, allIds: [] });
  const [current, setCurrent] = useState(initial);

  const value = useMemo(() => [current, setCurrent, bibles], [current, bibles]);

  // Load bibles from api
  useEffect(() => {
    if (!bibles.loaded) {
      getBibles()
        .then((resp) => setBibles({ ...bibles, ...resp, loaded: true }))
        .catch((err) => console.log("Error fetching bibles", err));
    }
  }, [bibles]);

  return <BiblesContext.Provider value={value} {...props} />;
}

export function useBibles() {
  const context = useContext(BiblesContext);
  if (!context) throw new Error("useBibles must be used within BiblesProvider");
  return context;
}

export default BiblesProvider;
