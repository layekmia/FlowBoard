import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
// import BoardProvider from "./context/BoardContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <BoardProvider> // it was localstorage functionality context just for present skill */}
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
      {/* </BoardProvider> */}
    </QueryClientProvider>
  </StrictMode>
);
