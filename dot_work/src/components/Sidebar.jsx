import {
  FaHome,
  FaPlusSquare,
  FaFileAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    icon: <FaHome className="w-4 h-4" />,
    path: "/dashboard",
  },
  {
    name: "Create Test",
    icon: <FaPlusSquare className="w-4 h-4" />,
    path: "/create-test",
  },
  {
    name: "View Submissions",
    icon: <FaFileAlt className="w-4 h-4" />,
    path: "/view-submissions",
  },
  { name: "Users", icon: <FaUsers className="w-4 h-4" />, path: "/users" },
  { name: "Settings", icon: <FaCog className="w-4 h-4" />, path: "/settings" },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔐 Perform logout logic here (e.g. clear tokens, call API)
    navigate("/login"); // Redirect to login
  };

  return (
    <aside
      className={`fixed lg:static top-0 left-0 z-40 h-full w-60 bg-white border-r p-4 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Top Section */}
        <div>
          <div className="text-xl font-bold mb-6 flex justify-between items-center">
            Dot Work
            <RxCross2
              className="lg:hidden bg-gray-100 rounded-md size-5 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <nav className="flex flex-col space-y-3">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded ${
                    isActive
                      ? "bg-backgroundLight text-primary"
                      : "text-gray-700 hover:bg-backgroundLight"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section (Logout Button) */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded"
          >
            <FaSignOutAlt className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
