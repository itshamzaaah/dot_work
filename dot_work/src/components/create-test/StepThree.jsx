import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStepThree } from "../../store/slices/createTestSlice";
import { RxCross2 } from "react-icons/rx";
import { emailRegex } from "../../constants";
import TextInput from "../common/TextInput";

export default function StepThree({ errors = {} }) {
  const dispatch = useDispatch();
  const { candidateEmails, accessDeadline, testLink } = useSelector(
    (state) => state.testForm.stepThree
  );

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [emails, setEmails] = useState(candidateEmails || []);

  const isValidEmail = (email) => emailRegex.test(email);

  const handleAddEmail = () => {
    const value = inputValue.trim().replace(/,$/, ""); // remove trailing comma
    if (!value) return;

    const chunks = value.split(/[\s,]+/).filter(Boolean);
    const newEmails = [...emails];

    chunks.forEach((email) => {
      if (!newEmails.includes(email)) {
        newEmails.push(email);
      }
    });

    setEmails(newEmails);
    setInputValue("");
    dispatch(updateStepThree({ candidateEmails: newEmails }));
  };

  const handleKeyDown = (e) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      handleAddEmail();
    } else if (e.key === "Backspace" && inputValue === "" && emails.length) {
      const updated = emails.slice(0, -1);
      setEmails(updated);
      dispatch(updateStepThree({ candidateEmails: updated }));
    }
  };

  const removeEmail = (email) => {
    const updated = emails.filter((e) => e !== email);
    setEmails(updated);
    dispatch(updateStepThree({ candidateEmails: updated }));
  };

  const handleDeadlineChange = (e) => {
    dispatch(updateStepThree({ accessDeadline: e.target.value }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(testLink);
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Sharing & Access
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Configure how candidates will access this test
      </p>

      {/* Email Tags */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Candidate Emails
        </label>
        <div
          className={`min-h-[3rem] w-full flex flex-wrap items-center gap-2 px-3 py-2 border rounded-md text-sm focus-within:ring-2 ${
            errors.candidateEmails
              ? "border-red-400"
              : "border-gray-300 focus-within:ring-blue-500"
          }`}
        >
          {emails.map((email, i) => {
            const isValid = isValidEmail(email);
            return (
              <span
                key={i}
                className={`flex items-center px-2 py-1 rounded-full text-sm ${
                  isValid
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {email}
                <button
                  type="button"
                  className="ml-2 text-xs"
                  onClick={() => removeEmail(email)}
                >
                  <RxCross2 size={15} />
                </button>
              </span>
            );
          })}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleAddEmail}
            placeholder="Type email and press enter"
            className="flex-1 outline-none text-sm min-w-[120px]"
          />
        </div>
        {errors.candidateEmails && (
          <p className="text-sm text-red-500">{errors.candidateEmails}</p>
        )}
      </div>

      {/* Deadline & Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 mt-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Access Deadline
          </label>
          <TextInput
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={accessDeadline}
            onChange={handleDeadlineChange}
            error={errors.accessDeadline}
          />
          {errors.accessDeadline && (
            <p className="text-sm text-red-500">{errors.accessDeadline}</p>
          )}
        </div>
      </div>
    </>
  );
}
