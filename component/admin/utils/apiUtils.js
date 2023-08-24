import { allUsers } from "../../api/user";
import { deleteUser } from "../../api/user";

export const fetchAllUsers = async (skip, limit) => {
  try {
    const response = await allUsers(skip, limit);
    return response.error ? { error: response.error } : response;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "An error occurred while fetching users." };
  }
};

export const deleteButton = async (userId) => {
  try {
    const response = await deleteUser(userId);
    return response.status === "success"
      ? { status: "success" }
      : { error: "An error occurred while deleting user." };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "An error occurred while deleting user." };
  }
};
