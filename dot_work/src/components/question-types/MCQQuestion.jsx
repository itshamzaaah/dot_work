const MCQQuestion = ({ question, answer, setAnswer }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
      <div className="space-y-2">
        {question.options?.map((option, idx) => (
          <label key={idx} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={question._id}
              value={option}
              checked={answer === option}
              onChange={(e) => setAnswer(e.target.value)}
              className="h-4 w-4"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MCQQuestion;
