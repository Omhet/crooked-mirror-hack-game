import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import "./index.css";
import "./store/level";
import "./store/image";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
