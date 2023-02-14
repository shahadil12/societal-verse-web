import Drawer from "@mui/material/Drawer";
import Profile from "./Profile";
import Search from "./Search";
import Notification from "./Notification";
import Message from "./Message";
import Create from "./Create";
import Home from "./Home";
import MoreMenu from "./More";

const drawerWidth = 240;

export default function SideBar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Home />
      <Search />
      <Message />
      <Notification />
      <Create />
      <Profile />
      <MoreMenu />
    </Drawer>
  );
}
