import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTestDetails } from "../../src/services";
import { toast } from "react-toastify";
import PageHeader from "../../src/components/common/PageHeader";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

const TestDetails = () => {
  const { testId } = useParams();
  const [testDetails, setTestDetails] = useState(null);

  const fetchTestDetails = async () => {
    try {
      const response = await getTestDetails(testId);
      setTestDetails(response.test);
    } catch (error) {
      toast.error("Failed to fetch test details");
    }
  };

  useEffect(() => {
    fetchTestDetails();
  }, [testId]);

  if (!testDetails) return <div className="p-6 text-center">Loading...</div>;

  return (
    <>
      <PageHeader
        title="Details"
        description="View and manage test details"
        button={{
          label: "Back to Tests",
          icon: MdOutlineArrowCircleLeft,
          to: "/tests",
        }}
      />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 mt-3 overflow-y-auto">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            {testDetails.testName}
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            {testDetails.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
            <div>
              <strong>Duration:</strong> {testDetails.duration} mins
            </div>
            <div>
              <strong>Category:</strong> {testDetails.category}
            </div>
            <div>
              <strong>Proctoring:</strong>{" "}
              {testDetails.enableProctoring ? "Enabled" : "Disabled"}
            </div>
            <div>
              <strong>Full Screen:</strong>{" "}
              {testDetails.fullScreenForce ? "Yes" : "No"}
            </div>
            <div>
              <strong>Screenshot Every:</strong>{" "}
              {testDetails.screenShotFrequency} sec
            </div>
          </div>
        </div>

        {/* Candidates */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Candidates
          </h2>
          {testDetails.candidates.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {testDetails.candidates.map((candidate) => (
                <li
                  key={candidate._id}
                  className="py-2 flex justify-between items-center text-sm"
                >
                  <span>{candidate.email}</span>
                  <span className="text-gray-500">
                    {candidate.hasAttempted ? "Attempted" : "Not Attempted"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No candidates yet.</p>
          )}
        </div>

        {/* Questions */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* MCQs */}
          {testDetails.mcqs.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">MCQs</h3>
              <ul className="space-y-2">
                {testDetails.mcqs.map((q, index) => (
                  <li key={q._id} className="text-sm text-gray-700">
                    <strong>Q{index + 1}:</strong> {q.question} <br />
                    <strong>Marks:</strong> {q.marks}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* True/False */}
          {testDetails.trueFalse.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">True/False</h3>
              <ul className="space-y-2">
                {testDetails.trueFalse.map((q, index) => (
                  <li key={q._id} className="text-sm text-gray-700">
                    <strong>Q{index + 1}:</strong> {q.question} <br />
                    <strong>Marks:</strong> {q.marks}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Descriptive */}
          {testDetails.descriptive.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Descriptive</h3>
              <ul className="space-y-2">
                {testDetails.descriptive.map((q, index) => (
                  <li key={q._id} className="text-sm text-gray-700">
                    <strong>Q{index + 1}:</strong> {q.question} <br />
                    <strong>Marks:</strong> {q.marks}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TestDetails;
