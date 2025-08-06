import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { approveUser } from "../services";
import { IoCheckmarkDone } from "react-icons/io5";
import { approvedRoles } from "../constants/data";
import SelectDropdown from "./common/SelectDropdown";

const UsersTable = ({ search, filters, data = [], refreshUsers }) => {
  const [exported, setExported] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedRole, setSelectedRole] = useState({});
  const [activeRolePopover, setActiveRolePopover] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null);

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
          role: selectedRole[user._id], 
        });
        toast.success(response.message);
        if (refreshUsers) refreshUsers();
      } else if (actionType === "delete") {
        console.log("Delete user:", user._id);
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Action failed");
    }
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
                <td className="py-4 px-4 text-gray-700 relative">
                  <button
                    disabled={user.active}
                    onClick={() =>
                      setActiveRolePopover(
                        activeRolePopover === user._id ? null : user._id
                      )
                    }
                    className="px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
                  >
                    {user.role}
                  </button>

                  {activeRolePopover === user._id && (
                    <div className="absolute z-10 mt-2 w-32 bg-white border rounded shadow-lg p-3">
                      <p className="text-xs mb-2 text-gray-500">Select Role</p>
                      {approvedRoles.map((role) => (
                        <button
                          key={role.value}
                          className={`block w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100 ${
                            selectedRole[user._id] === role.value
                              ? "bg-gray-200 font-semibold"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedRole((prev) => ({
                              ...prev,
                              [user._id]: role.value,
                            }))
                          }
                        >
                          {role.label}
                        </button>
                      ))}
                      <button
                        onClick={async () => {
                          setLoadingUserId(user._id);
                          await handleActionClick(user, "approve");
                          setLoadingUserId(null);
                          setActiveRolePopover(null);
                        }}
                        className="mt-2 w-full bg-primary text-white text-sm py-1 rounded hover:bg-primary-dark disabled:opacity-50"
                        disabled={!selectedRole[user._id]}
                      >
                        {loadingUserId === user._id
                          ? "Approving..."
                          : "Approve"}
                      </button>
                    </div>
                  )}
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
