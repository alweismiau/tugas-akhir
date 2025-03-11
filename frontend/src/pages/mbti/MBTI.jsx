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
import CustomContainer from "../../components/container/CustomContainer";
import CardContainer from "../../components/card/CardContainer";
import CustomButton from "../../components/button/CustomButton";

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
    <CustomContainer>
      <CardContainer>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {session < 4 ? `Sesi ${session + 1}` : "Hasil MBTI"}
        </Typography>

        {session < 4 ? (
          <>
            {questions[session].map((question, index) => (
              <FormControl key={index} sx={{ display: "block", my: 2 }}>
                <Typography>{question}</Typography>
                <RadioGroup
                  row
                  value={answers[session * 3 + index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                >
                  <FormControlLabel value="ya" control={<Radio />} label="Ya" />
                  <FormControlLabel
                    value="tidak"
                    control={<Radio />}
                    label="Tidak"
                  />
                </RadioGroup>
              </FormControl>
            ))}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              {session > 0 && (
                <CustomButton
                  text="Back"
                  variant="outlined"
                  onClick={handleBack}
                />
              )}
              {session < 3 ? (
                <CustomButton
                  text="Next"
                  onClick={handleNext}
                  disabled={answers
                    .slice(session * 3, session * 3 + 3)
                    .includes(null)}
                />
              ) : (
                <CustomButton
                  text={loading ? "Processing..." : "Submit"}
                  onClick={handleSubmit}
                  disabled={
                    loading ||
                    answers.slice(session * 3, session * 3 + 3).includes(null)
                  }
                />
              )}
            </Box>
          </>
        ) : (
          <>
            {session === 4 && result ? (
              <>
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Your MBTI Type: <strong>{result}</strong>
                </Typography>
                <CustomButton
                  text="Back to Dashboard"
                  onClick={() => navigate("/dashboard")}
                />
              </>
            ) : session === 4 && !result ? (
              <Typography variant="h6" sx={{ mt: 3, color: "red" }}>
                Error retrieving MBTI result. Please try again.
              </Typography>
            ) : null}
          </>
        )}
      </CardContainer>
    </CustomContainer>
  );
};

export default TestMBTI;
