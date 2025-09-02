import { useSelector } from "react-redux";
import { FiInbox } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import PageHeader from "../../src/components/common/PageHeader";

const PreviewQuestions = () => {
  const { mcqs, trueFalse, descriptive } = useSelector(
    (state) => state.testForm.stepTwo
  );

  const isEmpty =
    mcqs.length === 0 && trueFalse.length === 0 && descriptive.length === 0;

  return (
    <>
      <PageHeader
        title="Preview Questions"
        description="Review the questions before finalizing the test"
        button={{
          label: "Back to Test",
          icon: IoArrowBackCircleOutline,
          to: "/create-test",
        }}
      />
      <div className="p-6 max-w-4xl mx-auto overflow-y-auto">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
            <FiInbox size={48} className="mb-4" />
            <p className="text-lg font-medium">No questions added yet.</p>
            <p className="text-sm text-gray-400">
              Once you add MCQs, True/False or Descriptive questions, they’ll
              appear here.
            </p>
          </div>
        ) : (
          <>
            {/* MCQs */}
            {mcqs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-primary mb-4">
                  Multiple Choice Questions
                </h2>
                <div className="space-y-4">
                  {mcqs.map((question, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-sm border rounded-lg p-4"
                    >
                      <p className="font-medium text-gray-800 mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <ul className="list-disc ml-5 text-gray-700 space-y-1">
                        {question.options.map((opt, i) => (
                          <li
                            key={i}
                            className={`${
                              question.answer === opt
                                ? "text-green-600 font-semibold"
                                : ""
                            }`}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm mt-2 text-gray-500">
                        Marks: {question.marks}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* True/False */}
            {trueFalse.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-purple-600 mb-4">
                  True / False Questions
                </h2>
                <div className="space-y-4">
                  {trueFalse.map((question, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-sm border rounded-lg p-4"
                    >
                      <p className="font-medium text-gray-800 mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          question.answer === "True"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      ></p>
                      <p className="text-sm mt-1 text-gray-500">
                        Marks: {question.marks}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Descriptive */}
            {descriptive.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-orange-600 mb-4">
                  Descriptive Questions
                </h2>
                <div className="space-y-4">
                  {descriptive.map((question, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-sm border rounded-lg p-4"
                    >
                      <p className="font-medium text-gray-800 mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <p className="text-sm mt-1 text-gray-500">
                        Marks: {question.marks}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PreviewQuestions;
