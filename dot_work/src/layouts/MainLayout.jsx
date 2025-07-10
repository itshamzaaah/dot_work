import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex flex-col flex-1">
          <Navbar setIsOpen={setIsOpen} />
          <main className="flex-1 p-4 md:p-4 bg-gray-50 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
