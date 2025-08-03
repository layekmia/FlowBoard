import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAuth from "./components/PrivateAuth";
import BoardCategories from "./pages/BoardCategories";
import Board from "./pages/Board";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateAuth>
                <Auth />
              </PrivateAuth>
            }
          />
          <Route
            path="/boards"
            element={
              <PrivateRoute>
                <BoardCategories />
              </PrivateRoute>
            }
          />
          <Route
            path="/board/:id"
            element={
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          success: {
            duration: 1000,
            className:
              "bg-green-100 text-green-800 text-base max-w-md px-6 py-4 rounded-md shadow-md",
          },
          error: {
            duration: 3000,
            className:
              "bg-red-100 text-red-800 text-base max-w-md px-6 py-4 rounded-md shadow-md",
          },
          className:
            "text-base max-w-md px-6 py-4 bg-white text-gray-700 rounded-md shadow-md",
        }}
      />
    </>
  );
}
