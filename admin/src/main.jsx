// admin/src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./Context/ShopContext"; // correct relative path
import App from "./App"; 
import "./index.css"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShopContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShopContextProvider>
  </React.StrictMode>
);
