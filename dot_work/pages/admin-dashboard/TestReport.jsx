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
  fetchAttemptScreenshots,
} from "../../src/store/slices/attemptSlice";
import { selectUser } from "../../src/store/slices/authSlice";
import TabsBar from "../../src/components/common/TabsBar";

const TestReport = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState("questions");

  useEffect(() => {
    if (id) {
      dispatch(fetchAttemptDetails(id));
      dispatch(fetchAttemptScreenshots(id));
    }
  }, [id, dispatch]);

  const tabs = [
    { id: "questions", label: "Questions" },
    { id: "aiEvaluation", label: "AI Evaluation" },
    { id: "screenshots", label: "Screenshots" },
  ];

  return (
    <div className="flex flex-col gap-y-3">
      <TestReportSummary />

      <TabsBar tabs={tabs} value={activeTab} onChange={setActiveTab} />
      {activeTab === "questions" && (
        <>
          <QuestionsList />
          {user?.role !== "CANDIDATE" && <AddRemarks />}
        </>
      )}
      {activeTab === "aiEvaluation" && <AIEvaluationSummary />}
      {activeTab === "screenshots" && user?.role !== "CANDIDATE" ? (
        <ProctoringScreenshots />
      ) : (
        <h2 className="flex justify-center items-center font-semibold">You don't have access to this tab</h2>
      )}
    </div>
  );
};

export default TestReport;
