import { StrictMode } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Details from "./pages/Details";
import About from "./pages/About";

function App() {
  return (
    <StrictMode>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </main>
    </StrictMode>
  );
}

export default App;
