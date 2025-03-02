import axios from "../api/api";

export const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); 

    if (!token || !userId) {
      console.error("Token or User ID is missing!");
      return;
    }

    const response = await axios.get(`http://localhost:3000/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
