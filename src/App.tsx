// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "./components";

import { Decoder, AccountInfoHexViewer } from "./pages";
import { DecodeAnchor } from "./pages/DecodeAnchor";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Router>
        <NavBar toggle={toggle} />
        <Routes>
          <Route path={"/"} element={<Decoder />} />
          <Route
            path="/raw/:accountPubkey"
            element={<AccountInfoHexViewer />}
          />
          <Route path="/anchor/:accountPubkey" element={<DecodeAnchor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
