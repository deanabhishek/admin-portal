import React from "react";

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <div
      className={`fixed inset-0 z-10 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm`}
    >
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg mb-4">
          Are you sure you want to delete this user?
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-[#1f2937] rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
