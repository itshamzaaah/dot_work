const TrueFalseQuestion = ({ question, answer, setAnswer }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={question._id}
            value="true"
            checked={answer === "true"}
            onChange={(e) => setAnswer(e.target.value)}
            className="h-4 w-4"
          />
          <span>True</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={question._id}
            value="false"
            checked={answer === "false"}
            onChange={(e) => setAnswer(e.target.value)}
            className="h-4 w-4"
          />
          <span>False</span>
        </label>
      </div>
    </div>
  );
};

export default TrueFalseQuestion;
