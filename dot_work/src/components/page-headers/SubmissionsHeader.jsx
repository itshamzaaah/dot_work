import { FaBars } from "react-icons/fa";
import { TbSend } from "react-icons/tb";

const ViewSubmissionsHeader = ({ setIsOpen }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="w-full md:max-w-7xl mx-auto px-2 md:px-6">
        <div className="flex flex-col md:flex-row gap-y-3 justify-between py-2 md:py-3">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                View Submissions
              </h1>
              <p className="text-sm text-gray-500">
                Monitor and manage test submissions
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
            <button
              className="flex items-center px-3 py-2 text-center bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <TbSend size={16} />
              <span className="ml-2 text-sm">Send Results</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubmissionsHeader;
