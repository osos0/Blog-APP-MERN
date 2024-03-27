import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store, persistor } from "./rtk/store.js";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/es/integration/react";
import ThemeProvider from "./components/themeProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </PersistGate>
);
