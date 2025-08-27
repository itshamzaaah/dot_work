import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  );
}
