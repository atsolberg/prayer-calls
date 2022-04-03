import React, { useContext, useEffect, useMemo, useState } from "react";

import { indexCallText } from "../util/prayer-call";
import { getFiles } from "../util/api";

const CallsContext = React.createContext();

function CallsProvider(props) {
  const [loaded, setLoaded] = useState(false);
  const [calls, setCalls] = useState();
  const value = useMemo(() => ({ loaded, ...calls }), [loaded, calls]);

  // Fetch markdown files
  useEffect(() => {
    getFiles()
      .then((files) => {
        setCalls({
          ...files,
          line_data: indexCallText(files),
        });
        setLoaded(true);
      })
      .catch((err) => console.log("Error fetching call files", err));
  }, []);

  return <CallsContext.Provider value={value} {...props} />;
}

/**
 * Return the data for all calls
 * @return {CallData}
 */
export function useCalls() {
  const context = useContext(CallsContext);
  if (!context) throw new Error("useCalls must be used within CallsProvider");
  return context;
}

export default CallsProvider;
