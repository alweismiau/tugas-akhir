import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  variant = "contained",
  startIcon = null,
  sx = {},
}) => {
  const styles = {
    contained: {
      backgroundColor: "#212529",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#343a40",
      },
    },
    outlined: {
      border: "2px solid #212529",
      color: "#212529",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "#e0e0e0",
        border: "2px solid #212529",
      },
    },
    text: {
      color: "#212529",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "#e0e0e0",
      },
    },
  };

  return (
    <Button
      variant={variant}
      type={type}
      fullWidth
      startIcon={startIcon || undefined}
      onClick={onClick}
      disabled={disabled}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "1rem",
        borderRadius: "8px",
        padding: "12px 12px",
        px: 4,
        ...styles[variant],
        ...sx,
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
