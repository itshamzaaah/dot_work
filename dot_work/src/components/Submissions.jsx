import { useState } from "react";
import { FiFilter, FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getFlagBadge, getStatusBadge } from "../utils/validation";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineFilePdf, AiOutlineFileZip } from "react-icons/ai";
import { IoSendOutline } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { viewSubmissionData } from "../constants/data";
import SearchInput from "./common/SearchInput";

export default function Submissions() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [exported, setExported] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const filteredSubmissions = viewSubmissionData.filter((sub) => {
    const matchSearch =
      sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.test.name.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "all" || sub.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const exportToExcel = (data, filename = "submissions.xlsx") => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Submissions");
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, filename);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const handleIndividualExport = (submission) => {
    exportToExcel([submission], `${submission.name}_submission.xlsx`);
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

          {/* Filter Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown((prev) => !prev)}
              className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-100"
            >
              <FiFilter className="w-4 h-4" /> Filter
            </button>

            {showStatusDropdown && (
              <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md">
                <ul className="text-sm">
                  <li
                    onClick={() => {
                      setStatusFilter("all");
                      setShowStatusDropdown(false);
                    }}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      statusFilter === "all" ? "bg-gray-100 font-semibold" : ""
                    }`}
                  >
                    All Status
                  </li>
                  <li
                    onClick={() => {
                      setStatusFilter("graded");
                      setShowStatusDropdown(false);
                    }}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      statusFilter === "graded"
                        ? "bg-gray-100 font-semibold"
                        : ""
                    }`}
                  >
                    Graded
                  </li>
                  <li
                    onClick={() => {
                      setStatusFilter("pending");
                      setShowStatusDropdown(false);
                    }}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      statusFilter === "pending"
                        ? "bg-gray-100 font-semibold"
                        : ""
                    }`}
                  >
                    Pending
                  </li>
                </ul>
              </div>
            )}
          </div>

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
              <th className="py-3 px-4">Flags</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((sub) => (
              <tr
                key={sub.id}
                className={`border-b ${
                  sub.status === "pending" ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                  {sub.name}
                </td>
                <td className="py-4 px-4 text-gray-700 flex flex-col">
                  <span className="">{sub.test.name}</span>
                  <span className="text-xs border rounded-xl w-fit px-2 py-0.5 mt-1 text-black">
                    {sub.test.category}
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">
                  {sub.score}
                </td>
                <td className="py-4 px-4">
                  <span className={getStatusBadge(sub.status)}>
                    {sub.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-700 flex flex-col">
                  <span className="">
                    {sub.progress.totalQuestions}/
                    {sub.progress.attemptedQuestions}
                  </span>
                  <span className="text-xs text-gray-400">Questions</span>
                </td>
                <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                  <div>{sub.date}</div>
                  <div className="text-xs text-gray-400">{sub.time}</div>
                </td>
                <td className="py-4 px-4">
                  <span className={getFlagBadge(sub.flag)}>{sub.flag}</span>
                </td>
                <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                  <Link to={`/test-report/${sub.id}`}>
                    <button className="p-2 border border-gray-200 rounded hover:bg-gray-100">
                      <MdOutlineRemoveRedEye className="w-4 h-4" title="View" />
                    </button>
                  </Link>

                  {/* Dropdown Button */}
                  <div className="relative inline-block">
                    <button
                      onClick={() => toggleDropdown(sub.id)}
                      className="p-2 border border-gray-200 rounded hover:bg-gray-100"
                    >
                      <HiOutlineDotsHorizontal
                        className="w-4 h-4"
                        title="More Actions"
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === sub.id && (
                      <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                        <ul className="text-sm">
                          <li
                            onClick={() =>
                              handleActionClick(sub.id, "downloadPDF")
                            }
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          >
                            <AiOutlineFilePdf className="w-4 h-4 text-red-500" />
                            Download PDF
                          </li>
                          <li
                            onClick={() =>
                              handleActionClick(sub.id, "downloadZIP")
                            }
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          >
                            <AiOutlineFileZip className="w-4 h-4 text-blue-500" />
                            Download ZIP
                          </li>
                          <li
                            onClick={() =>
                              handleActionClick(sub.id, "sendResults")
                            }
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          >
                            <IoSendOutline className="w-4 h-4 text-green-500" />
                            Send Results
                          </li>
                          <li
                            onClick={() => handleActionClick(sub.id, "delete")}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-600 border-t border-gray-200"
                          >
                            <BiTrash className="w-4 h-4" />
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
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
