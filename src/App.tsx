// eslint-disable-next-line
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "./components";
import { CacheSwitch } from "react-router-cache-route";

import { DecoderSelector } from "./pages";
import { RawDataDisplay } from "./components/RawDataDisplay";
import { AnchorViewer } from "./pages/AnchorViewer";

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
            <Route path={"/"} element={<DecoderSelector/>}>
              <Route path={"raw"} element={<RawDataDisplay/>}/>
              <Route path={"anchor"} element={<AnchorViewer/>}/>
            </Route>
          </>
        </CacheSwitch>
      </Router>
    </>
  );
}

export default App;
