import { useSelector } from "react-redux";
import { selectAttempt } from "../store/slices/attemptSlice";
import AnswerEvaluationCard from "./AnswerEvaluationCard";

const QuestionsList = () => {
  const attempt = useSelector(selectAttempt);
  
  return (
    <div className="mx-auto w-full">
      {attempt?.evaluation?.perQuestion.map((q, idx) => (
        <AnswerEvaluationCard key={q.questionId} question={q} index={idx} />
      ))}
    </div>
  );
};

export default QuestionsList;
