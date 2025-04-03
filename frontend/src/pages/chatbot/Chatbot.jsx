import React, { useState, useEffect } from "react";

import CustomContainer from "../../components/container/CustomContainer";
import CustomButton from "../../components/button/CustomButton";
import LogOutButton from "../../components/button/LogOutButton";
import SideBar from "../../components/sidebar/SideBar";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Grid,
  Drawer,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from "@mui/icons-material/Send";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);


  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages([
          ...messages,
          { text: input, sender: "user" },
          { text: "I'm here to help!", sender: "bot" },
        ]);
      }, 1000);
    }
  };

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
          // p={2}
        >
          <SideBar />
        </Box>

        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <SideBar />
        </Drawer>

        {/* Chatbot */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            // height: "85vh",
            // borderRadius: 3,
            // boxShadow: 3,
            p: 1,
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mt: {
                xs: 10,
                lg: 2,
              },
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
                      Emotion: Sad
                    </Typography>
                  )}
                  {msg.text}
                </Box>
              ))
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
              sx={{
                input: { color: "grey.700" },
                "& fieldset": { borderColor: "grey.700" },
                "&:hover fieldset": { borderColor: "grey.800" },
              }}
            />
            <IconButton
              sx={{ ml: 2, color: "grey.800" }}
              onClick={handleSendMessage}
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
