import React, { useState } from "react";
import { updateRole } from "../api/user";

const RoleChangePopup = ({ user, onClose }) => {
  const [newRole, setNewRole] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRoleChange = async () => {
    setIsUpdating(true);
    try {
      const updatedUser = await updateRole(user.id, newRole); // Update the API call
      console.log(updatedUser);
      if (updatedUser.status === "success") {
        onClose();
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
    setIsUpdating(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="bg-gray-900 bg-opacity-50 absolute inset-0 "></div>
      <div className="bg-white  rounded-lg shadow-md w-full max-w-md relative z-10">
        <div className="bg-[#1f2937] p-2 ">
          <h3 className="text-lg font-semibold text-white">Change Role</h3>
        </div>
        <div className="p-4 font-medium flex flex-col gap-2">
          <h2 className="text-xl font-semibold mb-2">User Details</h2>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Current Role: {user.role}</p>
          <label className="mt-4">
            New Role: &nbsp;
            {/* <input
              type="text"
              required
              className="role-input"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            /> */}
            <select
              className="role-input"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              <option value="" disabled>
                Select Role
              </option>
              {["user", "admin", "developer", "designer", "model"].map(
                (role) => (
                  <option key={role} value={role} disabled={user.role === role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                )
              )}
            </select>
          </label>
        </div>

        <div className="flex justify-end mt-4 bg-[#EDF2F7] p-2 rounded-md gap-4">
          <button
            className="p-2 bg-white text-black rounded-md border border-gray-300 hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="p-2 bg-[#1f2937] text-white rounded-md hover:bg-blue-600"
            onClick={handleRoleChange}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Change Role"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleChangePopup;
