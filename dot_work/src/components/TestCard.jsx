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
    testName,
    slug,
    hasAttempted,
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
    navigate(`/consent/${slug}`);
  };

  const isDeadlinePassed = new Date(accessDeadline) < new Date();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border flex flex-col justify-between h-full">
      <div>
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
      </div>

      {/* Perform Test Button */}
      <button
        onClick={handleTestAccess}
        disabled={isDeadlinePassed || hasAttempted}
        className={`w-full py-2 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 mt-4 ${
          isDeadlinePassed || hasAttempted
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-blue-700 hover:shadow-md active:bg-blue-800"
        }`}
      >
        <span>
          {isDeadlinePassed
            ? "Test Expired"
            : hasAttempted
            ? "Already Attempted"
            : "Perform Test"}
        </span>
        {!isDeadlinePassed && <MdOpenInNew className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default TestCard;
