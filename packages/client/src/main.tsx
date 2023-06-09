import React from "react";
import ReactDOM from "react-dom/client";

import { AppWithContexts } from "./contexts/AppContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppWithContexts />
  </React.StrictMode>
);
