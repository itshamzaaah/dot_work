import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pageHeaderConfig } from "../config/pageHeaderConfig";
import PageHeader from "../components/common/PageHeader";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const location = useLocation();

  const actionHandlers = {
    publishTest: () => toast.info("Publishing Test..."),
    sendResults: () => toast.info("Sending Results..."),
    downloadPDF: () => toast.info("Downloading PDF..."),
    downloadZIP: () => toast.info("Downloading ZIP..."),
    openAddUserModal: () => setIsUserModalOpen(true),
  };

  const renderNavbar = () => {
    const path = location.pathname;

    const matchedConfig = pageHeaderConfig.find((config) => {
      if (config.matchType === "startsWith") {
        return path.startsWith(config.path);
      } else if (config.matchType === "exact") {
        return path === config.path;
      }
      return false;
    });

    if (!matchedConfig) return null;

    // If custom component exists (like Navbar), render it
    if (matchedConfig.component) {
      const Component = matchedConfig.component;
      return <Component setIsOpen={setIsOpen} />;
    }

    const actions = matchedConfig.actions.map((action) => {
      if (action.actionType && actionHandlers[action.actionType]) {
        return { ...action, onClick: actionHandlers[action.actionType] };
      }
      return action;
    });

    return (
      <PageHeader
        title={matchedConfig.title}
        subtitle={matchedConfig.subtitle}
        setIsOpen={setIsOpen}
        actions={actions}
      />
    );
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex flex-col flex-1">
          {renderNavbar()}
          <main className="flex-1 p-4 md:p-4 bg-gray-50 overflow-auto">
            <Outlet context={{ isUserModalOpen, setIsUserModalOpen }} />
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
