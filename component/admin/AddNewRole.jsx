import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewRole() {
  const [newRole, setNewRole] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [roleType, setRoleType] = useState("");
  const [description, setDescription] = useState("");
  const [issuingAdminName, setIssuingAdminName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roleType === "" || description === "" || issuingAdminName === "") {
      toast.error("Please fill all the fields");
      return;
    }
    setIsUpdating(true);
    console.log(roleType, description, issuingAdminName);
    toast.success("Role Created Successfully");
  };

  return (
    <div className="flex min-h-full w-full flex-col  bg-[#f5f5f5] px-6 py-12 lg:px-8">
      <div
        className="bg-[#1f2937] p-2 text-white
        
      text-xl font-bold leading-9 tracking-tight
      rounded-t-lg
      "
      >
        Create a new role
      </div>
      <div className="bg-white rounded-lg shadow-md p-4   ">
        <p className="text-lg mb-4 mt-2">
          Enter the name of the new role you want to create.
        </p>

        <form
          className="
          flex flex-col space-y-6 lg:w-1/3 
          md:w-1/2
          sm:w-full
        "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row justify-between align-middle space-x-2 flex-wrap-none">
            <label
              htmlFor="roleType"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Type of Role:
            </label>
            <input
              id="roleType"
              name="roleType"
              type="text"
              autoComplete="off"
              required
              value={roleType}
              onChange={(e) => setRoleType(e.target.value)}
              className="block rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="flex flex-row justify-between align-middle space-x-2 flex-wrap-none">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description:
            </label>
            <input
              id="description"
              name="description"
              type="text"
              autoComplete="off"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="flex flex-row justify-between align-middle space-x-2">
            <label
              htmlFor="issuingAdminName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Issuing Admin Name:
            </label>
            <input
              id="issuingAdminName"
              name="issuingAdminName"
              type="text"
              autoComplete="off"
              required
              value={issuingAdminName}
              onChange={(e) => setIssuingAdminName(e.target.value)}
              className="block rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1f2937] hover:bg-[#1f2937] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Role
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddNewRole;
