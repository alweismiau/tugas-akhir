import axios from "../api/api";

export const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

// export const fetchUserProfile = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");

//     if (!token || !userId) {
//       console.error("Token or User ID is missing!");
//       return;
//     }

//     // const response = await axios.get(`https://7f7d-103-159-199-164.ngrok-free.app/users/${userId}`, {
//     //   headers: { Authorization: `Bearer ${token}` },
//     // });
//     const response = await axios.get(`/users/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log("Fetched User Profile:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     return null;
//   }
// };

export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.error("Token or User ID is missing!");
      return;
    }

    const response = await axios.get(
      `https://brave-wired-mastiff.ngrok-free.app/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": "69420" },
      }
    );

    console.log("Fetched User Profile:", response.data);

    // 🔧 SOLUSI: sesuaikan return ini
    return response.data; // BUKAN response.data.user

  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

