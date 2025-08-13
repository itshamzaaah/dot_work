import {
  MdCalendarToday,
  MdAccessTime,
  MdOpenInNew,
  MdError,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TestCard = ({ testData }) => {
  const navigate = useNavigate();
  const {
    accessDeadline,
    category,
    description,
    duration,
    testLink,
    testName,
    _id,
    slug
  } = testData;

  // Format the deadline date
  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleTestAccess = () => {
    navigate(`/test/${slug}`); 
  };

  const isDeadlinePassed = new Date(accessDeadline) < new Date();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full capitalize">
          {category}
        </span>
        <div className="flex items-center text-gray-500 text-sm">
          <MdAccessTime className="w-4 h-4 mr-1" />
          {duration} min
        </div>
      </div>

      {/* Test Name */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{testName}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

      {/* Deadline */}
      <div className="flex items-center text-sm mb-6">
        <MdCalendarToday
          className={`w-4 h-4 mr-2 ${
            isDeadlinePassed ? "text-red-500" : "text-gray-500"
          }`}
        />
        <span
          className={
            isDeadlinePassed ? "text-red-600 font-medium" : "text-gray-600"
          }
        >
          {isDeadlinePassed ? "Expired: " : "Deadline: "}
          {formatDeadline(accessDeadline)}
        </span>
      </div>

      {/* Perform Test Button */}
      <button
        onClick={handleTestAccess}
        disabled={isDeadlinePassed}
        className={`w-full py-2 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
          isDeadlinePassed
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-blue-700 hover:shadow-md active:bg-blue-800"
        }`}
      >
        <span>{isDeadlinePassed ? "Test Expired" : "Perform Test"}</span>
        {!isDeadlinePassed && <MdOpenInNew className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default TestCard;

const LoadingCard = () => (
  <div className="bg-white rounded-lg shadow-md p-6 border animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="bg-gray-200 h-6 w-20 rounded-full"></div>
      <div className="bg-gray-200 h-4 w-16 rounded"></div>
    </div>
    <div className="bg-gray-200 h-6 w-3/4 rounded mb-3"></div>
    <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
    <div className="bg-gray-200 h-4 w-2/3 rounded mb-6"></div>
    <div className="bg-gray-200 h-4 w-1/2 rounded mb-6"></div>
    <div className="bg-gray-200 h-12 w-full rounded"></div>
  </div>
);

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-16">
    <div className="bg-gray-100 rounded-full p-6 mb-4">
      <MdError className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      No Tests Available
    </h3>
    <p className="text-gray-600 text-center max-w-md">
      You don't have any tests assigned yet. Check back later or contact your
      administrator.
    </p>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-16">
    <div className="bg-red-100 rounded-full p-6 mb-4">
      <AlertCircle className="w-12 h-12 text-red-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Failed to Load Tests
    </h3>
    <p className="text-gray-600 text-center max-w-md mb-4">
      There was an error loading your tests. Please try again.
    </p>
    <button
      onClick={onRetry}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);
