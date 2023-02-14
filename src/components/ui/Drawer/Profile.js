import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Router from "next/router";

export default function Profile() {
  const clickHandler = () => {
    Router.push(`/homepage/profile`);
  };

  return (
    <Grid
      container
      rowSpacing={12}
      direction="column"
      justifyContent="centre"
      alignItems="flex-start"
    >
      <Grid item xs={8}>
        <List>
          <ListItem key="Profile" disablePadding>
            <ListItemButton onClick={clickHandler}>
              <ListItemIcon>
                <Tooltip title="Profile" placement="top-end">
                  <AccountCircleIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
