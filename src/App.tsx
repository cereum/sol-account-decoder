// eslint-disable-next-line
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "./components";
import { CacheSwitch } from "react-router-cache-route";

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
        <CacheSwitch>
          <>
            <NavBar toggle={toggle} />
            <Route path={"/decoder"}>
              <Decoder />
            </Route>
            <Route path={"/"}>
              <Decoder />
            </Route>
            <Route
              path="/raw/:accountPubkey"
              element={AccountInfoHexViewer}
            />
            <Route path="/anchor/:accountPubkey" element={DecodeAnchor} />
          </>
        </CacheSwitch>
      </Router>
    </>
  );
}

export default App;
