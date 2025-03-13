import axiosInstance from "./axiosInstance";

export const registerUser = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Registration failed";
  }
};
