import { useEffect, useState } from "react";
import StatsCard from "../../src/components/common/StatsCard";
import {
  roleOptions,
  statusOptions,
  userManagementStats,
} from "../../src/constants/data";
import UsersTable from "../../src/components/UsersTable";
import { useOutletContext } from "react-router-dom";
import AddUserModal from "../../src/components/AddUserModal";
import SearchInput from "../../src/components/common/SearchInput";
import SelectDropdown from "../../src/components/common/SelectDropdown";
import { getAllUsers } from "../../src/services";
import { toast } from "react-toastify";

const Users = () => {
  const [activeTab, setActiveTab] = useState("staff");
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
  });

  const fetchUser = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res?.data);
      const apiStats = res?.stats || {};

      const updatedStats = userManagementStats.map((item) => ({
        ...item,
        value: apiStats[item.key] || 0,
      }));

      setUserStats(updatedStats);
    } catch (error) {
      toast.error(error.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    try {
      fetchUser();
    } catch (error) {
      toast.error(error);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {userStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="border-2 mt-2 rounded-lg flex items-center gap-x-2 bg-white border-gray-300 mb-4 p-3 flex-wrap sm:flex-nowrap">
        {/* Search Input */}
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name or email..."
          containerClass="flex-1 min-w-[200px]"
        />
        {/* Role Dropdown */}
        <div className="relative w-40">
          <SelectDropdown
            value={filters.role}
            onChange={(val) => setFilters({ ...filters, role: val })}
            options={roleOptions}
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative w-40">
          <SelectDropdown
            value={filters.status}
            onChange={(val) => setFilters({ ...filters, status: val })}
            options={statusOptions}
          />
        </div>
      </div>

      <UsersTable
        search={search}
        filters={filters}
        data={users}
        refreshUsers={fetchUser}
      />

    </div>
  );
};

export default Users;
