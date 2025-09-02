import { useState, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import TextInput from "../../src/components/common/TextInput";
import { emailRegex } from "../../src/constants";
import { addCandidates, getAllUsers } from "../../src/services";
import PageHeader from "../../src/components/common/PageHeader";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

let debounceTimeout;

export default function AddCandidatesForm() {
  const { testId } = useParams();
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [emails, setEmails] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [accessDeadline, setAccessDeadline] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const isValidEmail = (email) => emailRegex.test(email);

  const handleAddEmail = (email) => {
    if (!email || emails.includes(email)) return;
    setEmails((prev) => [...prev, email]);
    setInputValue("");
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      const val = inputValue.trim();
      if (isValidEmail(val)) handleAddEmail(val);
    } else if (e.key === "Backspace" && inputValue === "" && emails.length) {
      setEmails(emails.slice(0, -1));
    }
  };

  const removeEmail = (email) => {
    setEmails(emails.filter((e) => e !== email));
  };

  // Debounced fetch for registered candidates
  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      try {
        const response = await getAllUsers({
          search: inputValue,
          role: "CANDIDATE",
        });
        const candidates = response.data || [];

        const emailList = candidates
          .map((user) => user.email)
          .filter((email) => !emails.includes(email));
        setSuggestions(emailList);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    }, 300);
  }, [inputValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

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
      const payload = { candidateEmails: emails, accessDeadline };
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
    <>
    <PageHeader
        title="Add Candidates"
        description="Invite candidates to participate in the test"
        button={{
          label: "Back to Tests",
          icon: MdOutlineArrowCircleLeft,
          to: "/tests",
        }}
      />

      <form onSubmit={handleSubmit} className="p-6 max-w-lg space-y-6 relative">
        {/* Email Field */}
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
            {emails.map((email, i) => (
              <span
                key={i}
                className="flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800"
              >
                {email}
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => removeEmail(email)}
                >
                  <RxCross2 size={15} />
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type name/email"
              className="flex-1 outline-none text-sm min-w-[120px]"
            />
          </div>
          {errors.candidateEmails && (
            <p className="text-sm text-red-500">{errors.candidateEmails}</p>
          )}

          {/* Suggestion Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-200 shadow-md rounded-md mt-1 max-h-40 overflow-y-auto w-auto">
              {suggestions.map((email, index) => (
                <li
                  key={index}
                  onClick={() => handleAddEmail(email)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                >
                  {email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Deadline Field */}
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
        </div>

        {errors.submit && (
          <p className="text-sm text-red-500">{errors.submit}</p>
        )}
        {successMessage && (
          <p className="text-sm text-green-600">{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-blue-700 text-white px-3 text-sm py-2 rounded-lg"
        >
          {isSubmitting ? "Submitting..." : "Add Candidates"}
        </button>
      </form>
    </>
  );
}
