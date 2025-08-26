import { HiArrowTrendingUp, HiOutlineArrowTrendingDown } from "react-icons/hi2";
import { PiSealCheckFill } from "react-icons/pi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { TiStarFullOutline } from "react-icons/ti";
import { AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectAttempt } from "../store/slices/attemptSlice";

const AIEvaluationSummary = () => {
  const attempt = useSelector(selectAttempt);


  const ProgressBar = ({ score }) => (
    <div className="w-full bg-gray-200 lg:max-w-xl mx-auto rounded-full h-3 my-2">
      <div
        className="bg-blue-600 h-3 rounded-full"
        style={{ width: `${score}%` }}
      />
    </div>
  );

  return (
    <div className="p-6 border rounded-lg shadow bg-white space-y-6">
      <div>
        <h2 className="text-xl font-semibold">AI Evaluation Summary</h2>
        <p className="text-gray-500 text-sm">
          Comprehensive analysis powered by AI
        </p>
      </div>

      <div className="text-center">
        <span className="text-3xl font-bold text-blue-600">{attempt?.evaluation?.percentage}%</span>
        <ProgressBar score={attempt?.evaluation?.percentage} />
        <p className="text-gray-600">Overall Performance Score</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Strengths */}
        <div className="bg-green-50 border border-green-200 p-4 rounded w-full">
          <h3 className={`${attempt?.evaluation?.percentage ? "text-green-700" : "text-gray-500"} font-semibold mb-2 flex items-center gap-x-2`}>
            <HiArrowTrendingUp size={20} /> Overall Feedback
          </h3>
          <div className="space-y-1">
            <p className="text-green-700">
              {attempt?.evaluation?.overallFeedback}
            </p>
          </div>
        </div>

        {/* For future use */}
        {/* Areas for Improvement */}
        {/* <div className="bg-red-50 border border-red-200 p-4 rounded w-full">
          <h3 className="text-red-700 font-semibold mb-2 flex items-center gap-x-2">
            <HiOutlineArrowTrendingDown size={20} /> Areas for Improvement
          </h3>
          <ul className="space-y-1">
            {improvements.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-red-700">
                <IoCloseCircleSharp size={18} className="mt-0.5 text-red-600" />
                {item}
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      {/* Recommendations */}
      {/* <div className="bg-blue-50 border border-blue-200 p-4 rounded">
        <h3 className="text-blue-700 font-semibold mb-2 flex items-center gap-x-2">
          <AiOutlineLike size={20} /> Recommendations
        </h3>
        <ul className="space-y-1">
          {recommendations.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-blue-700">
              <TiStarFullOutline size={18} className="text-blue-600 text-xl" />
              {item}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default AIEvaluationSummary;
