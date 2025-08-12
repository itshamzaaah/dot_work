import {
  FaHome,
  FaPlusSquare,
  FaFileAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import CloseBtn from "./common/CloseBtn";
import { MdAssessment } from "react-icons/md";
import { logoutCurrentUser, selectAuth } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaHome className="w-4 h-4" />,
    color: "from-blue-500 to-blue-600",
    roles: ["ADMIN", "HR"],
  },
  {
    name: "Create Test",
    path: "/create-test",
    icon: <FaPlusSquare className="w-4 h-4" />,
    color: "from-green-500 to-green-600",
    roles: ["ADMIN", "HR"],
  },
  {
    name: "All Tests",
    path: "/tests",
    icon: <MdAssessment className="w-4 h-4" />,
    color: "from-violet-500 to-violet-600",
    roles: ["ADMIN", "HR"],
  },
  {
    name: "My Tests",
    path: "/my-tests",
    icon: <MdAssessment className="w-4 h-4" />,
    color: "from-violet-500 to-violet-600",
    roles: ["CANDIDATE"],
  },
  {
    name: "View Submissions",
    path: "/view-submissions",
    icon: <FaFileAlt className="w-4 h-4" />,
    color: "from-purple-500 to-purple-600",
    roles: ["ADMIN", "HR", "CANDIDATE"],
  },
  {
    name: "Users",
    path: "/users",
    icon: <FaUsers className="w-4 h-4" />,
    color: "from-orange-500 to-orange-600",
    roles: ["ADMIN"],
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog className="w-4 h-4" />,
    color: "from-gray-500 to-gray-600",
    roles: ["ADMIN"],
  },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const dispatch = useDispatch()
  const { user } = useSelector(selectAuth);
  const filteredLinks = sidebarLinks.filter((link) => {
    return user && link.roles.includes(user.role);
  });


  const handleLogout = () => {
    dispatch(logoutCurrentUser())
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-full w-64 bg-gradient-to-br from-slate-50 to-white border-r border-slate-200/60 shadow-xl lg:shadow-none transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Fixed Header */}
          <div className="flex-shrink-0 p-6 pb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Dot Work
                  </h1>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>
              <CloseBtn
                onClose={() => setIsOpen(false)}
                hideClass="lg:hidden"
              />
            </div>
          </div>

          {/* Scrollable Navigation */}
          <div className="flex-1 overflow-y-auto px-6 pb-4">
            <nav className="space-y-2">
              {filteredLinks.map((link, index) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-4 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? "bg-white shadow-lg shadow-indigo-500/10 text-indigo-700 border border-indigo-100"
                        : "text-gray-700 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/20 hover:border hover:border-indigo-100 hover:text-indigo-600 hover:scale-95"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {({ isActive }) => (
                    <>
                      {/* Animated background for active state */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-50 animate-pulse" />
                      )}

                      {/* Hover gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                      {/* Icon with gradient background */}
                      <div
                        className={`relative z-10 p-2.5 rounded-lg transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-r ${link.color} text-white shadow-lg`
                            : "bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:text-white group-hover:shadow-lg group-hover:scale-110"
                        }`}
                      >
                        {link.icon}
                      </div>

                      {/* Text */}
                      <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300 group-hover:font-semibold">
                        {link.name}
                      </span>

                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute right-4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                      )}

                      {/* Hover indicator */}
                      <div className="absolute right-4 w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-2 group-hover:h-2 transition-all duration-300" />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Fixed Bottom Section */}
          <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-200/50">
            <div className="space-y-4">
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="group flex items-center gap-4 px-3 py-2 w-full text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 border border-red-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/20 hover:scale-105"
              >
                <div className="p-2.5 rounded-lg bg-red-50 group-hover:bg-red-100 transition-all duration-300 group-hover:scale-110">
                  <FaSignOutAlt className="w-4 h-4" />
                </div>
                <span className="group-hover:translate-x-2 transition-transform duration-300 group-hover:font-semibold">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
