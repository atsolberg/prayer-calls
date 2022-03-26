import { StrictMode } from "react";
import { Routes, Route } from "react-router-dom";

import BiblesProvider from "./providers/BiblesProvider";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Details from "./pages/Details";
import About from "./pages/About";
import Links from "./pages/Links";
import Bibles from "./pages/Bibles";

function App() {
  return (
    <StrictMode>
      <main>
        <BiblesProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/about" element={<About />} />
            <Route path="/links" element={<Links />} />
            <Route path="/bibles" element={<Bibles />} />
          </Routes>
          <Footer />
        </BiblesProvider>
      </main>
    </StrictMode>
  );
}

export default App;
