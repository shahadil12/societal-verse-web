import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Avatar, Button, ListSubheader } from "@mui/material";
import { useState, useEffect } from "react";
import client from "../../utils/api";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

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
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        mt: 7,
        borderRadius: 2,
        border: 1,
        borderColor: "#E0E0E0",
        boxShadow:
          "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
      }}
      subheader={
        <ListSubheader sx={{ borderBottom: 1, borderColor: "#E0E0E0" }}>
          <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
            Suggested Profile
          </Typography>
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
                  sx={{ height: 50, width: 50 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ ml: 2 }} variant="h5">
                    {profile.user_name}
                  </Typography>
                }
                sx={{ mr: 10, mt: 3 }}
              />
            </ListItem>
          </>
        );
      })}
    </List>
  );
};

export default SuggestionList;
