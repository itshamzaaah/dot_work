import { FaRegFileAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setDescriptive,
  setMcqs,
  setTrueFalse,
} from "../../store/slices/createTestSlice";
import AddBtn from "../AddBtn";
import QuestionCard from "./QuestionCard";
import { useState } from "react";
import { parseExcelToQuestions } from "../../utils/excelToStepTwo";

const StepTwo = ({ errors = {} }) => {
  const [mode, setMode] = useState("upload");
  const [parseError, setParseError] = useState("");
  const [importCounts, setImportCounts] = useState({
    mcqs: 0,
    trueFalse: 0,
    descriptive: 0,
  });
  const [debugPreview, setDebugPreview] = useState({ extracted: [] });

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

  async function onFileSelected(file) {
    if (!file) return;
    setParseError("");

    try {
      const buf = await file.arrayBuffer();
      const parsed = await parseExcelToQuestions(buf, { debug: true });

      // UI preview (first 5 extracted rows show text/options/marks/type)
      setDebugPreview(parsed._debug || { extracted: [] });

      // Replace arrays (exclusive behavior)
      dispatch(setMcqs(parsed.mcqs));
      dispatch(setTrueFalse(parsed.trueFalse));
      dispatch(setDescriptive(parsed.descriptive));

      setImportCounts({
        mcqs: parsed.mcqs.length,
        trueFalse: parsed.trueFalse.length,
        descriptive: parsed.descriptive.length,
      });
    } catch (err) {
      console.error(err);
      setParseError(
        "Could not parse the Excel file. Please verify headers and format."
      );
    }
  }

  return (
    <div className="max-w-[17rem] md:max-w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Add Questions
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Create different types of questions for your assessment
      </p>

      <p className="text-sm text-gray-500 mb-4">
        Upload from Excel or add questions manually
      </p>

      <div className="flex items-center gap-6 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="mode"
            value="upload"
            checked={mode === "upload"}
            onChange={() => setMode("upload")}
          />
          Upload from Excel
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="mode"
            value="manual"
            checked={mode === "manual"}
            onChange={() => setMode("manual")}
          />
          Add Manually
        </label>
      </div>

      {mode === "upload" ? (
        <>
          <div className="mb-3">
            <input
              type="file"
              accept=".xls,.xlsx"
              onChange={(e) =>
                e.target.files && onFileSelected(e.target.files[0])
              }
            />
          </div>

          {parseError && (
            <p className="text-sm text-red-600 mb-2">{parseError}</p>
          )}

          <div className="text-sm text-gray-700 mb-8">
            Imported:&nbsp;
            <b>{importCounts.mcqs}</b> MCQ,&nbsp;
            <b>{importCounts.trueFalse}</b> True/False,&nbsp;
            <b>{importCounts.descriptive}</b> Descriptive
          </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-4 mb-12">
          <AddBtn label="Add MCQ" onClick={addMcq} />
          <AddBtn label="Add True/False" onClick={addTrueFalse} />
          <AddBtn label="Add Descriptive" onClick={addDescriptive} />
        </div>
      )}

      {allQuestions.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <FaRegFileAlt className="text-4xl mb-3" />
          <p className="text-sm text-center max-w-xs">
            No questions added yet. Click the buttons above to start creating
            questions.
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
