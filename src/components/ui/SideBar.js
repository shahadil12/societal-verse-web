import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MessageIcon from "@mui/icons-material/Message";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useRouter } from "next/router";
import { useState } from "react";
import { authActions } from "../../store/authReducer";
import client from "../../utils/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #E2E2E2",
  boxShadow:
    "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
  p: 2,
};

export default function SideBar() {
  const Router = useRouter();
  const dispatch = useDispatch();
  const defaultMode = useSelector((state) => state.auth.mode);
  const theme = useTheme();
  const { collapseSidebar } = useProSidebar();
  const [logOutModalOpen, setLogoutModalOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const handleClose = () => setLogoutModalOpen(false);
  const modeHandler = () => dispatch(authActions.setMode());

  const matches = useMediaQuery("(min-width:600px)");

  const logoutHandler = async () => {
    try {
      const logout = await client.post(
        "/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (logout.data.success) {
        localStorage.setItem(
          "persist:user",
          JSON.stringify({
            auth: { token: "", mode: "light" },
            user: { followers: 0, following: 0, profile: {} },
          })
        );

        Router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modeIcon =
    defaultMode === "dark" ? (
      <BrightnessHighIcon sx={{ fontSize: 26 }} />
    ) : (
      <Brightness4Icon sx={{ fontSize: 26 }} />
    );

  const bcSidebar = defaultMode === "dark" ? "#000000" : "#FFFFFF";
  const homeIcon =
    defaultMode === "dark" ? (
      <HomeOutlinedIcon sx={{ fontSize: 26 }} />
    ) : (
      <HomeIcon sx={{ fontSize: 26 }} />
    );
  const postIcon =
    defaultMode === "dark" ? (
      <AddCircleOutlineIcon sx={{ fontSize: 26 }} />
    ) : (
      <AddCircleIcon sx={{ fontSize: 26 }} />
    );
  const profileIcon =
    defaultMode === "dark" ? (
      <AccountCircleOutlinedIcon sx={{ fontSize: 26 }} />
    ) : (
      <AccountCircleIcon sx={{ fontSize: 26 }} />
    );
  const messageIcon =
    defaultMode === "dark" ? (
      <MessageOutlinedIcon sx={{ fontSize: 26 }} />
    ) : (
      <MessageIcon sx={{ fontSize: 26 }} />
    );
  const logOutIcon =
    defaultMode === "dark" ? (
      <LogoutOutlinedIcon sx={{ fontSize: 26 }} />
    ) : (
      <LogoutIcon sx={{ fontSize: 26 }} />
    );
  const homepageIcon =
    defaultMode === "dark" ? (
      <HomeOutlinedIcon sx={{ fontSize: 26 }} />
    ) : (
      <HomeIcon sx={{ fontSize: 26 }} />
    );

  const modal = (
    <Modal open={logOutModalOpen} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h4" sx={{ ml: 3 }}>
          Are you sure you want to Logout?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
          <Button variant="contained" onClick={handleClose} color="error">
            <Typography>Cancel</Typography>
          </Button>
          <Button variant="contained" color="success" onClick={logoutHandler}>
            <Typography>Confirm</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  return (
    <div id="app">
      {modal}
      <Sidebar
        breakPoint="xm"
        style={{
          borderRadius: 7,
          boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Menu style={{ height: "100vh", backgroundColor: bcSidebar }}>
          <MenuItem
            icon={<MenuOutlinedIcon sx={{ fontSize: 30 }} />}
            onClick={() => collapseSidebar()}
            style={{ textAlign: "center", marginBottom: 70, marginTop: 60 }}
          >
            <Typography variant="h3">Societal Verse</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => Router.push("/homepage")}
            icon={homeIcon}
            className={"menuItem"}
            style={{ marginBottom: 10 }}
          >
            <Typography variant="h5">Home</Typography>
          </MenuItem>
          <MenuItem
            icon={postIcon}
            onClick={() => Router.push("/homepage/post")}
            className="menuItem"
            style={{ marginBottom: 10 }}
          >
            <Typography variant="h5">Create</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => Router.push("/homepage/profile")}
            icon={profileIcon}
            className="menuItem"
            style={{ marginBottom: 10 }}
          >
            <Typography variant="h5">Profile</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => Router.push("/homepage/message")}
            icon={messageIcon}
            className="menuItem"
            style={{ marginBottom: 10 }}
          >
            <Typography variant="h5">Message</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => setLogoutModalOpen(true)}
            icon={logOutIcon}
            className="menuItem"
            style={{ marginBottom: 10 }}
          >
            <Typography variant="h5">Logout</Typography>
          </MenuItem>
          {/* <MenuItem
            icon={
              <IconButton onClick={modeHandler} color="inherit">
                {modeIcon}
              </IconButton>
            }
            style={{ marginTop: 50 }}
          >
            {defaultMode === "dark" ? (
              <Typography variant="h5">Light mode</Typography>
            ) : (
              <Typography variant="h5">Dark mode</Typography>
            )}
          </MenuItem> */}
        </Menu>
      </Sidebar>
    </div>
  );
}
