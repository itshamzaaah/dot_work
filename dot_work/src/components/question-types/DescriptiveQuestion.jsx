const DescriptiveQuestion = ({ question, answer, setAnswer }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
      <textarea
        className="w-full p-3 border rounded focus:outline-none focus:ring"
        rows={6}
        value={answer || ""}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
      />
    </div>
  );
};

export default DescriptiveQuestion;
