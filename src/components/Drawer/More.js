import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";

export default function MoreMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        container
        rowSpacing={12}
        direction="column"
        justifyContent="centre"
        alignItems="flex-start"
      >
        <Grid item xs={8}>
          <List>
            <ListItem key="Home" disablePadding>
              <ListItemButton
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <ListItemIcon>
                  <ClearAllIcon sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="More" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "top" }}
        sx={{ width: 200 }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
}
