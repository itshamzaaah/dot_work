import { useEffect, useState } from "react";
import TestReportSummary from "../../src/components/TestReportSummary";
import QuestionsList from "../../src/components/QuestionsList";
import AIEvaluationSummary from "../../src/components/AIEvaluationSummary";
import ProctoringScreenshots from "../../src/components/ProctoringScreenshots";
import AddRemarks from "../../src/components/AddRemarks";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttemptDetails,
  selectAttempt,
  selectError,
} from "../../src/store/slices/attemptSlice";

const TestReport = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const attempt = useSelector(selectAttempt);
  const error = useSelector(selectError);
  const [activeTab, setActiveTab] = useState("questions");

  useEffect(() => {
    if (id) dispatch(fetchAttemptDetails(id));
  }, [id]);

  useEffect(() => {});

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
