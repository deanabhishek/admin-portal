import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRegister } from "../api/user";

function NewUserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

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
        role: "user",
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
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen :w-1/2 bg-blue-100">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Register New User
        </h1>
        <form onSubmit={handleNewUser} className="w-full max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-6">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 flex-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="John"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 flex-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Doe"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 flex-1"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 flex-1"
            >
              Your Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 flex-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default NewUserForm;
