import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // 🔹 Tambahkan Outlet
import { getUserProfile, isAuthenticated } from "../../auth";
import { Box, Button, Container, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      if (!isAuthenticated()) {
        console.log("User not authenticated, redirecting to Sign In");
        navigate("/signin");
        return;
      }

      const userProfile = await getUserProfile();
      if (!userProfile) {
        navigate("/signin");
      } else {
        setUser(userProfile);
      }
    }

    fetchProfile();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token"); 
    navigate("/signin"); 
  };

  if (!user) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #f8f9fa, #ffffff)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Welcome {user.name}
          </Typography>

          {/* 🔹 Tambahkan Outlet agar halaman child bisa dirender */}
          <Outlet />

          {!window.location.pathname.includes("mbti-test") && (
            <>
              <Typography variant="body2" sx={{ mb: 3, color: "#6c757d" }}>
                Let's get your{" "}
                <Typography
                  component="span"
                  sx={{ color: "#007bff", fontWeight: "bold", cursor: "pointer" }}
                >
                  MBTI TEST
                </Typography>{" "}
                first!
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate("/dashboard/mbti-test")}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  backgroundColor: "#212529",
                  "&:hover": {
                    backgroundColor: "#343a40",
                  },
                }}
              >
                MBTI TEST
              </Button>
            </>
          )}

          <Button onClick={handleSignOut}>Sign out</Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
