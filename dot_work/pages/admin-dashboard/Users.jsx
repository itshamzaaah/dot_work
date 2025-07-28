import { useState } from "react";
import StatsCard from "../../src/components/StatsCard";
import { roleOptions, statusOptions, userManagementStats } from "../../src/constants/data";
import UsersTable from "../../src/components/UsersTable";
import { useOutletContext } from "react-router-dom";
import AddUserModal from "../../src/components/AddUserModal";
import SearchInput from "../../src/components/common/SearchInput";
import SelectDropdown from "../../src/components/common/SelectDropdown";


const Users = () => {
  const { isUserModalOpen, setIsUserModalOpen } = useOutletContext();
  const [activeTab, setActiveTab] = useState("staff");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {userManagementStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* For future use */}
      {/* <div className="bg-gray-200 text-sm rounded w-fit text-white p-1 flex gap-x-2 items-center my-2">
        <button
          className={`${
            activeTab === "staff" ? "bg-primary text-white" : "text-gray-600"
          } px-2 py-2 rounded`}
          onClick={() => setActiveTab("staff")}
        >
          Staff Users
        </button>
        <button
          className={`${
            activeTab === "candidates"
              ? "bg-primary text-white"
              : "text-gray-600"
          } px-2 py-2 rounded`}
          onClick={() => setActiveTab("candidates")}
        >
          Candidates
        </button>
      </div> */}
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

      <UsersTable search={search} filters={filters} />
      {isUserModalOpen && (
        <AddUserModal onClose={() => setIsUserModalOpen(false)} />
      )}
    </div>
  );
};

export default Users;
