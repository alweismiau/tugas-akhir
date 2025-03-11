import React from 'react'
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
        top: 20,
        left: {
          xs: 20, 
          sm: 30, 
          md: 40, 
          // lg: 50, 
        },
        width: {
          xs: 80, 
          sm: 100, 
          md: 120, 
          // lg: 140, 
        },
        height: "auto",
        zIndex: 1000,
      }}
    />
  )
}

export default Logo
