import { useEffect, useState } from "react";
import { FaBell, FaBars } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function Navbar({ setIsOpen }) {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const triggerShake = () => {
      setShake(true);
      setTimeout(() => setShake(false), 3000); 
    };

    const interval = setInterval(triggerShake, 30000);

    const initialTimer = setTimeout(triggerShake, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, Admin</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-full text-primary hover:bg-backgroundLight"
          title="notifications"
          aria-label="View notifications"
        >
          <FaBell className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="Create a new test"
          className={`hidden md:inline-flex gap-x-2 text-white bg-primary hover:bg-primary/90 focus:ring-2 font-medium rounded-lg text-sm px-3 py-2 text-center items-center transition ${
            shake ? "animate-shake" : ""
          }`}
        >
          <AiOutlinePlusCircle size={15} />
          Create test
        </button>

        <button
          className="block lg:hidden p-2 text-primary"
          aria-label="Toggle sidebar menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FaBars className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
