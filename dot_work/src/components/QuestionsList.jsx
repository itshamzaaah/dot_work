import { useSelector } from "react-redux";
import { selectAttempt } from "../store/slices/attemptSlice";
import AnswerEvaluationCard from "./AnswerEvaluationCard";

const QuestionsList = () => {
  const attempt = useSelector(selectAttempt);

  return (
    <div className="mx-auto">
      {attempt?.evaluation?.perQuestion.map((q, idx) => (
        <AnswerEvaluationCard key={q.id} question={q} index={idx} />
      ))}
    </div>
  );
};

export default QuestionsList;
