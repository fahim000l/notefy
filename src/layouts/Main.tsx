import * as React from "react";
import { Box, CssBaseline, Divider, Drawer, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "@/redux/reducers/RootReducers";
import Header from "@/components/Main/Header";
import Menu, { navMenuType } from "@/components/tools/Menu";
import { AddCircle } from "@mui/icons-material";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  children: React.ReactNode;
}

export default function Main({ window, children }: Props) {
  const {
    MainUi: { menu },
  } = useSelector((state: RootReducerType) => state);

  const dispatch = useDispatch();

  const navMenuArray: navMenuType[] = [
    {
      text: "New Entry",
      icon: <AddCircle />,
      url: "/",
    },
  ];

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={menu}
          onClose={() => dispatch({ type: "MENU_TOGGLE" })}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar />
          <Divider />
          <Menu listArray={navMenuArray} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Toolbar />
          <Divider />
          <Menu listArray={navMenuArray} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: [1, 1, 3],
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className="bg-base-300 min-h-screen"
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
