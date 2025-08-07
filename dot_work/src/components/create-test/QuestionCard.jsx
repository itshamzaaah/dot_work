import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setMcqs,
  setTrueFalse,
  setDescriptive,
} from "../../store/slices/createTestSlice";
import MCQOptions from "./MCQOptions";

const QuestionCard = ({ question, index, errors }) => {
  const dispatch = useDispatch();
  const { mcqs, trueFalse, descriptive } = useSelector(
    (state) => state.testForm.stepTwo
  );
  const qErrors =
    question.type === "MCQ"
      ? errors.mcqs?.[question._index]
      : question.type === "TRUE_FALSE"
      ? errors.trueFalse?.[question._index]
      : errors.descriptive?.[question._index];

  const update = (field, value) => {
    if (question.type === "MCQ") {
      const updated = mcqs.map((q) =>
        q.id === question.id ? { ...q, [field]: value } : q
      );
      dispatch(setMcqs(updated));
    } else if (question.type === "TRUE_FALSE") {
      const updated = trueFalse.map((q) =>
        q.id === question.id ? { ...q, [field]: value } : q
      );
      dispatch(setTrueFalse(updated));
    } else {
      const updated = descriptive.map((q) =>
        q.id === question.id ? { ...q, [field]: value } : q
      );
      dispatch(setDescriptive(updated));
    }
  };

  const deleteQuestion = () => {
    if (question.type === "MCQ")
      dispatch(setMcqs(mcqs.filter((q) => q.id !== question.id)));
    else if (question.type === "TRUE_FALSE")
      dispatch(setTrueFalse(trueFalse.filter((q) => q.id !== question.id)));
    else
      dispatch(setDescriptive(descriptive.filter((q) => q.id !== question.id)));
  };

  return (
    <div className="bg-gray-50 border rounded-lg p-4 mb-6">
      <div className="flex justify-between mb-3">
        <div>
          <span className="text-sm font-medium mr-2">Question {index + 1}</span>
          <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
            {question.type.replace("_", "/")}
          </span>
        </div>
        <button onClick={deleteQuestion}>
          <FaTrash className="text-gray-400 hover:text-red-500" />
        </button>
      </div>

      <label className="block text-sm font-medium mb-1">Question</label>
      <textarea
        value={question.question}
        onChange={(e) => update("question", e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
      />
      {qErrors?.question && (
        <p className="text-sm text-red-500 mt-1">{qErrors.question}</p>
      )}

      {/* MCQ Options */}
      {question.type === "MCQ" && (
        <MCQOptions question={question} errors={qErrors} update={update} />
      )}

      {/* Marks */}
      <div className="mt-4 flex items-center gap-2">
        <label className="text-sm font-medium">Points:</label>
        <input
          type="number"
          min={1}
          value={question.marks}
          onChange={(e) => update("marks", Number(e.target.value))}
          className="w-20 border rounded px-2 py-1 text-sm"
        />
        {qErrors?.marks && (
          <p className="text-sm text-red-500">{qErrors.marks}</p>
        )}
      </div>

      {/* For future use */}
      {/* Correct Answer */}
      {/* {(question.type === "MCQ" || question.type === "TRUE_FALSE") && (
        <div className="mt-4 flex flex-col md:flex-row gap-2 items-start md:items-center">
          <label className="text-sm font-medium">Correct Answer:</label>
          {question.type === "TRUE_FALSE" ? (
            <select
              value={question.correctAnswer}
              onChange={(e) => update("correctAnswer", e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">Select correct answer</option>
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
          ) : (
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) => update("correctAnswer", e.target.value)}
              className="border rounded px-3 py-2 text-sm"
              placeholder="Enter correct answer"
            />
          )}
          {qErrors?.correctAnswer && (
            <p className="text-sm text-red-500">{qErrors.correctAnswer}</p>
          )}
        </div>
      )} */}
    </div>
  );
};

export default QuestionCard;
