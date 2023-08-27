import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRegister } from "../api/user";
import createUser from "../../resources/create-user.png";
function NewUserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [department, setDepartment] = useState("");
  const [employerCode, setEmployerCode] = useState("");

  const handleNewUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (firstName.length < 1 || lastName.length < 1) {
      toast.error("First Name and Last Name cannot be empty.");
      return;
    }

    try {
      const response = await userRegister({
        firstName,
        lastName,
        password,
        email,
        role,
      });

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("User registration successful.");
        clearFormFields();
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      toast.error("An error occurred during user registration.");
    }
  };

  const clearFormFields = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setRole("user");
    setDepartment("");
    setEmployerCode("");
  };

  return (
    <>
      {
        <div className=" w-full h-auto bg-[#f5f5f5] p-5 rounded">
          <form>
            <div className="bg-white rounded ">
              <div className="bg-[#1f2937] rounded-t px-5 py-3 color-white">
                <h2 className="text-base font-semibold leading-7 text-white">
                  <div className="custom-image" />
                  Create New User
                </h2>
                <p className="mt-1 text-sm leading-6 text-white">
                  Please fill in the information below to create a new user.
                </p>
              </div>

              <div className=" flex flex-col p-5">
                <div className="w-full flex flex-row gap-x-8 gap-y-4">
                  <div className="flex-1">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        required
                        autoComplete="given-name"
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-8">
                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        required
                        name="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="roles"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Select Role{" "}
                    </label>
                    <div className="mt-2">
                      <select
                        id="roles"
                        required
                        name="roles"
                        autoComplete="roles"
                        onChange={(e) => setRole(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="" disabled>
                          Select Role
                        </option>
                        {[
                          "user",
                          "admin",
                          "developer",
                          "designer",
                          "model",
                        ].map((role) => (
                          <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-8">
                  <div className="flex-1">
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Department
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="department"
                        id="department"
                        required
                        autoComplete="department"
                        onChange={(e) => setDepartment(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="Employer Code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Employer Code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="Employer Code"
                        id="Employer Code"
                        required
                        autoComplete="Employer Code"
                        onChange={(e) => setEmployerCode(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-8">
                  <div className="flex-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        autoComplete="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        autoComplete="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={() => clearFormFields()}
                    className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 border border-gray-300 rounded-md px-2 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleNewUser}
                    className="rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>{" "}
              </div>
            </div>
          </form>
        </div>
      }
      <ToastContainer />
    </>
  );
}

export default NewUserForm;
