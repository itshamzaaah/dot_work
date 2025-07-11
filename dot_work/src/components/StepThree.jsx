import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

export default function StepThree() {
  const [candidateEmails, setCandidateEmails] = useState("");
  const [accessDeadline, setAccessDeadline] = useState("");
  const [testLink] = useState("https://assessai.pro/test/abcl123xyz");

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
          value={candidateEmails}
          onChange={(e) => setCandidateEmails(e.target.value)}
          placeholder="Enter email addresses separated by commas or new lines..."
          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Access Deadline */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Access Deadline
        </label>
        <div className="relative">
          <input
            type="date"
            value={accessDeadline}
            onChange={(e) => setAccessDeadline(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Test Link */}
      <div className="space-y-2">
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
            Copy
          </button>
        </div>
      </div>
    </>
  );
}
