import { FaRegFileAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setDescriptive,
  setMcqs,
  setTrueFalse,
} from "../../store/slices/createTestSlice";
import AddBtn from "../AddBtn";

const StepTwo = ({ errors = {} }) => {
  const dispatch = useDispatch();
  const { mcqs, trueFalse, descriptive } = useSelector(
    (state) => state.testForm.stepTwo
  );

  // ------------------------
  // MCQ Handlers
  // ------------------------

  const addMcq = () => {
    const newMCQ = {
      id: crypto.randomUUID(),
      question: "",
      options: ["", ""], // Start with 2 options
      correctAnswer: "",
      marks: 1,
    };
    dispatch(setMcqs([...mcqs, newMCQ]));
  };

  const updateMcq = (id, field, value) => {
    dispatch(
      setMcqs(
        mcqs.map((mcq) => (mcq.id === id ? { ...mcq, [field]: value } : mcq))
      )
    );
  };

  const updateOption = (id, index, value) => {
    dispatch(
      setMcqs(
        mcqs.map((mcq) =>
          mcq.id === id
            ? {
                ...mcq,
                options: mcq.options.map((opt, i) =>
                  i === index ? value : opt
                ),
              }
            : mcq
        )
      )
    );
  };

  const addOption = (id) => {
    dispatch(
      setMcqs(
        mcqs.map((mcq) =>
          mcq.id === id ? { ...mcq, options: [...mcq.options, ""] } : mcq
        )
      )
    );
  };

  const deleteMcq = (id) =>
    dispatch(setMcqs(mcqs.filter((mcq) => mcq.id !== id)));

  // ------------------------
  // True/False Handlers
  // ------------------------

  const addTrueFalse = () => {
    const newTF = {
      id: crypto.randomUUID(),
      question: "",
      correctAnswer: "",
      marks: 1,
    };
    dispatch(setTrueFalse([...trueFalse, newTF]));
  };

  const updateTrueFalse = (id, field, value) => {
    dispatch(
      setTrueFalse(
        trueFalse.map((tf) => (tf.id === id ? { ...tf, [field]: value } : tf))
      )
    );
  };

  const deleteTrueFalse = (id) =>
    dispatch(setTrueFalse(trueFalse.filter((tf) => tf.id !== id)));

  // ------------------------
  // Descriptive Handlers
  // ------------------------

  const addDescriptive = () => {
    const newDesc = {
      id: crypto.randomUUID(),
      question: "",
      marks: 1,
    };
    dispatch(setDescriptive([...descriptive, newDesc]));
  };

  const updateDescriptive = (id, field, value) => {
    dispatch(
      setDescriptive(
        descriptive.map((desc) =>
          desc.id === id ? { ...desc, [field]: value } : desc
        )
      )
    );
  };

  const deleteDescriptive = (id) =>
    dispatch(setDescriptive(descriptive.filter((desc) => desc.id !== id)));

  // ------------------------
  // All Questions Combined
  // ------------------------

  const allQuestions = [
    ...mcqs.map((q, i) => ({ ...q, type: "MCQ", _index: i })),
    ...trueFalse.map((q, i) => ({ ...q, type: "TRUE_FALSE", _index: i })),
    ...descriptive.map((q, i) => ({ ...q, type: "DESCRIPTIVE", _index: i })),
  ].sort((a, b) => a.id.localeCompare(b.id));

  // ------------------------
  // Render
  // ------------------------

  return (
    <div className="max-w-[17rem] md:max-w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Add Questions
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Create different types of questions for your assessment
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-12">
        <AddBtn label="Add MCQ" onClick={addMcq} />
        <AddBtn label="Add True/False" onClick={addTrueFalse} />
        <AddBtn label="Add Descriptive" onClick={addDescriptive} />
      </div>

      {/* Empty State */}
      {allQuestions.length === 0 && (
        <div className="flex flex-col items-center text-gray-400">
          <FaRegFileAlt className="text-4xl mb-3" />
          <p className="text-sm text-center max-w-xs">
            No questions added yet. Click the buttons above to start creating
            questions.
          </p>
        </div>
      )}

      {/* Question Cards */}
      {allQuestions.map((q, index) => {
        const qErrors =
          q.type === "MCQ"
            ? errors.mcqs?.[q._index]
            : q.type === "TRUE_FALSE"
            ? errors.trueFalse?.[q._index]
            : errors.descriptive?.[q._index];

        return (
          <div key={q.id} className="bg-gray-50 border rounded-lg p-4 mb-6">
            {/* Header */}
            <div className="flex justify-between mb-3">
              <div>
                <span className="text-sm font-medium mr-2">
                  Question {index + 1}
                </span>
                <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                  {q.type.replace("_", "/")}
                </span>
              </div>
              <button
                onClick={() =>
                  q.type === "MCQ"
                    ? deleteMcq(q.id)
                    : q.type === "TRUE_FALSE"
                    ? deleteTrueFalse(q.id)
                    : deleteDescriptive(q.id)
                }
              >
                <FaTrash className="text-gray-400 hover:text-red-500" />
              </button>
            </div>

            {/* Question Field */}
            <label className="block text-sm font-medium mb-1">Question</label>
            <textarea
              value={q.question}
              onChange={(e) =>
                q.type === "MCQ"
                  ? updateMcq(q.id, "question", e.target.value)
                  : q.type === "TRUE_FALSE"
                  ? updateTrueFalse(q.id, "question", e.target.value)
                  : updateDescriptive(q.id, "question", e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />
            {qErrors?.question && (
              <p className="text-sm text-red-500 mt-1">{qErrors.question}</p>
            )}

            {/* MCQ Options */}
            {q.type === "MCQ" && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium mt-4 mb-1">
                    Options
                  </label>
                  <AddBtn
                    label="Add Option"
                    onClick={() => addOption(q.id)}
                    width={2}
                  />
                </div>

                {q.options.map((opt, i) => (
                  <div key={i} className="flex items-center mb-2">
                    <input type="radio" disabled className="mr-2" />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => updateOption(q.id, i, e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm"
                      placeholder={`Option ${i + 1}`}
                    />
                  </div>
                ))}

                {/* Option Errors */}
                {Object.entries(qErrors || {}).map(([key, val]) =>
                  key.startsWith("option") ? (
                    <p key={key} className="text-sm text-red-500">
                      {val}
                    </p>
                  ) : null
                )}
              </>
            )}

            {/* Marks Field */}
            <div className="mt-4 flex items-center gap-2">
              <label className="text-sm font-medium">Points:</label>
              <input
                type="number"
                value={q.marks}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  q.type === "MCQ"
                    ? updateMcq(q.id, "marks", value)
                    : q.type === "TRUE_FALSE"
                    ? updateTrueFalse(q.id, "marks", value)
                    : updateDescriptive(q.id, "marks", value);
                }}
                className="w-20 border rounded px-2 py-1 text-sm"
                min={1}
              />
              {qErrors?.marks && (
                <p className="text-sm text-red-500">{qErrors.marks}</p>
              )}
            </div>

            {/* Correct Answer */}
            {(q.type === "MCQ" || q.type === "TRUE_FALSE") && (
              <div className="mt-4 flex flex-col md:flex-row gap-2 items-start md:items-center">
                {q.type === "TRUE_FALSE" ? (
                  <>
                    <label className="text-sm font-medium">
                      Correct Answer:
                    </label>
                    <select
                      value={q.correctAnswer}
                      onChange={(e) =>
                        updateTrueFalse(q.id, "correctAnswer", e.target.value)
                      }
                      className="border rounded px-3 py-2 text-sm"
                    >
                      <option value="">Select correct answer</option>
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  </>
                ) : (
                  <input
                    type="text"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      updateMcq(q.id, "correctAnswer", e.target.value)
                    }
                    className="border rounded px-3 py-2 text-sm"
                    placeholder="Enter correct answer"
                  />
                )}
                {qErrors?.correctAnswer && (
                  <p className="text-sm text-red-500">
                    {qErrors.correctAnswer}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepTwo;
