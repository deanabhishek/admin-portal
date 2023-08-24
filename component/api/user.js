import axios from "axios";

export async function userLogin(credentials) {
  try {
    const response = await axios.post(`api/userLogin`, credentials);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function userRegister(credentials) {
  console.log(credentials);
  try {
    const response = await axios.post(`api/userAdd`, credentials);
    console.log(response);
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
}

export async function allUsers(skip, limit) {
  try {
    const response = await axios.get(
      `/api/getUser?skip=${skip}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
}

export async function updateRole(userId, newRole) {
  try {
    const response = await axios.post(`/api/updateRole`, { userId, newRole });
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
}
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`/api/getUserById/${id}`);
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/api/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};

export const addNewRole = async (role) => {
  if (!role) return { error: "Role is required" };
  try {
    const response = await axios.post(`/api/addNewRole`, { role });
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};
