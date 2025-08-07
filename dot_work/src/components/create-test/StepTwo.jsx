import { FaRegFileAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setDescriptive,
  setMcqs,
  setTrueFalse,
} from "../../store/slices/createTestSlice";
import AddBtn from "../AddBtn";
import QuestionCard from "./QuestionCard";

const StepTwo = ({ errors = {} }) => {
  const dispatch = useDispatch();
  const { mcqs, trueFalse, descriptive } = useSelector(
    (state) => state.testForm.stepTwo
  );

  const addMcq = () =>
    dispatch(
      setMcqs([
        ...mcqs,
        {
          id: new Date().toISOString(),
          question: "",
          options: ["", ""],
          // correctAnswer: "",
          marks: 1,
        },
      ])
    );

  const addTrueFalse = () =>
    dispatch(
      setTrueFalse([
        ...trueFalse,
        {
          id: new Date().toISOString(),
          question: "",
          // correctAnswer: "",
          marks: 1,
        },
      ])
    );

  const addDescriptive = () =>
    dispatch(
      setDescriptive([
        ...descriptive,
        {
          id: new Date().toISOString(),
          question: "",
          marks: 1,
        },
      ])
    );

  const allQuestions = [
    ...mcqs.map((q, i) => ({ ...q, type: "MCQ", _index: i })),
    ...trueFalse.map((q, i) => ({ ...q, type: "TRUE_FALSE", _index: i })),
    ...descriptive.map((q, i) => ({ ...q, type: "DESCRIPTIVE", _index: i })),
  ].sort((a, b) => b.id.localeCompare(a.id));

  return (
    <div className="max-w-[17rem] md:max-w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Add Questions</h2>
      <p className="text-sm text-gray-500 mb-6">
        Create different types of questions for your assessment
      </p>

      <div className="flex flex-wrap gap-4 mb-12">
        <AddBtn label="Add MCQ" onClick={addMcq} />
        <AddBtn label="Add True/False" onClick={addTrueFalse} />
        <AddBtn label="Add Descriptive" onClick={addDescriptive} />
      </div>

      {allQuestions.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <FaRegFileAlt className="text-4xl mb-3" />
          <p className="text-sm text-center max-w-xs">
            No questions added yet. Click the buttons above to start creating questions.
          </p>
        </div>
      ) : (
        allQuestions.map((q, index) => (
          <QuestionCard key={q.id} question={q} index={index} errors={errors} />
        ))
      )}
    </div>
  );
};

export default StepTwo;
