import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, isAuthenticated } from "../../auth";
import CustomContainer from "../../components/container/CustomContainer";
import CustomButton from "../../components/button/CustomButton";
import LogOutButton from "../../components/button/LogOutButton";
import SideBar from "../../components/sidebar/SideBar";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CircularProgress from "@mui/material/CircularProgress";
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
  const [refreshKey, setRefreshKey] = useState(0);
  const messagesEndRef = useRef(null);
  const FLASK_URL = "https://upward-midge-verbally.ngrok-free.app";
  const EXPRESS_URL = "https://brave-wired-mastiff.ngrok-free.app";

  useEffect(() => {
    async function fetchProfile() {
      if (!isAuthenticated()) {
        navigate("/signin");
        return;
      }
      const getUserById = await fetchUserProfile();
      if (!getUserById) {
        navigate("/signin");
      } else {
        setUser(getUserById);
        const response = await axios.get(
          `${EXPRESS_URL}/get-chats/${getUserById.user.id}`
        );
        setChatHistories(response.data);
        if (response.data.length > 0) {
          const lastChat = response.data[response.data.length - 1];
          loadChatHistory(lastChat.id);
        } else {
          startNewChat();
        }
      }
    }
    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (messages.length === 0 && currentChatId === null) {
      startNewChat();
    }
  }, [messages, currentChatId]);

  const startNewChat = () => {
    setMessages([]);
    setSummary("");
    setSessionEnded(false);
    setCurrentChatId(Date.now().toString());
    setRefreshKey((prev) => prev + 1);
  };

  const loadChatHistory = (chatId) => {
    if (currentChatId === chatId) return;
    const chat = chatHistories.find((h) => h.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setSummary(chat.summary || "");
      setSessionEnded(!!chat.summary);
      setCurrentChatId(chatId);
    }
  };

  const deleteChatHistory = async (chatId) => {
    try {
      await axios.delete(`${EXPRESS_URL}/delete-chat/${chatId}`);
      setRefreshKey((prev) => prev + 1);
      const updatedHistories = chatHistories.filter((h) => h.id !== chatId);
      setChatHistories(updatedHistories);
      if (currentChatId === chatId) {
        startNewChat();
      }
    } catch (err) {
      console.error("Gagal menghapus chat:", err);
    }
  };

const handleSendMessage = async () => {
  if (input.trim() === "") return;
  const userInput = input;
  setInput("");

  const userMessage = {
    text: userInput,
    sender: "user",
    emotion: null 
  };
  setMessages((prev) => [...prev, userMessage]);

  const loadingMessage = {
    text: "Sedang memproses...",
    sender: "bot",
    emotion: null,
    responseTime: null,
    loading: true
  };
  setMessages((prev) => [...prev, loadingMessage]);

  try {
    setLoading(true);
    const mbtiResult = user.user.mbtiResult || "INTJ";
    const response = await axios.post(`${FLASK_URL}/chat`, {
      user_input: userInput,
      mbti_result: mbtiResult,
      user_id: user.user.id || "anonymous",
      chat_id: currentChatId,
    });

    const { emotion, response: botReply, responseTime } = response.data;

    setMessages((prev) => {
      const updated = [...prev];
      const lastUserIndex = updated.findIndex((msg) => msg.sender === "user" && msg.emotion === null);
      if (lastUserIndex !== -1) {
        updated[lastUserIndex] = {
          ...updated[lastUserIndex],
          emotion: emotion
        };
      }
      updated.splice(updated.length - 1, 1); 
      updated.push({
        text: botReply,
        sender: "bot",
        emotion: null,
        responseTime: responseTime
      });

      return updated;
    });
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    setMessages((prev) => {
      const updated = [...prev];
      updated.splice(updated.length - 1, 1); 
      updated.push({
        text: "Maaf, terjadi kesalahan pada server.",
        sender: "bot",
        emotion: "error"
      });
      return updated;
    });
  } finally {
    setLoading(false);
  }
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
    const alreadyExists = updatedHistories.some((h) => h.id === currentChatId);
    if (!alreadyExists) {
      updatedHistories.push(chatEntry);
    } else {
      updatedHistories.forEach((h, i) => {
        if (h.id === currentChatId) {
          updatedHistories[i] = chatEntry;
        }
      });
    }
    setChatHistories(updatedHistories);
  };

  useEffect(() => {
    if (sessionEnded && summary) {
      saveCurrentChat();
    }
  }, [summary, sessionEnded]);

  const handleEndSession = async () => {
    setSessionEnded(true);
    setLoading(true);
    try {
      const response = await axios.post(`${FLASK_URL}/summary`, {
        user_id: user.user.id,
        chat_id: currentChatId,
      });
      const { summary: backendSummary } = response.data;
      if (
        backendSummary &&
        backendSummary !== "No chat history available for this session"
      ) {
        setSummary(backendSummary);
      } else {
        setError("Tidak ada riwayat percakapan untuk dirangkum.");
        setSummary("");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      setError("Gagal memuat rangkuman dari server.");
      setSummary("");
    } finally {
      setLoading(false);
    }
  };

  const renderTextWithBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  if (!user) return <p>Loading...</p>;

  return (
    <CustomContainer variant="left">
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
          <SideBar
            startNewChat={startNewChat}
            chatHistories={chatHistories}
            setChatHistories={setChatHistories}
            loadChatHistory={loadChatHistory}
            deleteChatHistory={deleteChatHistory}
            // deleteAllHistories={deleteAllHistories}
            refreshKey={refreshKey}
          />
        </Box>

        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <SideBar
            startNewChat={startNewChat}
            chatHistories={chatHistories}
            setChatHistories={setChatHistories}
            loadChatHistory={loadChatHistory}
            deleteChatHistory={deleteChatHistory}
            // deleteAllHistories={deleteAllHistories}
            refreshKey={refreshKey}
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
            ref={messagesEndRef}
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
                variant="h6"
                fontWeight="regular"
                sx={{
                  background: "linear-gradient(to right, #7BB5E8, #397ECB)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                  my: "auto",
                }}
              >
                Selamat datang di chatbot Tutur Laras. <br />
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
                      msg.sender === "user" ? "4px solid #397ECB" : "grey.300",
                    borderLeft:
                      msg.sender === "user" ? "grey.300" : "4px solid #7BB5E8",
                    fontSize: "16px",
                  }}
                >
                  {msg.sender === "user" && (
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="grey.500"
                      sx={{ mb: 1, textAlign: "right" }}
                    >
                      Emosi: {msg.emotion || "Sedang memproses..."}
                    </Typography>
                  )}
                
                  {msg.sender === "bot" && (
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="grey.500"
                      sx={{ mb: 1 }}
                    >
                      Waktu: {msg.responseTime || "Sedang memproses... "}s
                    </Typography>
                  )}
                  {/* {msg.text} */}
                  {renderTextWithBold(msg.text)}
                </Box>
              ))
            )}
            {/* {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress color="primary" />
              </Box>
            )} */}
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
                    // margin: "20px 0",
                    border: "1px solid #ccc",
                  }}
                />
                <Box
                  sx={{
                    width: { xs: "80%", lg: "80%" },
                    color: "grey.800",
                    // p: 2,
                    borderRadius: 2,
                    border: "2px solid grey.300",
                    mx: "auto",
                    mb: 4,
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
              borderTop: "1px solid #ccc",
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
              multiline
              maxRows={5}
              sx={{
                input: { color: sessionEnded ? "grey.800" : "grey.800" },
                "& fieldset": {
                  borderColor: sessionEnded ? "#7BB5E8" : "#397ECB",
                },
                "&:hover fieldset": {
                  borderColor: sessionEnded ? "#7BB5E8" : "#397ECB",
                },
              }}
            />
            <IconButton
              sx={{ ml: 2, color: sessionEnded ? "#7BB5E8" : "#397ECB" }}
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
