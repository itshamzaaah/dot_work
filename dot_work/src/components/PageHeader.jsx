import React from "react";
import { IoChevronBack, IoEyeOutline, IoSaveOutline } from "react-icons/io5";

const PageHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="w-full md:max-w-7xl mx-auto px-2 md:px-6">
        <div className="flex flex-col md:flex-row gap-y-3 items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <IoChevronBack size={20} />
              <span className="ml-2 text-sm font-medium">
                Back to Dashboard
              </span>
            </button>
            <div className="h-5 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Create New Test
              </h1>
              <p className="text-sm text-gray-500">
                Design and configure your assessment
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <IoEyeOutline size={16} />
              <span className="ml-2 text-sm">Preview</span>
            </button>
            <button className="text-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <span className="ml-2">Save & Publish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
