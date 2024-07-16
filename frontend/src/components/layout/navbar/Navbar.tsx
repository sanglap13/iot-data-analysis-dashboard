import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const Navbar = () => {
  //for sidebar
  const [open, setOpen] = useState(false);

  //using useNavigate from react-router-dom
  const navigate = useNavigate();

  //toggle for sidebar
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  //importing sidebar
  const DrawerList = <Sidebar toggleDrawer={toggleDrawer} />;

  return (
    <div
      className="navbar"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        p={2}
        sx={{
          background:
            "linear-gradient(90deg, rgba(2,194,204,1) 0%, rgba(62,121,218,1) 45%, rgba(125,43,232,1) 100%)",
        }}
      >
        <Box display="flex" alignItems="center">
          <Button className="glow-on-hover" onClick={toggleDrawer(true)}>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>

          {/* NAME */}
          <Box display="flex" alignItems="center">
            <div onClick={() => navigate("/")}>
              <Typography
                variant="h4"
                color="#ffffff"
                fontFamily="Anta"
                sx={{ cursor: "pointer" }}
              >
                DATADESK
              </Typography>
            </div>
          </Box>
        </Box>

        {/* ICONS */}
        <Box display="flex">
          <IconButton>
            <NotificationsOutlinedIcon sx={{ color: "#ffffff" }} />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon sx={{ color: "#ffffff" }} />
          </IconButton>
          <IconButton>
            <PersonOutlinedIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;
