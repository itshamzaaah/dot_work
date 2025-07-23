import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";

const AddRemarks = () => {
  const [remarks, setRemarks] = useState("");

  const handleSaveRemarks = () => {
    if (remarks.trim()) {
      // Handle save logic here
      console.log("Saving remarks:", remarks);
      // You can add success notification here
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-4 sm:px-6 pt-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <FiEdit3 className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
              Manual Remarks & Adjustments
            </h2>
            <p className="text-sm text-gray-500">
              Add additional comments or override scores if needed
            </p>
          </div>
        </div>
      </div>
        {/* Remarks Input */}
      <div className="p-4 sm:p-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="remarks"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Additional Remarks
            </label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add any manual observations or comments..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500 
                         text-sm resize-none transition-colors duration-200
                         sm:text-base"
            />
            <div className="mt-2 flex justify-between items-center">
              <p className="text-xs text-gray-500">
                {remarks.length}/500 characters
              </p>
              {remarks.length > 500 && (
                <p className="text-xs text-red-500">Character limit exceeded</p>
              )}
            </div>
          </div>

          <div className="flex justify-start">
            <button
              onClick={handleSaveRemarks}
              disabled={!remarks.trim() || remarks.length > 500}
              className="inline-flex items-center px-4 py-2 text-xs font-medium 
                         text-white bg-primary border border-transparent rounded-md 
                         shadow-sm hover:bg-gray-800 focus:outline-none disabled:opacity-50 
                         disabled:cursor-not-allowed transition-colors duration-200"
            >
              Save Remarks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRemarks;
