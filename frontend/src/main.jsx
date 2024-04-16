import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux";
import { store } from "./authentication/store";

const root = document.getElementById("root");

createRoot(root).render(
  <Router>
    <Provider store={store}>
      <App />
      <Toaster position="top-center" />
    </Provider>
  </Router>
);
