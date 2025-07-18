import { useDispatch, useSelector } from "react-redux";
import { setMcqs } from "../../store/slices/createTestSlice";
import AddBtn from "../AddBtn";

const MCQOptions = ({ question, errors = {}, update }) => {
  const dispatch = useDispatch();
  const { mcqs } = useSelector((state) => state.testForm.stepTwo);

  const updateOption = (index, value) => {
    const updated = mcqs.map((q) =>
      q.id === question.id
        ? {
            ...q,
            options: q.options.map((opt, i) => (i === index ? value : opt)),
          }
        : q
    );
    dispatch(setMcqs(updated));
  };

  const addOption = () => {
    const updated = mcqs.map((q) =>
      q.id === question.id
        ? { ...q, options: [...q.options, ""] }
        : q
    );
    dispatch(setMcqs(updated));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium mt-4 mb-1">Options</label>
        <AddBtn label="Add Option" onClick={addOption} width={2} />
      </div>

      {question.options.map((opt, i) => (
        <div key={i} className="flex items-center mb-2">
          <input type="radio" disabled className="mr-2" />
          <input
            type="text"
            value={opt}
            onChange={(e) => updateOption(i, e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder={`Option ${i + 1}`}
          />
        </div>
      ))}

      {/* Option Errors */}
      {Object.entries(errors).map(([key, val]) =>
        key.startsWith("option") ? (
          <p key={key} className="text-sm text-red-500">
            {val}
          </p>
        ) : null
      )}
    </>
  );
};

export default MCQOptions;
