import {
  FaHome,
  FaPlusSquare,
  FaFileAlt,
  FaUsers,
  FaCog,
  FaBars,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", icon: <FaHome className="w-4 h-4" />, path: "/admin" },
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
  return (
    <aside
      className={`fixed lg:static top-0 left-0 z-40 h-full w-60 bg-white border-r p-4 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      <div className="text-xl font-bold mb-6 flex justify-between items-center">
        Dot Work
        <RxCross2
          className="lg:hidden cursor-pointer"
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
    </aside>
  );
}
