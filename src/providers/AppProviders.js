import React from "react";

import BiblesProvider from "./BiblesProvider";
import CallsProvider from "./CallsProvider";

function AppProviders({ children }) {
  return (
    <BiblesProvider>
      <CallsProvider>{children}</CallsProvider>
    </BiblesProvider>
  );
}

export default AppProviders;
