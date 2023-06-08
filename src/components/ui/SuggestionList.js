import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import { Avatar, Button, ListSubheader, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { client } from "../../utils/api";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
const SuggestionList = () => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.user.profile);
  const [profiles, setProfiles] = useState([]);

  const profileShowHandler = (event) => {
    event.preventDefault();
    router.push(`/homepage/profile`);
  };

  const profileShowHandler2 = (event) => {
    event.preventDefault();
    const userId = event.target.userId.value;
    router.push(`/homepage/profile/${userId}`);
  };

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
        mt: 8,
        borderRadius: 3,
        border: 1,
        borderColor: "#E0E0E0",
        boxShadow:
          "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
      }}
      subheader={
        <ListSubheader>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                onClick={profileShowHandler}
                src={`data:image/jpeg;base64,${profile.thumbnail_profile_picture}`}
                sx={{ height: 50, width: 50, mt: 1.5 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography sx={{ ml: 2 }} variant="h4">
                  {profile.user_name}
                </Typography>
              }
              sx={{ mr: 5, mt: 2 }}
            />
          </ListItem>
          <Typography variant="h6" sx={{ mt: 1.5 }}>
            Suggested profiles
          </Typography>
        </ListSubheader>
      }
    >
      {profiles.map((profile) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Box component="form" noValidate onSubmit={profileShowHandler2}>
                  <IconButton type="submit">
                    <Avatar
                      src={`data:image/jpeg;base64,${profile.thumbnail_profile_picture}`}
                      sx={{
                        border: 1,
                        borderColor: "#E0E0E0",
                        height: 45,
                        width: 45,
                      }}
                    />
                  </IconButton>
                  <input name="userId" value={profile.user_id} type="hidden" />
                </Box>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ ml: 1 }} variant="h5">
                    {profile.user_name}
                  </Typography>
                }
                sx={{ mt: 3.5 }}
              />
            </ListItem>
          </>
        );
      })}
    </List>
  );
};

export default SuggestionList;
