import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
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

function App() {
  
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    const root = window.document.documentElement;

    // adds or removes 'dark' class from <html>
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // runs everytime isDark changes
  }, [isDark]);

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
    setIsDark(false);
  };

  return (
    <div className={isAuthPage ? "w-full min-h-screen" : "flex flex-col min-h-screen"}>
      {!isAuthPage && <Header />}
      <main className={isAuthPage ? "w-full" : "flex flex-1 ml-[175px]"}>
        {!isAuthPage && <SideNavBar handleLogout={handleLogout} toggleDarkMode={toggleDarkMode}/>}
        <div className={isAuthPage ? "w-full" : "flex-1"}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/jamroom" element={<JamRoom />} />
          <Route path="/shed" element={<Shed />} />
        </Routes>
        </div>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
