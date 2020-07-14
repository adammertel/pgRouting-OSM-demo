import React, { setGlobal } from "reactn";
import * as ReactDOM from "react-dom";

// Set an initial global state directly

setGlobal({ title: "" });

import { App } from "App";

ReactDOM.render(<App />, document.getElementById("root"));
