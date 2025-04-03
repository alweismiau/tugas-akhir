import React from "react";
import { Box } from "@mui/material";
import LogoImage from "../../assets/logo/logo-blue.png";

const Logo = () => {
  return (
    <Box
      component="img"
      src={LogoImage}
      alt="Logo"
      sx={{
        position: "fixed",
        top:  {
          xs: 10,
          lg: 20,
        },
        left: {
          xs: "50%", 
          sm: "50%", 
          md: "50%", 
          lg: 130, 
        },
        transform: {
          xs: "translateX(-50%)", 
          md: "translateX(-50%)", 
        },
        width: {
          xs: 60,
          sm: 80,
          md: 100,
          lg: 140,
        },
        height: "auto",
        zIndex: 1000,
      }}
    />
  );
};

export default Logo;
