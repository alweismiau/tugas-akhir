import React, { forwardRef } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { RouterLink } from "../../routes/RouterLink";
import logoBlue from "../../assets/logo/logo-blue.png";
import logoWhite from "../../assets/logo/logo-white.png";

export const Logo = forwardRef(
    ({ href = "/", disableLink = false, variant = "blue", sx, className, ...other }, ref) => {
      const logoSrc = variant === "white" ? logoWhite : logoBlue;
  
      const baseStyles = {
        flexShrink: 0,
        display: "inline-flex",
        verticalAlign: "middle",
        width: 120, 
        height: "auto",
        ...sx,
      };
  
      return (
        <Box
          ref={ref}
          component={disableLink ? "div" : RouterLink}
          to={href}
          className={`mnl__logo__root ${className || ""}`}
          aria-label="logo"
          sx={{
            ...baseStyles,
            ...(disableLink && { pointerEvents: "none" }),
          }}
          {...other}
        >
          <img src={logoSrc} alt="Logo" style={{ width: "100%", height: "auto" }} />
        </Box>
      );
    }
  );

export default Logo;
