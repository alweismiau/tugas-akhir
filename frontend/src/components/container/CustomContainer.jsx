import React from "react";
import { Box } from "@mui/material";

const CustomContainer = ({ children, sx = {} }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        ...sx, 
      }}
    >
      {children}
    </Box>
  );
};

export default CustomContainer;
