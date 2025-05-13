// SideBar.jsx (Updated)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, isAuthenticated } from "../../auth";
import CustomButton from "../../components/button/CustomButton";
import { Box, Typography, IconButton } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const SideBar = ({
  startNewChat,
  chatHistories,
  loadChatHistory,
  deleteChatHistory,
  deleteAllHistories,
}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  if (!user) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRight: "2px solid #ccc",
        justifyContent: "space-between",
        height: "100vh",
        width: { xs: "40vw", md: "20vw", lg: "15vw" },
      }}
      p={2}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: {
            xs: 4,
            lg: 16,
          },
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Nama User:
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            sx={{ mx: "auto" }}
          >
            {user.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Tipe MBTI:
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            sx={{ mx: "auto" }}
          >
            {user.mbtiResult}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Riwayat
          </Typography>
          {chatHistories.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Tidak ada riwayat chat.
            </Typography>
          ) : (
            chatHistories.map((history, index) => (
              <Box
                key={history.id}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CustomButton
                  variant="text"
                  startIcon={<ChatBubbleOutlineIcon />}
                  text={`Riwayat ${index + 1}`}
                  onClick={() => loadChatHistory(history.id)}
                  sx={{ fontSize: "14px", flexGrow: 1 }}
                />
                <IconButton
                  onClick={() => deleteChatHistory(history.id)}
                  sx={{ color: "red" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          )}
          {chatHistories.length > 0 && (
            <CustomButton
              variant="text"
              startIcon={<DeleteIcon />}
              text="Hapus Semua Riwayat"
              onClick={deleteAllHistories}
              sx={{ fontSize: "14px", color: "red", mt: 1 }}
            />
          )}
        </Box>
      </Box>

      <Box sx={{ mb: 1 }}>
        <CustomButton
          startIcon={<DriveFileRenameOutlineIcon />}
          text="Chat Baru"
          onClick={startNewChat}
        />
      </Box>
    </Box>
  );
};

export default SideBar;
