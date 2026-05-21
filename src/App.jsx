import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Profile from "./pages/Profile";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* AUTh qismi */}
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/verify-otp"
            element={<VerifyOtp />}
          />
          {/* PROTECTED qismi*/}
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* ADMIN ONLY */}
          <Route
            path="/users"
            element={
              <ProtectedRoute role="ADMIN">
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;