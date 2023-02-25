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
  border: "2px solid #000",
  boxShadow: 24,
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
    defaultMode === "dark" ? <BrightnessHighIcon /> : <Brightness4Icon />;

  const bcSidebar = defaultMode === "dark" ? "#000000" : "#FFFFFF";

  const modal = (
    <Modal open={logOutModalOpen} onClose={handleClose}>
      <Box sx={style}>
        <h3 style={{ marginLeft: 30 }}>Are you sure you want to Logout?</h3>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
          <Button variant="contained" onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={logoutHandler}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  return (
    <div id="app">
      {modal}
      <Sidebar breakPoint="xm">
        <Menu style={{ height: "100vh", backgroundColor: bcSidebar }}>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => collapseSidebar()}
            style={{ textAlign: "center", marginBottom: 40, marginTop: 40 }}
          >
            <h2>Societal Verse</h2>
          </MenuItem>
          <MenuItem
            onClick={() => Router.push("/homepage")}
            icon={<HomeIcon />}
            className={"menuItem"}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<AddCircleIcon />}
            onClick={() => Router.push("/homepage/post")}
            className="menuItem"
          >
            Create
          </MenuItem>
          <MenuItem
            onClick={() => Router.push("/homepage/profile")}
            icon={<AccountCircleIcon />}
            className="menuItem"
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => Router.push("/homepage/message")}
            icon={<MessageIcon />}
            className="menuItem"
          >
            Message
          </MenuItem>
          <MenuItem
            onClick={() => setLogoutModalOpen(true)}
            icon={<LogoutIcon />}
            className="menuItem"
          >
            Logout
          </MenuItem>
          <MenuItem
            icon={
              <IconButton onClick={modeHandler} color="inherit">
                {modeIcon}
              </IconButton>
            }
            style={{ marginTop: 50 }}
          >
            {defaultMode === "dark" ? "Light Mode" : "Dark Mode"}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
