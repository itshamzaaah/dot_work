import { useState } from "react";
import { FaPlus, FaRegFileAlt, FaTrash } from "react-icons/fa";

const StepTwo = () => {
  const [mcqs, setMcqs] = useState([]);
  const [trueFalse, setTrueFalse] = useState([]);
  const [descriptive, setDescriptive] = useState([]);

  console.log("mcqs", mcqs);
  console.log("trueFalse", trueFalse);
  console.log("descriptive", descriptive);

  const addMcq = () => {
    const newMCQ = {
      id: Date.now(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 1,
    };

    setMcqs([...mcqs, newMCQ]);
  };

  const addTrueFalse = () => {
    const newTrueFalse = {
      id: Date.now(),
      question: "",
      correctAnswer: "",
      marks: 1,
    };

    setTrueFalse([...trueFalse, newTrueFalse]);
  };

  const addDescriptive = () => {
    const newDescriptive = {
      id: Date.now(),
      question: "",
      marks: 1,
    };

    setDescriptive([...descriptive, newDescriptive]);
  };

  const updateMcq = (id, field, value) => {
    setMcqs((prev) =>
      prev.map((mcq) => (mcq.id === id ? { ...mcq, [field]: value } : mcq))
    );
  };

  const updateTrueFalse = (id, field, value) => {
    setTrueFalse((prev) =>
      prev.map((tf) => (tf.id === id ? { ...tf, [field]: value } : tf))
    );
  };

  const updateDescriptive = (id, field, value) => {
    setDescriptive((prev) =>
      prev.map((desc) => (desc.id === id ? { ...desc, [field]: value } : desc))
    );
  };

  const updateOption = (id, index, value) => {
    setMcqs((prev) =>
      prev.map((mcq) =>
        mcq.id === id
          ? {
              ...mcq,
              options: mcq.options.map((option, i) =>
                i === index ? value : option
              ),
            }
          : mcq
      )
    );
  };

  const deleteMcq = (id) => {
    setMcqs((prev) => prev.filter((mcq) => mcq.id !== id));
  };

  const deleteTrueFalse = (id) => {
    setTrueFalse((prev) => prev.filter((tf) => tf.id !== id));
  };

  const deleteDescriptive = (id) => {
    setDescriptive((prev) => prev.filter((desc) => desc.id !== id));
  };

  // Combine all questions for numbering
  const allQuestions = [
    ...mcqs.map(mcq => ({ ...mcq, type: 'MCQ' })),
    ...trueFalse.map(tf => ({ ...tf, type: 'TRUE/FALSE' })),
    ...descriptive.map(desc => ({ ...desc, type: 'DESCRIPTIVE' }))
  ].sort((a, b) => a.id - b.id);

  return (
    <div className="max-w-[17rem] md:max-w-full">
      <div className="">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Add Questions
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Create different types of questions for your assessment
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={addMcq}
            className="flex items-center gap-2 border border-gray-300 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <FaPlus className="text-gray-500" /> Add MCQ
          </button>

          <button
            onClick={addTrueFalse}
            className="flex items-center gap-2 border border-gray-300 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <FaPlus className="text-gray-500" /> Add True/False
          </button>
          
          <button
            onClick={addDescriptive}
            className="flex items-center gap-2 border border-gray-300 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <FaPlus className="text-gray-500" /> Add Descriptive
          </button>
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

        {/* Render all questions in order */}
        {allQuestions.map((question, index) => {
          if (question.type === 'MCQ') {
            return (
              <div
                key={question.id}
                className="border rounded-lg p-4 mb-6 relative bg-gray-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium px-2 py-1 border rounded-full text-gray-600">
                      Question {index + 1}
                    </span>
                    <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                      MCQ
                    </span>
                  </div>
                  <button onClick={() => deleteMcq(question.id)}>
                    <FaTrash className="text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                {/* Question */}
                <label className="text-sm font-medium mb-1 block">Question</label>
                <textarea
                  value={question.question}
                  onChange={(e) => updateMcq(question.id, "question", e.target.value)}
                  placeholder="Enter your question here..."
                  className="w-full border rounded px-3 py-2 text-sm mb-4"
                />

                {/* Options */}
                <label className="text-sm font-medium mb-1 block">Options</label>
                {question.options.map((opt, i) => (
                  <div key={i} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`option-${question.id}`}
                      className="mr-2"
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => updateOption(question.id, i, e.target.value)}
                      className="flex-1 border rounded px-3 py-2 text-sm"
                      placeholder={`Option ${i + 1}`}
                    />
                  </div>
                ))}

                {/* Marks & Correct Answer */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Marks:</label>
                    <input
                      type="number"
                      min={1}
                      value={question.marks}
                      onChange={(e) =>
                        updateMcq(question.id, "marks", Number(e.target.value))
                      }
                      className="w-16 border rounded px-2 py-1 text-sm"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                    <label className="text-sm font-medium">Correct Answer:</label>
                    <input
                      type="text"
                      value={question.correctAnswer}
                      onChange={(e) =>
                        updateMcq(question.id, "correctAnswer", e.target.value)
                      }
                      className="border rounded px-3 py-2 text-sm"
                      placeholder="Enter correct answer"
                    />
                  </div>
                </div>
              </div>
            );
          } else if (question.type === 'TRUE/FALSE') {
            return (
              <div
                key={question.id}
                className="border rounded-lg p-4 mb-6 relative bg-gray-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium px-2 py-1 border rounded-full text-gray-600">
                      Question {index + 1}
                    </span>
                    <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                      TRUE/FALSE
                    </span>
                  </div>
                  <button onClick={() => deleteTrueFalse(question.id)}>
                    <FaTrash className="text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                {/* Question */}
                <label className="text-sm font-medium mb-1 block">Question</label>
                <textarea
                  value={question.question}
                  onChange={(e) => updateTrueFalse(question.id, "question", e.target.value)}
                  placeholder="Enter your question here..."
                  className="w-full border rounded px-3 py-2 text-sm mb-4"
                  rows={4}
                />

                {/* Marks & Correct Answer */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Marks:</label>
                    <input
                      type="number"
                      min={1}
                      value={question.marks}
                      onChange={(e) =>
                        updateTrueFalse(question.id, "marks", Number(e.target.value))
                      }
                      className="w-16 border rounded px-2 py-1 text-sm"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                    <label className="text-sm font-medium">Correct Answer:</label>
                    <select
                      value={question.correctAnswer}
                      onChange={(e) =>
                        updateTrueFalse(question.id, "correctAnswer", e.target.value)
                      }
                      className="border rounded px-3 py-2 text-sm"
                    >
                      <option value="">Select correct answer</option>
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          } else if (question.type === 'DESCRIPTIVE') {
            return (
              <div
                key={question.id}
                className="border rounded-lg p-4 mb-6 relative bg-gray-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium px-2 py-1 border rounded-full text-gray-600">
                      Question {index + 1}
                    </span>
                    <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                      DESCRIPTIVE
                    </span>
                  </div>
                  <button onClick={() => deleteDescriptive(question.id)}>
                    <FaTrash className="text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                {/* Question */}
                <label className="text-sm font-medium mb-1 block">Question</label>
                <textarea
                  value={question.question}
                  onChange={(e) => updateDescriptive(question.id, "question", e.target.value)}
                  placeholder="Enter your question here..."
                  className="w-full border rounded px-3 py-2 text-sm mb-4"
                  rows={4}
                />

                {/* Marks */}
                <div className="flex items-center gap-2 mt-4">
                  <label className="text-sm font-medium">Marks:</label>
                  <input
                    type="number"
                    min={1}
                    value={question.marks}
                    onChange={(e) =>
                      updateDescriptive(question.id, "marks", Number(e.target.value))
                    }
                    className="w-16 border rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default StepTwo;