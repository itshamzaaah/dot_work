import { useState } from "react";
import { FiSearch, FiFilter, FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { submissions } from "../lib/data";
import { getStatusBadge } from "../utils/validation";

export default function RecentSubmissions() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [exported, setExported] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const filteredSubmissions = submissions.filter((sub) => {
    const matchSearch =
      sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.test.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || sub.status === statusFilter;

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

  return (
    <div className="w-[300px] md:w-full bg-white rounded-xl border p-6 shadow-sm mt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Submissions
          </h2>
          <p className="text-sm text-gray-500">
            Latest test submissions and their status
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 relative">
          <div className="relative w-full sm:w-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by candidate or test..."
              className="w-full sm:w-64 pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
                      statusFilter === "graded" ? "bg-gray-100 font-semibold" : ""
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
                      statusFilter === "pending" ? "bg-gray-100 font-semibold" : ""
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
              <th className="py-3 px-4">Date & Time</th>
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
                <td className="py-4 px-4 text-gray-700">{sub.test}</td>
                <td className="py-4 px-4 font-semibold text-gray-900">
                  {sub.score}
                </td>
                <td className="py-4 px-4">
                  <span className={getStatusBadge(sub.status)}>
                    {sub.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                  <div>{sub.date}</div>
                  <div className="text-xs text-gray-400">{sub.time}</div>
                </td>
                <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                  {/* <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100">
                    View
                  </button> */}
                  <button
                    onClick={() => handleIndividualExport(sub)}
                    className="p-2 border border-gray-200 rounded hover:bg-gray-100"
                  >
                    <FiDownload className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
