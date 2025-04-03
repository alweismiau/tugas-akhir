import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { fetchUserProfile, isAuthenticated } from "../../auth";
import { Box, Typography } from "@mui/material";
import CustomContainer from "../../components/container/CustomContainer";
import CardContainer from "../../components/card/CardContainer";
import CustomButton from "../../components/button/CustomButton";
import LogOutButton from "../../components/button/LogOutButton";
import Chatbot from "../chatbot/Chatbot";

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

  if (location.pathname === "/dashboard/mbti-test") {
    return <Outlet />;
  }

  if (location.pathname === "/dashboard/chatbot") {
    return <Chatbot />;
  }

  if (!user) return <p>Loading...</p>;

  const handleMBTITest = () => {
    navigate("/dashboard/mbti-test");
  };

  const handleChatbot = () => {
    navigate("/dashboard/chatbot");
  };

  return (
    <CustomContainer sx={{ flexDirection: "column" }}>
      <LogOutButton />
      <Box
        sx={{
          textAlign: "center",
          mb: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" color="#212529">
          Selamat Datang
        </Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#7BB5E8", ml: 1 }}
        >
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
          sx={{ color: "#6c757d", textAlign: "center", mb: 2 }}
        >
          Tujuan dari test MBTI ini adalah agar chatbot mampu memberikan respons
          sesuai dengan tipe kepribadian kamu
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <CustomButton text="MBTI TEST" onClick={handleMBTITest} />
          <CustomButton
            variant="outlined"
            text="Chatbot"
            onClick={handleChatbot}
            disabled={!user.mbtiResult}
          />
        </Box>
      </CardContainer>
      <Outlet />
    </CustomContainer>
  );
};

export default Dashboard;
