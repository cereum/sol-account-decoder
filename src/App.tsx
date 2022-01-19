import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { AccountInfoHexViewer } from "./pages";
import { DecodeAnchor } from "./pages/DecodeAnchor";
import { DecoderSelector } from "./pages";
import {ThemeContext, themes} from './themeContext';

function App() {
  const [theme, setTheme] = useState();

  const toggleAppTheme = () => {
    setTheme(themes.dark
            ? themes.light
            : themes.dark)

    // Toggle body class for light/dark theme background styles:
    const body = document.querySelector("body")!;
    if (isDark) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  };

  return (
    <div className={isDarkTheme ? "bp3-dark" : ""}>
      <Router>
        <ThemeContext.Provider value={theme}>
        <NavBar toggleAppTheme={toggleAppTheme} />
        <Routes>
          <Route path={"/"} element={<DecoderSelector />} />
          <Route
            path="/raw/:accountPubkey"
            element={<AccountInfoHexViewer />}
          />
          <Route path="/anchor/:accountPubkey" element={<DecodeAnchor />} />
        </Routes>
        </ThemeContext.Provider>
      </Router>
    </div>
  );
}

export default App;
