import React from "react";
import { Box, Typography } from "@mui/material";

const TestMBTI = () => {
  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        MBTI Test Page
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is where the MBTI test will be conducted.
      </Typography>
    </Box>
  );
};

export default TestMBTI;
