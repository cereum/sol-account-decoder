import React from "react";
import ReactDOM from "react-dom";
import { FocusStyleManager } from "@blueprintjs/core";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
