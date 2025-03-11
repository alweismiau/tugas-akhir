import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  variant = "contained", 
  sx = {},
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      fullWidth
      onClick={onClick}
      disabled={disabled}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "1rem",
        borderRadius: "8px",
        padding: "12px 12px",
        ...(variant === "contained"
          ? {
              backgroundColor: "#212529",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#343a40",
              },
            }
          : variant === "outlined"
          ? {
              border: "2px solid #212529",
              color: "#212529",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "#f8f9fa",
              },
            }
          : {
              color: "#212529",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "#f8f9fa",
              },
            }),
        ...sx, 
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
