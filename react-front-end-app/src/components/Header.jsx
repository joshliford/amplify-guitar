import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  // access current theme and toggle function from ThemeContext
  const { theme, toggleTheme } = useTheme();

  // hide the header when on auth pages
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/register")
    return null;

  return (
    <div className="ml-[175px] w-[calc(100%-175px)] border-b-2 border-border bg-(--bg-surface) shadow-sm">
      <header className="max-w-screen px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to={"/dashboard"}>
            <h1 className="text-4xl text-(--text-high) hover:text-primary transition-colors mb-1">
              Amplify
            </h1>
          </Link>
        </div>
        <div className="flex flex-row justify-between">
          <h2 className="text-(--text-med) text-xl">
            Gamified Guitar Learning Dashboard
          </h2>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-(--bg-elevated) transition-colors duration-200 hover:cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun size={24} className="text-primary" />
            ) : (
              <Moon size={24} className="text-black" />
            )}
          </button>
        </div>
      </header>
    </div>
  );
}
