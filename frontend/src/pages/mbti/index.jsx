import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, Radio, FormControl, FormControlLabel, RadioGroup } from "@mui/material";

const questions = [
  "Saya merasa nyaman di keramaian.",
  "Saya suka berdiskusi dalam kelompok.",
  "Saya mudah berinteraksi dengan orang baru.",
  "Saya lebih suka mengandalkan fakta daripada intuisi.",
  "Saya suka belajar dari pengalaman langsung.",
  "Saya mengutamakan logika dalam keputusan.",
  "Saya lebih nyaman dengan jadwal yang terstruktur.",
  "Saya sering merencanakan sesuatu sebelumnya.",
  "Saya menikmati eksplorasi ide-ide baru.",
  "Saya membuat keputusan berdasarkan emosi.",
  "Saya fleksibel dengan perubahan.",
  "Saya menyukai improvisasi dibandingkan perencanaan."
];

const TestMBTI = () => {
  const [answers, setAnswers] = useState(Array(12).fill("ya"));
  const [result, setResult] = useState("");

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/mbti-test", { answers });
      setResult(response.data.mbti_result);
    } catch (error) {
      console.error("Error submitting MBTI test:", error);
    }
  };

  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Typography variant="h5" fontWeight="bold">MBTI Test</Typography>
      {questions.map((question, index) => (
        <FormControl key={index} sx={{ display: "block", my: 2 }}>
          <Typography>{question}</Typography>
          <RadioGroup row value={answers[index]} onChange={(e) => handleAnswerChange(index, e.target.value)}>
            <FormControlLabel value="ya" control={<Radio />} label="Ya" />
            <FormControlLabel value="tidak" control={<Radio />} label="Tidak" />
          </RadioGroup>
        </FormControl>
      ))}
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      {result && <Typography variant="h6">MBTI Type: <strong>{result}</strong></Typography>}
    </Box>
  );
};

export default TestMBTI;
