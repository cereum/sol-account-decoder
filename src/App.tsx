import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { AccountInfoHexViewer } from "./pages";
import { DecodeAnchor } from "./pages/DecodeAnchor";
import { DecoderSelector } from "./pages";

function App() {
  const [isDarkTheme, setDarkTheme] = useState(false);

  const toggleAppTheme = () => {
    const isDark = !isDarkTheme;
    setDarkTheme(isDark);

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
        <NavBar toggleAppTheme={toggleAppTheme} />
        <Routes>
          <Route path={"/"} element={<DecoderSelector />} />
          <Route
            path="/raw/:accountPubkey"
            element={<AccountInfoHexViewer />}
          />
          <Route path="/anchor/:accountPubkey" element={<DecodeAnchor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
