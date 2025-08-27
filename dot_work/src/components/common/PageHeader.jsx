import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../../store/slices/uiSlice";

const PageHeader = ({ title, description, button }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="w-full md:max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>

        {button &&
          (button.to ? (
            <Link
              to={button.to}
              className="flex items-center px-3 py-1.5 rounded-lg bg-primary text-white text-sm hover:bg-blue-700"
            >
              {button.icon && <button.icon size={16} />}
              <span className="ml-2">{button.label}</span>
            </Link>
          ) : (
            <button
              onClick={button.onClick}
              className="flex items-center px-3 py-1.5 rounded-lg bg-primary text-white text-sm hover:bg-blue-700"
            >
              {button.icon && <button.icon size={16} />}
              <span className="ml-2">{button.label}</span>
            </button>
          ))}

        <button
          className="block lg:hidden p-2 text-primary"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaBars className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
