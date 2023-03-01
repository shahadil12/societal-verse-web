import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import SideBar from "../../components/ui/SideBar";
import { Avatar, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import client from "../../utils/api";
import EmptyContainer from "../../components/message/emptyContainer";
import MessageContainer from "../../components/message/messageContainer";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function Inbox() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  if (!token) router.push("/");
  const [followingProfile, setFollowingProfile] = useState([]);
  const [isEmptyContainer, setIsEmptyContainer] = useState(true);
  const [index, setIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const profile = useSelector((state) => state.user.profile);
  const storeSessionId = useSelector((state) => state.user.sessionId);
  const storeReceiverSocketId = useSelector(
    (state) => state.user.receiverSocketId
  );

  const getMessages = async (url, token) => {
    try {
      const response = await client.post(
        url,
        {
          userId: profile.user_id,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSessionId = async (url, token) => {
    try {
      const response = await client.post(
        url,
        {
          userId: profile.user_id,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSessionId(response.data.session.id);
    } catch (error) {
      return error;
    }
  };
  const getFollowingProfile = async (url, token) => {
    try {
      const response = await client.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setFollowingProfile(response.data.profiles[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useSWR(["/user/sessionId", token], ([url, token]) => {
    getSessionId(url, token);
  });
  useSWR(["/user/messages", token], ([url, token]) => {
    getMessages(url, token);
  });
  useSWR(["/user/followingProfile", token], ([url, token]) => {
    getFollowingProfile(url, token);
  });

  const messageHandler = (message) =>
    setMessages((prevState) => [...prevState, message]);

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
          borderRadius: 4,
          borderColor: "#E2E2E2",
          ml: 13,
          mt: 7,
          boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ display: "flex", width: "250px" }}>
          <List
            sx={{
              border: 1,
              borderColor: "#E2E2E2",
              width: "450px",
              borderRadius: 4,
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
                    borderRadius: 4,
                  }}
                >
                  <Typography variant="h4">{profile.user_name}</Typography>
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
                        sx={{
                          width: 55,
                          height: 55,
                          border: 1,
                          borderColor: "#E2E2E2",
                        }}
                      />
                    </ListItemAvatar>
                    <Typography variant="h5" sx={{ ml: 2 }}>
                      {profile.user_name}
                    </Typography>
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </Box>
        {isEmptyContainer ? (
          <EmptyContainer />
        ) : (
          <MessageContainer
            profile={followingProfile[index]}
            userProfile={profile}
            messages={messages}
            sessionId={sessionId}
            setMessages={messageHandler}
            storeSessionId={storeSessionId}
            storeReceiverSocketId={storeReceiverSocketId}
          />
        )}
      </Grid>
    </Grid>
  );
}
