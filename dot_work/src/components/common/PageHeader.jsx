import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const PageHeader = ({ title, subtitle, actions = [], setIsOpen }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="w-full md:max-w-7xl mx-auto px-2 md:px-6">
        <div className="flex flex-col md:flex-row gap-y-3 justify-between py-2 md:py-3">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
            {setIsOpen && (
              <button
                className="block lg:hidden p-2 text-primary"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <FaBars className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {actions.map((action, index) => {
              const button = (
                <button
                  key={index}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    action.variant === "primary"
                      ? "bg-primary text-white hover:bg-blue-700"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={action.onClick}
                >
                  {action.icon && (
                    <action.icon size={action.iconSize || 16} />
                  )}
                  <span className={`ml-2 ${action.textSize || "text-sm"}`}>
                    {action.label}
                  </span>
                </button>
              );

              return action.to ? (
                <Link key={index} to={action.to}>
                  {button}
                </Link>
              ) : (
                button
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
