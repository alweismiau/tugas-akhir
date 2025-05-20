import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, isAuthenticated } from "../../auth";
import CustomContainer from "../../components/container/CustomContainer";
import CustomButton from "../../components/button/CustomButton";
import LogOutButton from "../../components/button/LogOutButton";
import SideBar from "../../components/sidebar/SideBar";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Typography,
  // Button,
  TextField,
  IconButton,
  Grid,
  Drawer,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from "@mui/icons-material/Send";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [sessionEnded, setSessionEnded] = useState(false);
  const [user, setUser] = useState(null);
  const [chatHistories, setChatHistories] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const API_URL = "https://upward-midge-verbally.ngrok-free.app";

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
        const storedHistories =
          JSON.parse(localStorage.getItem(`chatHistories_${getUserById.id}`)) ||
          [];
        setChatHistories(storedHistories);
        startNewChat();
      }
    }
    fetchProfile();
  }, [navigate]);

  const startNewChat = () => {
    setMessages([]);
    setSummary("");
    setSessionEnded(false);
    setCurrentChatId(Date.now().toString());
  };

  const saveCurrentChat = () => {
    if (messages.length === 0) return;

    const updatedHistories = [...chatHistories];
    const chatEntry = {
      id: currentChatId,
      messages,
      summary,
      timestamp: new Date().toISOString(),
    };

    const existingIndex = updatedHistories.findIndex(
      (h) => h.id === currentChatId
    );
    if (existingIndex !== -1) {
      updatedHistories[existingIndex] = chatEntry;
    } else {
      updatedHistories.push(chatEntry);
    }

    setChatHistories(updatedHistories);
    localStorage.setItem(
      `chatHistories_${user.id}`,
      JSON.stringify(updatedHistories)
    );
  };

  const loadChatHistory = (chatId) => {
    const chat = chatHistories.find((h) => h.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setSummary(chat.summary || "");
      setSessionEnded(!!chat.summary);
      setCurrentChatId(chatId);
    }
  };

  const deleteChatHistory = (chatId) => {
    const updatedHistories = chatHistories.filter((h) => h.id !== chatId);
    setChatHistories(updatedHistories);
    localStorage.setItem(
      `chatHistories_${user.id}`,
      JSON.stringify(updatedHistories)
    );
    if (currentChatId === chatId) {
      startNewChat();
    }
  };

  const deleteAllHistories = () => {
    setChatHistories([]);
    localStorage.removeItem(`chatHistories_${user.id}`);
    startNewChat();
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const mbtiResult = user.mbtiResult || "INTJ";

      const response = await axios.post(
        `${API_URL}/chat`,
        {
          user_input: input,
          mbti_result: mbtiResult,
          user_id: user.id || "anonymous",
          chat_id: currentChatId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { emotion, response: botReply, response_time } = response.data;

      const botMessage = {
        text: botReply,
        sender: "bot",
        emotion,
        response_time,
      };

      setMessages((prev) => {
        const updatedMessages = [...prev, botMessage];
        const updatedHistories = [...chatHistories];
        const chatEntry = {
          id: currentChatId,
          messages: updatedMessages,
          summary,
          timestamp: new Date().toISOString(),
        };
        const existingIndex = updatedHistories.findIndex(
          (h) => h.id === currentChatId
        );
        if (existingIndex !== -1) {
          updatedHistories[existingIndex] = chatEntry;
        } else {
          updatedHistories.push(chatEntry);
        }
        setChatHistories(updatedHistories);
        localStorage.setItem(
          `chatHistories_${user.id}`,
          JSON.stringify(updatedHistories)
        );
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Maaf, terjadi kesalahan pada server.",
          sender: "bot",
          emotion: "error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionEnded && summary) {
      saveCurrentChat();
    }
  }, [summary, sessionEnded]);

  // const handleEndSession = () => {
  //   setSessionEnded(true);
  //   setLoading(true);
  //   const chatSummary = messages
  //     .map((msg) => `${msg.sender === "user" ? "User" : "Bot"}: ${msg.text}`)
  //     .join("\n");
  //   setSummary(chatSummary);
  // };

    const handleEndSession = async () => {
    setSessionEnded(true);
    setLoading(true);

    try {
      if (!user || !user.id || !currentChatId) {
        throw new Error("User ID or Chat ID is missing");
      }

      console.log("Sending summary request with user_id:", user.id, "chat_id:", currentChatId);
      const response = await axios.post(
        `${API_URL}/summary`,
        {
          user_id: user.id,
          chat_id: currentChatId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { summary: backendSummary } = response.data;
      if (backendSummary && backendSummary !== "No chat history available for this session") {
        setSummary(backendSummary);
      } else {
        setError("Tidak ada riwayat percakapan untuk dirangkum.");
        setSummary(""); 
      }
    } catch (error) {
      console.error("Error fetching summary:", error.response ? error.response.data : error.message);
      setError("Gagal memuat rangkuman dari server.");
      setSummary("");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <CustomContainer>
      <AppBar
        sx={{
          display: { md: "none" },
          backgroundColor: "transparent",
          boxShadow: "none",
          width: "50%",
          right: "50%",
        }}
      >
        <Toolbar>
          <IconButton
            sx={{
              top: {
                xs: 10,
                lg: 20,
              },
            }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon sx={{ color: "#7BB5E8" }} fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <LogOutButton />

      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
          }}
        >
          {/* <SideBar /> */}
          <SideBar
            startNewChat={startNewChat}
            chatHistories={chatHistories}
            loadChatHistory={loadChatHistory}
            deleteChatHistory={deleteChatHistory}
            deleteAllHistories={deleteAllHistories}
          />
        </Box>

        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          {/* <SideBar /> */}
          <SideBar
            startNewChat={startNewChat}
            chatHistories={chatHistories}
            loadChatHistory={loadChatHistory}
            deleteChatHistory={deleteChatHistory}
            deleteAllHistories={deleteAllHistories}
          />
        </Drawer>

        {/* Chatbot */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            p: 1,
          }}
        >
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box
            className="chat-container"
            sx={{
              flex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}
          >
            {messages.length === 0 ? (
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  background: "linear-gradient(to right, #2196F3, #4CAF50)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  my: "auto",
                  textAlign: "center",
                }}
              >
                Bagaimana kabar kamu hari ini?
              </Typography>
            ) : (
              messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    mx: { xs: 2, lg: 10 },
                    p: 2,
                    borderRadius: 2,
                    maxWidth: "60%",
                    wordBreak: "break-word",
                    alignSelf:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                    bgcolor: "white",
                    color: "grey.800",
                    border: "2px solid",
                    borderColor:
                      msg.sender === "user" ? "grey.300" : "grey.300",
                    borderRight:
                      msg.sender === "user" ? "4px solid #8CBF0D" : "grey.300",
                    borderLeft:
                      msg.sender === "user" ? "grey.300" : "4px solid #7BB5E8",
                    fontSize: "16px",
                  }}
                >
                  {msg.sender === "bot" && (
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="grey.500"
                      mb={1}
                    >
                      Emotion Predict: {msg.emotion || "unknown"} | Response
                      Time: {msg.response_time || "N/A"}s
                    </Typography>
                  )}
                  {msg.text}
                </Box>
              ))
            )}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress color="primary" />
              </Box>
            )}
            {/* End Session */}
            {messages.length > 0 && !sessionEnded && (
              <CustomButton
                variant="outlined"
                startIcon={<NotInterestedIcon />}
                text="Akhiri Sesi"
                onClick={handleEndSession}
                sx={{ my: 2, fontSize: "14px", width: "20%" }}
              />
            )}

            {/* Summary */}
            {sessionEnded && (
              <>
                <hr
                  style={{
                    width: "80%",
                    margin: "20px 0",
                    border: "1px solid #ccc",
                  }}
                />
                <Box
                  sx={{
                    width: { xs: "80%", lg: "80%" },
                    color: "grey.800",
                    p: 2,
                    borderRadius: 2,
                    border: "2px solid grey.300",
                    mx: "auto",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    Rangkuman Percakapan:
                  </Typography>
                  {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : summary ? (
                    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                      {summary}
                    </Typography>
                  ) : (
                    <Box>
                      <Typography variant="body2" color="error" mb={1}>
                        {error || "Tidak ada rangkuman tersedia."}
                      </Typography>
                      <CustomButton
                        variant="outlined"
                        text="Coba Lagi"
                        onClick={handleEndSession}
                        sx={{ fontSize: "14px" }}
                      />
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Box>

          {/* Input Chat */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "80%",
              px: 2,
              p: 2,
              mx: "auto",
              borderTop: "1px solid grey",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Tuliskan pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading || sessionEnded}
              sx={{
                input: { color: sessionEnded ? "grey.400" : "grey.700" },
                "& fieldset": {
                  borderColor: sessionEnded ? "grey.400" : "grey.700",
                },
                "&:hover fieldset": {
                  borderColor: sessionEnded ? "grey.400" : "grey.800",
                },
              }}
            />
            <IconButton
              sx={{ ml: 2, color: sessionEnded ? "grey.400" : "grey.800" }}
              onClick={handleSendMessage}
              disabled={loading || sessionEnded}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </CustomContainer>
  );
};

export default Chatbot;