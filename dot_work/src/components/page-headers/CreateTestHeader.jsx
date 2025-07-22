
import { FaBars } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const PageHeader = ({ setIsOpen }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="w-full md:max-w-7xl mx-auto px-2 md:px-6">
        <div className="flex flex-col md:flex-row gap-y-3 justify-between py-2 md:py-3">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Create New Test
              </h1>
              <p className="text-sm text-gray-500">
                Design and configure your assessment
              </p>
            </div>
            <button
              className="block lg:hidden p-2 text-primary"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/preview" className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <IoEyeOutline size={16} />
              <span className="ml-2 text-sm">Preview</span>
            </Link>
            <button className="text-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <span>Publish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
