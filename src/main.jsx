import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import BoardProvider from "./context/BoardContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BoardProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BoardProvider>
    </QueryClientProvider>
  </StrictMode>
);
