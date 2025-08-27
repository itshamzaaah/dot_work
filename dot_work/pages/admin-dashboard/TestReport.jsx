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
  selectAttempt,
} from "../../src/store/slices/attemptSlice";
import { selectUser } from "../../src/store/slices/authSlice";
import TabsBar from "../../src/components/common/TabsBar";
import PageHeader from "../../src/components/common/PageHeader";
import { LuDownload } from "react-icons/lu";

const TestReport = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const attempt = useSelector(selectAttempt);
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
    <>
      <PageHeader
        title="Test Report"
        description={`${attempt?.candidate?.name} - ${attempt?.submission?.raw?.test?.testName}`}
        button={{
          label: "Download PDF",
          icon: LuDownload,
        }}
      />
      <div className="flex flex-col gap-y-3 flex-1 p-4 md:p-4 bg-gray-50 overflow-auto">
        <TestReportSummary />

        <TabsBar tabs={tabs} value={activeTab} onChange={setActiveTab} />
        {activeTab === "questions" && (
          <>
            <QuestionsList />
            {user?.role !== "CANDIDATE" && <AddRemarks />}
          </>
        )}
        {activeTab === "aiEvaluation" && <AIEvaluationSummary />}
        {activeTab === "screenshots" && user?.role !== "CANDIDATE" && (
          <ProctoringScreenshots />
        )}
      </div>
    </>
  );
};

export default TestReport;
