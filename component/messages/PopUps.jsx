import React from "react";

function Popup({ isOpen, onClose, children }) {
  return (
    <div
      className={`fixed inset-0 z-10 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center bg-opacity-75 bg-gray-900`}
    >
      <div className="bg-blue-100 p-4 rounded-lg shadow-md relative">
        <button
          className="absolute top-2 right-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 p-2"
          onClick={onClose}
        >
          X
        </button>
        {children}
        {/* <div className="flex justify-end mt-4"></div> */}
      </div>
    </div>
  );
}

export default Popup;
