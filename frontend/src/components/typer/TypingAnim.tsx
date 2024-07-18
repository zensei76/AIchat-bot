import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

const TypingAnim = () => {

  const appTheme = useTheme();

  return (
    <Box
      sx={{
        p:2,
        fontSize: {
          xs: "20px",  // for extra-small devices
          sm: "28px",  // for small devices
          md: "36px",  // for medium devices
          lg: "46px",  // for large devices
        },
        height: {md:"28px"},
        color: appTheme.palette.text.primary,
        display: "inline-block",
        textAlign: "center",
      }}
    >
      <TypeAnimation
        sequence={[
          "Glad to See You Again 🎉!",
          1000,
          "Log in to continue your chat",
          1500,
        ]}
        speed={50}
        repeat={Infinity}
      />
    </Box>
  );
};

export default TypingAnim;