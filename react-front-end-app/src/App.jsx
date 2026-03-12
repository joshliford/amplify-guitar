import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import JamRoom from "./pages/JamRoom";
import Shed from "./pages/Shed";
import Login from "./pages/Login";
import SideNavBar from "./components/SideNavBar";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LessonDetail from "./pages/LessonDetail";
import { deleteUser } from "./services/userService";
import { useState } from "react";
import SetList from "./pages/SetList";
import SongDetail from "./pages/SongDetail";

function App() {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      handleLogout();
    } catch (error) {
      setError("Failed to delete user");
    }
  };

  return (
    <div
      className={
        isAuthPage ? "w-full min-h-screen" : "flex flex-col min-h-screen"
      }
    >
      {!isAuthPage && <Header />}
      <main className={isAuthPage ? "w-full" : "flex flex-1 ml-[175px]"}>
        {!isAuthPage && (
          <SideNavBar
            handleLogout={handleLogout}
            handleDeleteAccount={handleDeleteAccount}
          />
        )}
        <div className={isAuthPage ? "w-full" : "flex-1"}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/jamroom" element={<JamRoom />} />
              <Route path="/lessons/:id" element={<LessonDetail />} />
              <Route path="/shed" element={<Shed />} />
              <Route path="/songs" element={<SetList />} />
              <Route path="/songs/:id" element={<SongDetail />} />
            </Route>
          </Routes>
        </div>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
