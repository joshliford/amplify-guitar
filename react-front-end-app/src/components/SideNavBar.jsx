import {
  BoomBox,
  CassetteTape,
  Home,
  Info,
  Settings,
  TriangleAlert,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";

export default function SideNavBar({ handleLogout, handleDeleteAccount }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const location = useLocation();

  // hide nav bar when on the auth page
  if (location.pathname === "/login" || location.pathname === "/register")
    return null;

  return (
    <div className="flex flex-col fixed top-0 left-0 min-h-screen w-[175px] bg-(--bg-surface) border-r-2 border-border overflow-x-hidden">
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
              <MenuButton className="inline-flex items-center gap-2 group-hover:text-primary hover:cursor-pointer text-md rounded-lg px-2 py-1">
                Profile
                <ChevronDown className="size-4" />
              </MenuButton>
              <MenuItems
                anchor={{ to: "top", gap: "10px" }}
                className="w-fit flex flex-col justify-between p-4 rounded-xl bg-(--bg-elevated) border border-primary shadow-md"
              >
                <MenuItem as="div" className="text-center">
                  <button
                    onClick={handleLogout}
                    className="text-(--text-high) hover:text-red-400 text-xl hover:cursor-pointer transition-all mb-2"
                  >
                    Logout
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setModalIsOpen(true)}
                    className="text-(--text-high) hover:text-red-400 text-xl hover:cursor-pointer transition-all"
                  >
                    Delete Account
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </ul>
      </nav>
      <Modal
        isModalOpen={modalIsOpen}
        handleCloseModal={() => setModalIsOpen(false)}
        className="border-red-400"
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-row justify-center items-center gap-2 text-red-400">
            <TriangleAlert size={30} />
            <p className="text-xl font-semibold">Delete Account</p>
          </div>
          <div className="flex justify-center">
            <p className="text-(--text-high)">
              Are you sure you want to delete your account?
            </p>
          </div>
          <div className="flex justify-around mb-6">
            <button
              onClick={() => setModalIsOpen(false)}
              className="rounded-xl px-3 py-0.5 text-(--text-high) hover:bg-(--bg-elevated) dark:bg-(--bg-elevated) dark:hover:bg-(--bg-elevated)/80 hover:cursor-pointer duration-200 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDeleteAccount();
                setModalIsOpen(false);
              }}
              className="rounded-xl px-3 py-0.5 text-(--text-high) hover:bg-red-500 dark:hover:bg-red-700 dark:bg-(--bg-elevated) hover:cursor-pointer duration-200 transition-all"
            >
              Delete Account
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
