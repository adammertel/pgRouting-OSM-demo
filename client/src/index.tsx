import React, { setGlobal } from "reactn";
import * as ReactDOM from "react-dom";

// Set an initial global state directly

setGlobal({ start: "18.168,48.94", end: "18.194,48.90" });

import { App } from "App";

ReactDOM.render(<App />, document.getElementById("root"));
