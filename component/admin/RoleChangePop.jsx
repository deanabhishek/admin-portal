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
        onClose(); // Close the popup
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
    setIsUpdating(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative z-10">
        <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
        <p>Current Role: {user.role}</p>
        <label className="mt-4">
          New Role:
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
        </label>
        <div className="flex justify-between mt-4">
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleRoleChange}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Change Role"}
          </button>
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleChangePopup;
