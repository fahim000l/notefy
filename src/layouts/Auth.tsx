import Header from "@/components/Main/Header";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import React from "react";

interface props {
  children: React.ReactNode;
}

const Auth = ({ children }: props) => {
  return (
    <Box>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        className="min-h-screen flex items-center justify-center"
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Auth;
