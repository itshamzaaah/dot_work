import { useState, useRef } from "react";
import { RxCross2 } from "react-icons/rx";

import { useParams } from "react-router-dom";
import TextInput from "../../src/components/common/TextInput";
import { emailRegex } from "../../src/constants";
import { addCandidates } from "../../src/services";

export default function AddCandidatesForm() {
  const { testId } = useParams();
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [emails, setEmails] = useState([]);
  const [accessDeadline, setAccessDeadline] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const isValidEmail = (email) => emailRegex.test(email);

  const handleAddEmail = () => {
    const value = inputValue.trim().replace(/,$/, "");
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
  };

  const handleKeyDown = (e) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      handleAddEmail();
    } else if (e.key === "Backspace" && inputValue === "" && emails.length) {
      setEmails(emails.slice(0, -1));
    }
  };

  const removeEmail = (email) => {
    setEmails(emails.filter((e) => e !== email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    // Simple validation
    if (emails.length === 0) {
      return setErrors({ candidateEmails: "Please enter at least one email." });
    }
    if (!accessDeadline) {
      return setErrors({ accessDeadline: "Please select an access deadline." });
    }

    const invalidEmails = emails.filter((email) => !isValidEmail(email));
    if (invalidEmails.length) {
      return setErrors({ candidateEmails: "Some emails are invalid." });
    }

    try {
      setIsSubmitting(true);

      //   await axios.patch(`/api/test/${testId}/add-candidates`, {
      //     candidateEmails: emails,
      //   });
      const payload = {
        candidateEmails: emails,
        accessDeadline,
      };
      const response = await addCandidates({ testId, data: payload });
      if (response.status === 200) {
        setSuccessMessage("Candidates added successfully. Invitations sent.");
        setEmails([]);
        setAccessDeadline("");
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      setErrors({ submit: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Add Candidates to Test</h2>

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

      {/* Access Deadline */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Access Deadline
        </label>
        <TextInput
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={accessDeadline}
          onChange={(e) => setAccessDeadline(e.target.value)}
          error={errors.accessDeadline}
        />
        {errors.accessDeadline && (
          <p className="text-sm text-red-500">{errors.accessDeadline}</p>
        )}
      </div>

      {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Submitting..." : "Add Candidates"}
      </button>
    </form>
  );
}
