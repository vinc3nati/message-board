import * as React from "react";
import { render } from "react-dom";

import { DataProvider } from "./context/data-context";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <DataProvider>
    <App />
  </DataProvider>,
  rootElement
);
