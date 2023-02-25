import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Button, ListSubheader } from "@mui/material";
import { useState, useEffect } from "react";
import client from "../../utils/api";
import { useSelector } from "react-redux";

const SuggestionList = () => {
  const token = useSelector((state) => state.auth.token);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const profiles = async () => {
      try {
        const suggestedProfile = await client.get("/profile/suggestion", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (suggestedProfile.data.success) {
          setProfiles(suggestedProfile.data.profiles);
        }
      } catch (error) {
        console.log(error);
      }
    };
    profiles();
  }, []);
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", mt: 7 }}
      subheader={
        <ListSubheader>
          <h3>Who to follow</h3>
        </ListSubheader>
      }
    >
      {profiles.map((profile) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  src={`data:image/jpeg;base64,${profile.thumbnail_profile_picture}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={profile.user_name}
                sx={{ mr: 10, mt: 2 }}
              />
              <Button variant="outlined" sx={{ fontSize: 13, mt: 1.2 }}>
                <h4> Follow</h4>
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
};

export default SuggestionList;
