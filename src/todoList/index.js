import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import flexible from '../lib/flexible'
import "./index.scss";
flexible()
ReactDOM.render(<App />, document.getElementById("root"));
