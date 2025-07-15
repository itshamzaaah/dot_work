import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeader from "../components/PageHeader";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const renderNavbar = () => {
    const path = location.pathname;
    if (path.startsWith("/dashboard")) return <Navbar setIsOpen={setIsOpen} />;
    if (path.startsWith("/create-test"))
      return <PageHeader setIsOpen={setIsOpen} />;
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex flex-col flex-1">
             {renderNavbar()}
          <main className="flex-1 p-4 md:p-4 bg-gray-50 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
