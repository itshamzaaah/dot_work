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

export default function Submissions({ data = [] }) {
  const user = useSelector(selectUser);
  const [search, setSearch] = useState("");
  const [exported, setExported] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const filteredSubmissions = data?.filter((sub) => {
    const matchSearch =
      sub.candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.test.testName.toLowerCase().includes(search.toLowerCase());

    return matchSearch;
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
          <tbody>
            {filteredSubmissions?.map((sub) => (
              <tr
                key={sub._id}
                className={`border-b ${
                  sub.status === "pending" ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-4 px-4 text-gray-700">
                  <span className="flex flex-col">{sub?.candidate?.name}</span>
                  <span className="text-xs border rounded-xl w-fit px-2 py-0.5 mt-1 text-black">
                    {sub?.candidate?.email}
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
                      <MdOutlineRemoveRedEye className="w-4 h-4" title="View" />
                    </button>
                  </Link>

                  {/* Dropdown Button */}
                  {user.role !== "CANDIDATE" && (
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
                        <div className="absolute right-0 z-10 mt-2 w-42 bg-white border border-gray-200 rounded-md shadow-lg">
                          <ul className="text-xs">
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
                                handleActionClick(sub.id, "sendResults")
                              }
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                            >
                              <IoSendOutline className="w-4 h-4 text-green-500" />
                              Send Results
                            </li>
                            <li
                              onClick={() =>
                                handleActionClick(sub.id, "delete")
                              }
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-600 border-t border-gray-200"
                            >
                              <BiTrash className="w-4 h-4" />
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
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
