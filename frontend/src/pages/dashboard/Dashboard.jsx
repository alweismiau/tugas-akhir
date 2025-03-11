import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation  } from "react-router-dom"; // 🔹 Tambahkan Outlet
import { fetchUserProfile, isAuthenticated } from "../../auth";
import { Box, Typography } from "@mui/material";
import CustomContainer from "../../components/container/CustomContainer";
import CardContainer from "../../components/card/CardContainer";
import CustomButton from "../../components/button/CustomButton";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchProfile() {
      if (!isAuthenticated()) {
        console.log("User not authenticated, redirecting to Sign In");
        navigate("/signin");
        return;
      }

      const getUserById = await fetchUserProfile();
      console.log("User Profile Data:", getUserById);
      if (!getUserById) {
        navigate("/signin");
      } else {
        setUser(getUserById);
      }
    }

    fetchProfile();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  if (location.pathname === "/dashboard/mbti-test") {
    return <Outlet />;
  }

  if (!user) return <p>Loading...</p>;

  const handleMBTITest = () => {
    navigate("/dashboard/mbti-test");
  };

  return (
    <CustomContainer sx={{ flexDirection: "column" }}>
        <Box sx={{ textAlign: "center", mb: 2, display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Typography variant="h5" color="#212529">
            Selamat Datang
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#7BB5E8", ml: 1 }}>
            {user.name}
          </Typography>
          <Typography variant="h5" color="#212529">
            !👋
          </Typography>
        </Box>
      <CardContainer>
        <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center" }}>
          Sebelum masuk ke fitur chatbot, yuk test MBTI kamu!
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#6c757d", textAlign: "center", mb: 3, maxWidth: 500 }}
        >
          Tujuan dari test MBTI ini adalah agar chatbot mampu memberikan respons
          sesuai dengan tipe kepribadian kamu
        </Typography>

        <CustomButton text="MBTI TEST" onClick={handleMBTITest} />

        <CustomButton onClick={handleSignOut} variant="text" text="Sign Out" />
      </CardContainer>
      <Outlet />
    </CustomContainer>
  );
};

export default Dashboard;
