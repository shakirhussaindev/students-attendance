import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Protected = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};
const Guest = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
      <Route
        path="/login"
        element={
          <Guest>
            <Login />
          </Guest>
        }
      />
      <Route
        path="/register"
        element={
          <Guest>
            <Register />
          </Guest>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}