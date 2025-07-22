import { FaBars } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { TbSend } from "react-icons/tb";

const TestReportHeader = ({ setIsOpen }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="w-full md:max-w-7xl mx-auto px-2 md:px-6">
        <div className="flex flex-col md:flex-row gap-y-3 justify-between py-2 md:py-3">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Test Result Report
              </h1>
              <p className="text-sm text-gray-500">
                John Doe - Front End developer
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
              <LuDownload size={12} />
              <span className="ml-2 text-xs">Download PDF</span>
            </button>
            <button
              className="flex items-center px-3 py-2 text-center bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LuDownload size={12} />
              <span className="ml-2 text-xs">Download ZIP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestReportHeader;
