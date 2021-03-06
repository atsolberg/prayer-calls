import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import { getBibles } from "../util/api";

const default_bible = {
  id: "de4e12af7f28f599-01",
  name: "King James Version",
  abbr: "KJV",
};
const cookie_name = "bibleId";
const cookie_value = Cookies.get(cookie_name);
let initial = default_bible;
if (cookie_value) {
  try {
    initial = JSON.parse(cookie_value);
    // Handle situation where I was storing http://api.bible structure
    if (initial.nameLocal) initial.name = initial.nameLocal;
    if (initial.abbreviationLocal) initial.abbr = initial.abbreviationLocal;
  } catch (e) {
    initial = default_bible;
    Cookies.set(cookie_name, JSON.stringify(initial));
    console.log("Error parsing bible cookie", cookie_value);
  }
}

Cookies.set(cookie_name, JSON.stringify(initial));

const BiblesContext = React.createContext();

/**
 * Component to provide bible versions
 */
function BiblesProvider(props) {
  const [bibles, setBibles] = useState({
    loaded: false,
    byId: { [initial.id]: initial },
    allIds: [initial.id],
  });
  const [current, setCurrent] = useState(initial.id);
  const setBible = useCallback((item) => {
    setCurrent(item.id);
    const next = {
      id: item.id,
      name: item.name,
      abbr: item.abbr,
    };
    Cookies.set(cookie_name, JSON.stringify(next));
  }, []);

  const value = useMemo(
    () => [current, setBible, bibles],
    [current, setBible, bibles]
  );

  // Load bibles from api
  useEffect(() => {
    if (!bibles.loaded) {
      getBibles({ filter: true })
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
