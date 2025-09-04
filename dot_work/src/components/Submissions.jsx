import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getStatusBadge } from "../utils/validation";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { IoSendOutline } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import SearchInput from "./common/SearchInput";
import { selectUser } from "../store/slices/authSlice";
import { useSelector } from "react-redux";
import { TbTableExport } from "react-icons/tb";
import Loader from "./common/Loader";

export default function Submissions({ data = [], loading = false }) {
  const user = useSelector(selectUser);
  const [search, setSearch] = useState("");
  const [exported, setExported] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const filteredSubmissions = data?.filter((sub) => {
    const matchSearch =
      sub.candidate?.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.test?.testName.toLowerCase().includes(search.toLowerCase());

    return matchSearch;
  });

  const exportToExcel = (data, filename = "submissions.xlsx") => {
    // Map the data to extract the necessary fields for Excel export
    const formattedData = data.map((item) => ({
      "Candidate Name": item?.candidate?.name,
      "Candidate Email": item?.candidate?.email,
      Role: item?.candidate?.role,
      "Test Name": item?.test?.testName,
      "Test Category": item?.test?.category,
      "Test Slug": item?.test?.slug,
      "Evaluation Percentage": item?.evaluation?.percentage + "%",
      "Total Awarded": item?.evaluation?.totalAwarded,
      "Total Possible": item?.evaluation?.totalPossible,
      "Overall Feedback": item?.evaluation?.overallFeedback,
      "Manual Remarks": item?.manualRemarks || "N/A",
      "Submission Time": item?.submittedAt,
      Status: item?.status,
    }));

    // Convert the formatted data into a sheet
    const ws = XLSX.utils.json_to_sheet(formattedData);

    // Create a new workbook and append the sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Submissions");

    // Generate Excel file
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob for the Excel file and trigger download
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, filename);

    // Optionally set a state or flag to indicate that the export is complete
    // Example: setExported(true);
    setTimeout(() => {
      // Example: setExported(false);
    }, 2000);
  };

  const handleIndividualExport = (submission) => {
    exportToExcel([submission], `${submission.candidate.name}.xlsx`);
  };

  const toggleDropdown = (submissionId) => {
    setActiveDropdown(activeDropdown === submissionId ? null : submissionId);
  };

  return (
    <div className="w-[300px] md:min-w-full bg-white rounded-xl border p-6 shadow-sm mt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Test Submissions
          </h2>
          <p className="text-sm text-gray-500">
            Showing {filteredSubmissions.length} submissions
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 relative">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by candidate or test..."
            containerClass="w-full sm:w-auto"
          />

          {/* Export Button */}
          <button
            onClick={() => exportToExcel(filteredSubmissions)}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-all ${
              exported
                ? "bg-green-600 text-white"
                : "bg-primary text-white hover:bg-blue-700"
            }`}
          >
            <FiDownload className="w-4 h-4" />
            {exported ? "Exported" : "Export"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-[270px] md:w-full mt-6">
        <table className="w-full table-auto text-sm text-left">
          <thead className="border-b bg-primary text-white font-medium">
            <tr>
              <th className="py-3 px-4">Candidate</th>
              <th className="py-3 px-4">Test</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Progress</th>
              <th className="py-3 px-4">Submitted</th>
              {/* <th className="py-3 px-4">Flags</th> */}
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          {loading ? (
            <div className="block mx-auto">
              <Loader bgColor="primary" />
            </div>
          ) : (
            <tbody>
              {filteredSubmissions?.map((sub) => (
                <tr
                  key={sub._id}
                  className={`border-b ${
                    sub.status === "pending" ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="py-4 px-4 text-gray-700">
                    <span className="flex flex-col">
                      {sub?.candidate?.name}
                    </span>
                    <span className="text-xs border rounded-xl w-fit px-2 py-0.5 mt-1 text-black">
                      {sub?.candidateEmail}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700 flex flex-col">
                    <span className="">{sub?.submission?.testName}</span>
                    <span className="text-xs border rounded-xl w-fit px-2 py-0.5 mt-1 text-black">
                      {sub.test.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700">
                      {sub?.evaluation?.totalAwarded}/
                      {sub?.evaluation?.totalPossible}
                    </span>
                    <span className="font-semibold text-gray-900 flex flex-col">
                      {sub?.evaluation?.percentage}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getStatusBadge(sub.status)}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700 flex flex-col">
                    <span className="">
                      {sub?.evaluation?.totalAwarded}/
                      {sub?.evaluation?.totalPossible}
                    </span>
                    <span className="text-xs text-gray-400">Questions</span>
                  </td>
                  <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                    <div>{sub.submittedAt?.slice(0, 10)}</div>
                    <div className="text-xs text-gray-400">
                      {sub.submittedAt?.slice(11, 19)}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                    <Link to={`/test-report/${sub._id}`}>
                      <button className="p-2 border border-gray-200 rounded hover:bg-gray-100">
                        <MdOutlineRemoveRedEye
                          className="w-4 h-4"
                          title="View"
                        />
                      </button>
                    </Link>

                    {/* Dropdown Button */}
                    {user.role !== "CANDIDATE" && (
                      <div className="relative inline-block">
                        <button
                          onClick={() => handleIndividualExport(sub)}
                          className="p-2 border border-gray-200 rounded hover:bg-gray-100"
                        >
                          <TbTableExport
                            className="w-4 h-4"
                            title="More Actions"
                          />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {filteredSubmissions?.length === 0 && !loading && (
            <tfoot>
              <tr>
                <td colSpan="5" className="py-2 text-center text-gray-500">
                  No submissions found.
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Click outside to close dropdowns */}
      {(activeDropdown || showStatusDropdown) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setActiveDropdown(null);
            setShowStatusDropdown(false);
          }}
        />
      )}
    </div>
  );
}
