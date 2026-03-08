import { BoomBox, CassetteTape, Home, Info, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function SideNavBar({ handleLogout }) {
  const location = useLocation();

  // hide nav bar when on the auth page
  if (location.pathname === "/login" || location.pathname === "/register") return null;

  return (
    <div className="flex flex-col fixed top-0 left-0 min-h-screen w-[175px] bg-(--bg-surface) border-r-2 border-border">
      <nav>
        <ul className="flex flex-col gap-4 text-md p-3 mt-4">
          <div
            className={`group flex gap-2 items-center rounded-lg px-2 py-2 ${
              location.pathname === "/dashboard"
                ? "bg-(--primary)/20 transition-colors"
                : "hover:bg-(--bg-elevated) transition-colors"
            }`}
          >
            <Home
              className={
                location.pathname === "/dashboard"
                  ? "text-primary"
                  : "text-(--text-low) group-hover:text-primary transition-colors"
              }
            />
            <li
              className={
                location.pathname === "/dashboard"
                  ? "text-primary"
                  : "text-(--text-low) group-hover:text-primary transition-colors"
              }
            >
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </div>

          <div
            className={`group flex gap-2 items-center rounded-lg px-2 py-2 ${
              location.pathname === "/jamroom"
                ? "bg-(--primary)/20 transition-colors"
                : "hover:bg-(--bg-elevated) transition-colors"
            }`}
          >
            <BoomBox
              className={
                location.pathname === "/jamroom"
                  ? "text-primary"
                  : "text-(--text-low) group-hover:text-primary transition-colors"
              }
            />
            <li
              className={
                location.pathname === "/jamroom"
                  ? "text-primary"
                  : "text-(--text-low) group-hover:text-primary transition-colors"
              }
            >
              <Link to="/jamroom">Jam Room</Link>
            </li>
          </div>

          <div
            className={`group flex gap-2 items-center rounded-lg px-2 py-2 ${
              location.pathname === "/shed"
                ? "bg-(--primary)/20 transition-colors"
                : "hover:bg-(--bg-elevated) transition-colors"
            }`}
          >
            <CassetteTape
              className={
                location.pathname === "/shed"
                  ? "text-primary"
                  : "text-(--text-low) group-hover:text-primary transition-colors"
              }
            />
            <li
              className={
                location.pathname === "/shed"
                  ? "text-primary"
                  : "text-(--text-low) group-hover:text-primary transition-colors"
              }
            >
              <Link to="/shed">The Shed</Link>
            </li>
          </div>

          <div
            className={`group flex gap-2 items-center rounded-lg px-2 py-2 ${
              location.pathname === "/about"
                ? "bg-(--primary)/20 transition-colors"
                : "hover:bg-(--bg-elevated) transition-colors"
            }`}
          >
            <Info
              className={
                location.pathname === "/about"
                  ? "text-primary"
                  : "text-(--text-low) group-hover:text-primary transition-colors"
              }
            />
            <li
              className={
                location.pathname === "/about"
                  ? "text-primary"
                  : "text-(--text-low) group-hover:text-primary transition-colors"
              }
            >
              <Link to="/about">About</Link>
            </li>
          </div>

          <div className="group flex absolute bottom-4 gap-2 items-center rounded-lg px-2 py-2 hover:bg-(--bg-elevated) text-(--text-med) transition-colors">
            <Settings className="group-hover:text-primary" />
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 group-hover:text-primary hover:cursor-pointer text-md">
                Profile
                <ChevronDown className="size-4" />
              </MenuButton>
              <MenuItems anchor="top" className="rounded-xl bg-(--bg-elevated) border border-border shadow-md">
                <MenuItem as="div" className="flex justify-center">
                  <button
                    onClick={handleLogout}
                    className="text-(--text-high) hover:text-red-400 font-semibold text-xl hover:cursor-pointer transition mb-2"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </ul>
      </nav>
    </div>
  );
}
