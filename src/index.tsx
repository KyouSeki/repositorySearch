import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App"
import { AliveScope } from "react-activation"

import ReactDOM from 'react-dom'

ReactDOM.render(
  <AliveScope>
    <App />
  </AliveScope>,
  document.getElementById('root')
)

reportWebVitals();
