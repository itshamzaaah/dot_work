import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiTrash, BiUserX } from "react-icons/bi";
import { usersData } from "../constants/data";

const UsersTable = ({ search, filters }) => {
  const [exported, setExported] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { role = "all", status = "all" } = filters || {};

  const filteredUsers = usersData.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "" ||
      status === "all" ||
      user.status?.toLowerCase() === status.toLowerCase();

    const matchRole =
      role === "" ||
      role === "all" ||
      user.role?.toLowerCase() === role.toLowerCase();

    return matchSearch && matchStatus && matchRole;
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
            {filters.role == "all" ? "All Users" : filters.role.toUpperCase() + "'s"} 
          </h2>
          <p className="text-sm text-gray-500">
            Showing {filteredUsers.length} submissions
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-[270px] md:w-full mt-6">
        <table className="w-full table-auto text-sm text-left">
          <thead className="border-b bg-primary text-white font-medium">
            <tr>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Activity</th>
              <th className="py-3 px-4">Last Login</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className={`border-b ${
                  user.status === "pending" ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-4 flex flex-col px-4 font-medium text-gray-900 whitespace-nowrap">
                  <span className="text-black text-sm">{user.name}</span>
                  <span className="text-gray-400 text-xs">{user.email}</span>
                </td>
                <td className="py-4 px-4 text-xs">{user.role}</td>
                <td className="py-4 px-4 text-xs">{user.status}</td>
                <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                  <div>{user.testsCreated} tests created</div>
                  <div className="text-xs text-gray-400">
                    {user.testsManaged} tests managed
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                  <div>{user.lastActive?.date}</div>
                  <div className="text-xs text-gray-400">
                    {user.lastActive?.time}
                  </div>
                </td>
                <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                  {/* Dropdown Button */}
                  <div className="relative inline-block">
                    <button
                      onClick={() => toggleDropdown(user.id)}
                      className="p-2 border border-gray-200 rounded hover:bg-gray-100"
                    >
                      <HiOutlineDotsHorizontal
                        className="w-4 h-4"
                        title="More Actions"
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === user.id && (
                      <div className="absolute right-0 z-10 mt-2 w-42 bg-white border border-gray-200 rounded-md shadow-lg">
                        <ul className="text-sm">
                          <li
                            onClick={() =>
                              handleActionClick(user.id, "downloadPDF")
                            }
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          >
                            <BiUserX className="w-4 h-4 text-red-500" />
                            Make Inactive
                          </li>

                          <li
                            onClick={() => handleActionClick(user.id, "delete")}
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
};

export default UsersTable;
