import clsx from "clsx";

const getTypeBadge = (type) => {
  switch (type) {
    case "MCQ":
      return "bg-blue-100 text-blue-800";
    case "TRUE_FALSE":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AnswerEvaluationCard = ({ question, index }) => {
  const {
    type,
    marks,
    awardedMarks,
    question: text,
    candidateAnswer,
    correctAnswer,
    aiRemarks,
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
            {type}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 font-medium">
            {awardedMarks}/{marks} marks
          </span>
        </div>
      </div>

      <p className="font-medium text-gray-800">{text}</p>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold text-gray-600 mb-1">Candidate Answer</p>
          <div className="bg-blue-50 border border-blue-200 rounded p-2 text-gray-800">
            {candidateAnswer}
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-600 mb-1">Correct Answer</p>
          <div className="bg-green-50 border border-green-200 rounded p-2 text-gray-800">
            {correctAnswer}
          </div>
        </div>
      </div>

      {aiRemarks && (
        <div className="mt-4">
          <p className="text-xs text-gray-400 mb-1">AI Remarks</p>
          <div className="text-sm bg-gray-50 border border-gray-200 rounded p-2 text-gray-700">
            {aiRemarks}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerEvaluationCard;
