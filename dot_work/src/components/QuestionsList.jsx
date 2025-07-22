
import { sampleQuestions } from "../constants/data";
import AnswerEvaluationCard from "./AnswerEvaluationCard";

const QuestionsList = () => {
  return (
    <div className="mx-auto py-6">
      {sampleQuestions.map((q, idx) => (
        <AnswerEvaluationCard key={q.id} question={q} index={idx} />
      ))}
    </div>
  );
};

export default QuestionsList;
