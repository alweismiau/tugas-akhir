import axios from "../api/api";

export const isAuthenticated = () => {
    return localStorage.getItem("token") ? true : false;
};

export const getUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found");
        return null;
}
      const response = await axios.get("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.user;
    } catch (error) {
      console.error("Error fetching profile", error);
      return null;
    }
  };