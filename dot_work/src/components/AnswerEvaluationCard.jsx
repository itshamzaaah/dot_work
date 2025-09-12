import clsx from "clsx";
import { formatQuestionType } from "../helpers";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const getTypeBadge = (type) => {
  switch (type) {
    case "mcq":
      return "bg-blue-100 text-blue-800";
    case "trueFalse":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AnswerEvaluationCard = ({ question, index }) => {
  const {
    type,
    maxMarks,
    awardedMarks,
    prompt,
    candidateAnswer,
    correctness,
    feedback,
  } = question;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-700">
          Question {index + 1}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={clsx(
              "px-2 py-0.5 rounded-full font-medium",
              getTypeBadge(type)
            )}
          >
            {formatQuestionType(type)}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 font-medium">
            {awardedMarks}/{maxMarks} Max Marks
          </span>
        </div>
      </div>

      <p className="text-gray-800 font-semibold">{prompt}</p>

      <div className="flex justify-between gap-4 text-sm">
        <div className="w-4/5">
          <p className="font-semibold text-gray-600 mb-1">Candidate Answer</p>
          <div className="bg-blue-50 border border-blue-200 rounded p-2 text-gray-800">
            {candidateAnswer?.toString()}
          </div>
        </div>
        <div className="w-fit">
          <p className="font-semibold text-gray-600 mb-1">Status</p>
          <div
            className={`flex justify-center items-center ${
              correctness === "correct" ? "bg-green-50" : "bg-red-50"
            } rounded p-2 text-gray-800`}
          >
            {correctness === "correct" ? (
              <IoCheckmark className="text-green-400 font-bold" size={22} />
            ) : (
              <RxCross2 className="text-red-400 font-bold" size={22} />
            )}
          </div>
        </div>
      </div>

      {feedback && (
        <div className="mt-4">
          <p className="text-xs text-gray-400 mb-1">AI Remarks</p>
          <div className="text-sm bg-gray-50 border border-gray-200 rounded p-2 text-gray-700">
            {feedback}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerEvaluationCard;
