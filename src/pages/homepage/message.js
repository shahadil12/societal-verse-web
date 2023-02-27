import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import SideBar from "../../components/ui/SideBar";
import { Avatar, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import client from "../../utils/api";
import EmptyContainer from "../../components/message/emptyContainer";
import MessageContainer from "../../components/message/messageContainer";

export default function Inbox() {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState({});
  const [followingProfile, setFollowingProfile] = useState([]);
  const [isEmptyContainer, setIsEmptyContainer] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const followingProfile = async () => {
      try {
        const response = await client.get("/user/followingProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setFollowingProfile(response.data.profiles[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    followingProfile();

    const profile = async () => {
      try {
        const response = await client.get(`/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setProfile(response.data.profile);
        }
      } catch (error) {
        console.log(error);
      }
    };
    profile();
  }, []);

  return (
    <Grid container>
      <Grid item>
        <SideBar />
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          height: " 100%",
          width: "100%",
          maxWidth: "935px",
          border: 1,
          margin: 8,
        }}
      >
        <Box sx={{ display: "flex", width: "250px" }}>
          <List
            sx={{
              border: 1,
              width: "450px",
            }}
            subheader={
              <>
                <ListSubheader
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    height: "70px",
                  }}
                >
                  <h3>{profile.user_name}</h3>
                </ListSubheader>
                <Divider />
              </>
            }
          >
            {followingProfile?.map((profile, i) => {
              return (
                <>
                  <ListItem
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEmptyContainer(false);
                      setIndex(i);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={`data:image/jpeg;base64,${profile?.profile_picture}`}
                        sx={{ width: 55, height: 55 }}
                      />
                    </ListItemAvatar>
                    <h4 style={{ paddingLeft: 10, paddingBottom: 20 }}>
                      {profile.user_name}
                    </h4>
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "550px",
            width: "700px",
          }}
        >
          <>
            {isEmptyContainer ? (
              <EmptyContainer />
            ) : (
              <MessageContainer profile={followingProfile[index]} />
            )}
          </>
        </Box>
      </Grid>
    </Grid>
  );
}
