import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Divider, IconButton, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userReducer";
import client from "../../utils/api";

const socket = io("http://localhost:5000", {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
  autoConnect: false,
  auth: {},
});

export default function MessageContainer(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [reciverSocketId, setReciverSocketId] = useState({});

  console.log(props.messages);

  useEffect(() => {
    if (!props) return;
    if (props.sessionId) {
      socket.auth = { sessionId: props.sessionId };
      socket.connect();
    }
    if (props.sessionId === "") {
      socket.auth = { userId: props.userProfile.user_id };
      socket.connect();
    }

    socket.on("connection_error", (err) => {
      console.log(err.message);
    });

    socket.on("private_message", ({ message, from }) => {
      props.setMessages({ message, fromSelf: false, from });
    });

    socket.on("users", (users) => {
      const socketId = users.filter((user) => {
        return user.user_id === props.profile.user_id;
      });
      setReciverSocketId(socketId[0]);
    });

    socket.on("session", ({ sessionId, userId }) => {
      socket.auth = { sessionId };
      dispatch(userActions.setSessionId(sessionId));
      socket.userId = userId;
    });

    return () => {
      socket.off("connection_error");
      socket.off("users");
      socket.off("session");
      socket.off("private_message");
    };
  }, [props]);

  const messageHandler = (message) => {
    props.setMessages({ message, fromSelf: true });
    socket.emit("private_message", {
      message,
      to: reciverSocketId.socket_id,
      toId: props.profile.user_id,
      from: props.userProfile.user_id,
    });
  };

  return (
    <Card sx={{ width: "100%", borderRadius: 4 }}>
      <CardHeader
        avatar={
          <Avatar
            src={`data:image/jpeg;base64,${props?.profile?.profile_picture}`}
            sx={{
              width: 40,
              height: 40,
              border: 1,
              borderColor: "#E2E2E2",
            }}
          />
        }
        title={<Typography variant="h5">{props?.profile.user_name}</Typography>}
      ></CardHeader>
      <Divider />
      <CardContent sx={{ height: "380px" }}>
        {props.messages.map((message) => {
          return (
            <ChatMsg
              avatar={
                message?.sender_id === props?.profile.user_id ||
                message?.receiver_id === props?.profile?.user_id
                  ? `data:image/jpeg;base64,${props?.profile?.profile_picture}`
                  : ""
              }
              side={
                message?.sender_id === props?.userProfile.user_id ||
                message?.fromSelf
                  ? "right"
                  : ""
              }
              messages={[message.message]}
            />
          );
        })}
      </CardContent>
      <FormControl fullWidth variant="filled" sx={{ mt: 5 }}>
        <InputLabel>
          <h4>Message</h4>
        </InputLabel>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            messageHandler(e.target.message.value);
          }}
        >
          <FilledInput
            sx={{ width: "100%" }}
            name="message"
            startAdornment={
              <InputAdornment position="start">
                <TagFacesIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </FormControl>
    </Card>
  );
}
