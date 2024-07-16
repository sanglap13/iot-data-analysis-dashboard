import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";
import { AltorLogo } from "../../../assets";
import { SIDEBAR_DETAILS } from "../../../constants/sidebarDetails";

const Sidebar: React.FC<any> = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundColor: "#215fab",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Toolbar />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" color="#ffffff" ml="27%" mb="1rem">
          ADMIN
        </Typography>
      </Box>
      <Box mb="100px">
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            alt="profile-user"
            width="100px"
            height="100px"
            src={AltorLogo}
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
        </Box>
        <Box textAlign="center">
          <Typography
            variant="h5"
            color="#ffffff"
            fontWeight="bold"
            sx={{ m: "10px 0 0 0" }}
          >
            Sanglap Mridha
          </Typography>
          <Typography variant="h5" color="#c2c2bd">
            SDE - Fullstack
          </Typography>
        </Box>
      </Box>
      <Divider />

      <List>
        {SIDEBAR_DETAILS.map((text, index) => {
          const { label, redirection_link, icon } = text;
          return (
            <ListItem key={label} disablePadding>
              <ListItemButton onClick={() => navigate(redirection_link)}>
                <ListItemIcon sx={{ color: "#c2c2bd" }}>
                  {typeof icon === "function" ? icon() : icon}
                </ListItemIcon>
                <ListItemText sx={{ color: "#c2c2bd" }} primary={label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Box>
  );
};

export default Sidebar;
