import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const questions = [
  
  [
    "Saya merasa nyaman di keramaian.",
    "Saya suka berdiskusi dalam kelompok.",
    "Saya mudah berinteraksi dengan orang baru.",
  ],
  
  [
    "Saya lebih suka mengandalkan fakta daripada intuisi.",
    "Saya suka belajar dari pengalaman langsung.",
    "Saya mengutamakan logika dalam keputusan.",
  ],
  
  [
    "Saya lebih nyaman dengan jadwal yang terstruktur.",
    "Saya sering merencanakan sesuatu sebelumnya.",
    "Saya menikmati eksplorasi ide-ide baru.",
  ],
  
  [
    "Saya membuat keputusan berdasarkan emosi.",
    "Saya fleksibel dengan perubahan.",
    "Saya menyukai improvisasi dibandingkan perencanaan.",
  ],
];

const TestMBTI = () => {
  const [session, setSession] = useState(0); 
  const [answers, setAnswers] = useState(Array(12).fill(null)); 
  const navigate = useNavigate();
  const [result, setResult] = useState(""); 
  const [loading, setLoading] = useState(false); 

  
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[session * 3 + index] = value;
    setAnswers(updatedAnswers);
  };

  
  const handleNext = () => {
    if (session < 3) setSession(session + 1);
  };

  
  const handleBack = () => {
    if (session > 0) setSession(session - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/mbti-test", {
        answers,
      });

      if (response.data.mbti_result) {
        setResult(response.data.mbti_result);
        console.log("MBTI Response:", response.data);
        setSession(4);

        await axios.post(
          "http://localhost:3000/update-mbti",
          { mbtiResult: response.data.mbti_result },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        console.error("MBTI result is empty!");
      }
    } catch (error) {
      console.error("Error submitting MBTI test:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "12px",
            backgroundColor: "white",
          }}
        >
          {/* Judul Sesi */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {session < 4 ? `Sesi ${session + 1}` : "Hasil MBTI"}
          </Typography>

          {session < 4 ? (
            <>
              {/* Pertanyaan */}
              {questions[session].map((question, index) => (
                <FormControl key={index} sx={{ display: "block", my: 2 }}>
                  <Typography>{question}</Typography>
                  <RadioGroup
                    row
                    value={answers[session * 3 + index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  >
                    <FormControlLabel
                      value="ya"
                      control={<Radio />}
                      label="Ya"
                    />
                    <FormControlLabel
                      value="tidak"
                      control={<Radio />}
                      label="Tidak"
                    />
                  </RadioGroup>
                </FormControl>
              ))}

              {/* Tombol Navigasi */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                {session > 0 && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
                {session < 3 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={answers
                      .slice(session * 3, session * 3 + 3)
                      .includes(null)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit"}
                  </Button>
                )}
              </Box>
            </>
          ) : (
            <>
              {session === 4 ? (
                result ? (
                  <>
                    <Typography variant="h6" sx={{ mt: 3 }}>
                      Your MBTI Type: <strong>{result}</strong>
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => navigate("/dashboard")}
                    >
                      Back to Dashboard
                    </Button>
                  </>
                ) : (
                  <Typography variant="h6" sx={{ mt: 3, color: "red" }}>
                    Error retrieving MBTI result. Please try again.
                  </Typography>
                )
              ) : (
                <>{/* Form pertanyaan tetap tampil jika sesi < 4 */}</>
              )}
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default TestMBTI;
