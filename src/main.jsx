import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import BoardProvider from "./context/BoardContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BoardProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BoardProvider>
  </StrictMode>
);
