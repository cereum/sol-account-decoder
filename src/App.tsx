// eslint-disable-next-line
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "./components";
import { CacheSwitch } from "react-router-cache-route";

import { Decoder } from "./pages";

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
            <Route exact path={"/decoder"}>
              <Decoder />
            </Route>
            <Route exact path={"/"}>
              <Decoder />
            </Route>
          </>
        </CacheSwitch>
      </Router>
    </>
  );
}

export default App;
