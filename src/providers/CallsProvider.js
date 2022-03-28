import React, { useContext, useEffect, useMemo, useState } from "react";

import { getFiles } from "../util/api";

const CallsContext = React.createContext();

function CallsProvider(props) {
  const [loaded, setLoaded] = useState(false);
  const [calls, setCalls] = useState();
  const value = useMemo(() => ({ loaded, ...calls }), [loaded, calls]);

  // Fetch markdown files
  useEffect(() => {
    getFiles()
      .then((results) => {
        setCalls(results);
        setLoaded(true);
      })
      .catch((err) => console.log("Error fetching call files", err));
  }, []);

  return <CallsContext.Provider value={value} {...props} />;
}

export function useCalls() {
  const context = useContext(CallsContext);
  if (!context) throw new Error("useCalls must be used within CallsProvider");
  return context;
}

export default CallsProvider;
