import { useState } from "react";
import TestReportSummary from "../../src/components/TestReportSummary";
import QuestionsList from "../../src/components/QuestionsList";
import AIEvaluationSummary from "../../src/components/AIEvaluationSummary";
import ProctoringScreenshots from "../../src/components/ProctoringScreenshots";
import AddRemarks from "../../src/components/AddRemarks";

const TestReport = () => {
  const [activeTab, setActiveTab] = useState("questions");
  return (
    <div className="flex flex-col gap-y-3">
      <TestReportSummary />
      <div className="bg-gray-200 text-sm rounded text-white p-2 flex gap-x-2 justify-between items-center">
        <button
          className={`${
            activeTab === "questions"
              ? "bg-primary text-white"
              : "text-gray-600"
          } px-2 py-2 rounded flex-1`}
          onClick={() => setActiveTab("questions")}
        >
          Questions Answers
        </button>
        <button
          className={`${
            activeTab === "aiEvaluation"
              ? "bg-primary text-white"
              : "text-gray-600"
          } px-2 py-2 rounded flex-1`}
          onClick={() => setActiveTab("aiEvaluation")}
        >
          AI Evaluation
        </button>
        <button
          className={`${
            activeTab === "screenshots"
              ? "bg-primary text-white"
              : "text-gray-600"
          } px-2 py-2 rounded flex-1`}
          onClick={() => setActiveTab("screenshots")}
        >
          Screenshots
        </button>
      </div>
      {activeTab === "questions" && (
        <>
          <QuestionsList />
          <AddRemarks />
        </>
      )}
      {activeTab === "aiEvaluation" && <AIEvaluationSummary />}
      {activeTab === "screenshots" && <ProctoringScreenshots />}
    </div>
  );
};

export default TestReport;
