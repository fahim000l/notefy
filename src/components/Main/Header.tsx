import { RootReducerType } from "@/redux/reducers/RootReducers";
import { Menu } from "@mui/icons-material/";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const { pathname } = useRouter();
  const drawerWidth =
    pathname === "/signin" || pathname === "/signup" ? "100%" : 240;
  const {
    MainUi: { menu },
  } = useSelector((state: RootReducerType) => state);
  const dispatch = useDispatch();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch({ type: "MENU_TOGGLE" })}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
        <Link href={"/signin"} className="ml-auto">
          <Button variant="contained" className="bg-neutral">
            Sign In
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
