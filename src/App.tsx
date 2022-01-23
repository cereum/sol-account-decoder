import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";

import { AccountInfoHexViewer } from "./pages";
import { DecodeAnchor } from "./pages/DecodeAnchor";
import { DecoderSelector } from "./pages";
import { ThemeContext } from "./themeContext";

function App() {
  const [isDark, setTheme] = useState(true);

  const toggleAppTheme = () => {
    setTheme(!isDark);

    // Toggle body class for light/dark theme background styles:
    const body = document.querySelector("body")!;
    if (!isDark) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  };

  return (
    <div className={isDark ? "bp3-dark" : ""}>
      <Router>
        <ThemeContext.Provider value={isDark}>
          <NavBar toggleAppTheme={toggleAppTheme} />
          <Routes>
            <Route path={"/"} element={<DecoderSelector />} />
            <Route
              path="/raw/:accountPubkey"
              element={<AccountInfoHexViewer />}
            />
            <Route path="/anchor/:accountPubkey" element={<DecodeAnchor />} />
          </Routes>
          <Footer />
        </ThemeContext.Provider>
      </Router>
    </div>
  );
}

export default App;
