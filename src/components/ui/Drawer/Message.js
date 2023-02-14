import MessageIcon from "@mui/icons-material/Message";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Router from "next/router";

export default function Message() {
  const clickHandler = () => {
    Router.push("/homepage/inbox");
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
          <ListItem key="Message" disablePadding>
            <ListItemButton onClick={clickHandler}>
              <ListItemIcon>
                <Tooltip title="Message" placement="top-end">
                  <MessageIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Message" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
