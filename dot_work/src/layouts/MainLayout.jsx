import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeader from "../components/page-headers/CreateTestHeader";
import ViewSubmissionsHeader from "../components/page-headers/SubmissionsHeader";
import TestReportHeader from "../components/page-headers/TestReportHeader";
import UsersHeader from "../components/page-headers/UsersHeader";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const renderNavbar = () => {
    const path = location.pathname;
    switch (true) {
      case path.startsWith("/dashboard"):
        return <Navbar setIsOpen={setIsOpen} />;
      case path.startsWith("/create-test"):
      case path.startsWith("/preview"):
        return <PageHeader setIsOpen={setIsOpen} />;
      case path.startsWith("/view-submissions"):
        return <ViewSubmissionsHeader setIsOpen={setIsOpen} />;
      case path.startsWith("/test-report/"):
        return <TestReportHeader setIsOpen={setIsOpen} />;
      case path.startsWith("/users"):
        return <UsersHeader setIsOpen={setIsOpen} />;
      default:
        return null;
    }
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
