import React, { setGlobal } from "reactn";
import * as ReactDOM from "react-dom";

import "leaflet/dist/leaflet.css";

// Set an initial global state directly

setGlobal({
  start: { lat: 18.168, lng: 48.94 },
  end: { lat: 18.18, lng: 48.925 },
});

import { App } from "App";

ReactDOM.render(<App />, document.getElementById("root"));
