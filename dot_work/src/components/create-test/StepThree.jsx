import React, { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateStepThree } from "../../store/slices/createTestSlice";

export default function StepThree() {
  const dispatch = useDispatch();
  const { candidateEmails, accessDeadline, testLink } = useSelector(
    (state) => state.testForm.stepThree
  );

  const [emailText, setEmailText] = useState(candidateEmails.join(", "));

  const handleEmailsChange = (e) => {
    const value = e.target.value;
    setEmailText(value); // update local input string immediately

    const emails = value
      .split(/[\n,]+/)
      .map((email) => email.trim())
      .filter(Boolean);
    dispatch(updateStepThree({ candidateEmails: emails }));
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

      {/* Candidate Emails */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Candidate Emails
        </label>
        <textarea
          value={emailText}
          onChange={handleEmailsChange}
          placeholder="Enter email addresses separated by commas or new lines..."
          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
        <div className="space-y-2 mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Access Deadline
          </label>
          <input
            type="date"
            value={accessDeadline}
            onChange={handleDeadlineChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="space-y-2 mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Test Link
          </label>
          <div className="flex">
            <input
              type="text"
              value={testLink}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm text-gray-600 focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <MdContentCopy size={16} />
              <span className="hidden lg:inline">Copy</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
