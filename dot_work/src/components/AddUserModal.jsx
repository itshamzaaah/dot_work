import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import SelectDropdown from "./SelectDropdown";
import { roleOptionsModal } from "../constants/data";
import TextInput from "./TextInput";
import CloseBtn from "./CloseBtn";

const AddUserModal = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("HR");

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit({ fullName, email, role });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold mb-1">Add New User</h2>
            <CloseBtn onClose={onClose} />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Create a new admin or HR user account
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <TextInput
              placeholder="Enter full name"
              type="text"
              value={fullName}
              onChange={setFullName}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <TextInput
              placeholder="Enter email address"
              type="email"
              value={email}
              onChange={setEmail}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <SelectDropdown
              options={roleOptionsModal}
              value={role}
              onChange={setRole}
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-sm rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
