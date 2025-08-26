import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { pageHeaderConfig } from "../config/pageHeaderConfig";
import PageHeader from "../components/common/PageHeader";
import { selectAttempt } from "../store/slices/attemptSlice";
import { useSelector } from "react-redux";

export default function MainLayout() {
  const attempt = useSelector(selectAttempt); // Access attempt state
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const actionHandlers = {
    publishTest: () => console.log("Publishing Test..."),
    sendResults: () => console.log("Sending Results..."),
    downloadPDF: () => console.log("Downloading PDF..."),
    openAddUserModal: () => console.log("Opening Add User Modal..."),
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

    const actions = matchedConfig.actions.map((action) => {
      if (action.actionType && actionHandlers[action.actionType]) {
        return { ...action, onClick: actionHandlers[action.actionType] };
      }
      return action;
    });

    const subtitleData = {
      candidateName: attempt?.candidate?.name || "Loading...",
      testName: attempt?.submission?.raw?.test?.testName || "Loading...",
      userName: attempt?.candidate?.name || "Admin",
    };

    return (
      <PageHeader
        title={matchedConfig.title}
        subtitle={typeof matchedConfig.subtitle === "function" 
          ? matchedConfig.subtitle(subtitleData) 
          : matchedConfig.subtitle
        }
        actions={actions}
      />
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col flex-1">
        {renderNavbar()}
        <main className="flex-1 p-4 md:p-4 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
