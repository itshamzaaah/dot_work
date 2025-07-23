import React, { useState } from "react";
import StatsCard from "../../src/components/StatsCard";
import { userManagementStats } from "../../src/constants/data";
import UsersTable from "../../src/components/UsersTable";
import { FiSearch } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";

const Users = () => {
  const [activeTab, setActiveTab] = useState("staff");
  const [search, setSearch] = useState("");
  const [filters, setFilter] = useState({
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
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Dropdown */}
        <div className="relative w-40">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white"
            value={filters.role}
            onChange={(e) => setFilter({ ...filters, role: e.target.value })}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="hr">Human Resource</option>
            <option value="candidate">Candidates</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <IoChevronDown size={16} className="text-gray-400" />
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="relative w-40">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white"
            value={filters.status}
            onChange={(e) => setFilter({ ...filters, status: e.target.value })}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <IoChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      <UsersTable search={search} filters={filters} />
    </div>
  );
};

export default Users;
