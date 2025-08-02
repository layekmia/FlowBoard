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
      <ToastContainer autoClose={2000} />
    </>
  );
}
