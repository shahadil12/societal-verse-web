import HomeIcon from "@mui/icons-material/Home";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const clickHandler = () => {
    const { userName } = router.query;
    router.push(`/${userName}j`);
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
          <ListItem key="Home" disablePadding>
            <ListItemButton onClick={clickHandler}>
              <ListItemIcon>
                <Tooltip title="Home" placement="top-end">
                  <HomeIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
