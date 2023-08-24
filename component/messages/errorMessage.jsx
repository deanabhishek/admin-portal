import React, { useEffect, useState } from "react";

function ErrorPopup({ errorMessage }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 bg-red-500 text-white p-4 shadow-lg transition-transform duration-300 rounded-md transition-ease-in-out">
      <div className="flex justify-between items-center px-4 py-2">
        <p className="text-lg font-semibold">{errorMessage}</p>
        <button className="text-white" onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
