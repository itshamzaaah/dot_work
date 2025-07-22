import { FiUser, FiClock, FiFileText, FiTrendingUp } from "react-icons/fi";

const TestReportSummary = () => {
  return (
    <div className="bg-white border rounded-md px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Candidate Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FiUser className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-blue-600 font-medium">Candidate</span>
            <span className="text-sm font-semibold text-gray-900">
              John Doe
            </span>
            <span className="text-xs text-gray-500">john.doe@example.com</span>
          </div>
        </div>

        {/* Duration Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <FiClock className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-green-600 font-medium">Duration</span>
            <span className="text-sm font-semibold text-gray-900">
              45 minutes
            </span>
            <span className="text-xs text-gray-500">Submitted: 2024-01-15</span>
            <span className="text-xs text-gray-500">14:30:20</span>
          </div>
        </div>

        {/* Test Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <FiFileText className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-purple-600 font-medium">Test</span>
            <span className="text-sm font-semibold text-gray-900">
              Frontend Developer
            </span>
            <span className="inline-block text-xs bg-gray-100 text-black px-2 py-0.5 rounded-xl mt-1 w-fit">
              graded
            </span>
          </div>
        </div>

        {/* Score Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <FiTrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-orange-600 font-medium">Score</span>
            <span className="text-xl font-bold text-orange-600">85%</span>
            <span className="text-xs text-gray-500">85/100 points</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestReportSummary;
