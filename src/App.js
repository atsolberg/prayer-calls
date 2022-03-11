import ReactDOM from "react-dom";

import Header from "./components/header/Header";
import SearchParams from "./components/search-params/SearchParams";

function App() {
  return (
    <main>
      <Header />
      <SearchParams />
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
