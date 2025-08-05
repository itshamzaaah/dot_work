import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { approveUser } from "../services";
import { IoCheckmarkDone } from "react-icons/io5";

const UsersTable = ({ search, filters, data = [], refreshUsers }) => {
  const [exported, setExported] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { role = "all", status = "all" } = filters || {};

  const filteredUsers = data?.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "" ||
      status === "all" ||
      (user.active ? "active" : "inactive") === status.toLowerCase();

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

  const handleActionClick = async (user, actionType) => {
    try {
      if (actionType === "approve") {
        const response = await approveUser({
          userId: user._id,
          email: user.email,
          role: user.role,
        });
        toast.success(response.message);
        if (refreshUsers) refreshUsers(); // Refresh after approval
      } else if (actionType === "delete") {
        console.log("Delete user:", user._id);
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Action failed");
    }
  };

  const toggleDropdown = (userId) => {
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

  return (
    <div className="w-[300px] md:min-w-full bg-white rounded-xl border p-6 shadow-sm mt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {filters.role === "all"
              ? "All Users"
              : `${filters.role.toUpperCase()}'s`}
          </h2>
          <p className="text-sm text-gray-500">
            Showing {filteredUsers.length} submissions
          </p>
        </div>
      </div>

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
              <tr key={user._id} className="border-b">
                <td className="py-4 flex flex-col px-4 font-medium text-gray-900">
                  <span className="text-black text-sm">{user.name}</span>
                  <span className="text-gray-400 text-xs">{user.email}</span>
                </td>
                <td className="py-4 px-4 text-xs">{user.role}</td>
                <td className="py-4 px-4 text-xs">
                  {user.active ? "Active" : "Inactive"}
                </td>
                <td className="py-4 px-4 text-gray-700">
                  <div>{user.testsCreated} tests created</div>
                  <div className="text-xs text-gray-400">
                    {user.testsManaged} tests managed
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">
                  <div>{user.updatedAt.slice(0, 10)}</div>
                  <div className="text-xs text-gray-400">
                    {user.updatedAt.slice(11, 19)}
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => toggleDropdown(user._id)}
                      className="p-2 border border-gray-200 rounded hover:bg-gray-100"
                    >
                      <HiOutlineDotsHorizontal className="w-4 h-4" />
                    </button>

                    {activeDropdown === user._id && (
                      <div className="absolute right-0 z-10 mt-2 w-42 bg-white border border-gray-200 rounded-md shadow-lg">
                        <ul className="text-sm">
                          <li
                            onClick={() => handleActionClick(user, "approve")}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-green-500 flex items-center gap-2"
                          >
                            <IoCheckmarkDone className="w-4 h-4" /> Approve
                          </li>

                          <li
                            onClick={() => handleActionClick(user, "delete")}
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

      {activeDropdown && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
};

export default UsersTable;
