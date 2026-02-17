import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BoardProvider } from "./context/BoardContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <BoardProvider>
        <App />
      </BoardProvider>
    </AuthProvider>
  </BrowserRouter>
);
