import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

export interface navMenuType {
  text: string;
  url: string;
  icon: ReactNode;
}

interface props {
  listArray: navMenuType[];
}

const Menu = ({ listArray }: props) => {
  const { push } = useRouter();

  return (
    <List>
      {listArray?.map((element, index) => (
        <ListItem onClick={() => push(element?.url)} key={index} disablePadding>
          <ListItemButton>
            <ListItemIcon>{element?.icon}</ListItemIcon>
            <ListItemText primary={element?.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Menu;
