import { StrictMode } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SearchParams from "./components/search-params/SearchParams";
import Details from "./pages/Details";

function App() {
  return (
    <StrictMode>
      <main>
        <Header />
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
        <Footer />
      </main>
    </StrictMode>
  );
}

export default App;
