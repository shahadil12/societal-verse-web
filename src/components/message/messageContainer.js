import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRef } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userReducer";

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
  const bottomRef = useRef(null);
  const [reciverSocketId, setReciverSocketId] = useState({});
  const [message, setMessage] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isConnected, setIsConnected] = useState(socket.connected);

  // useEffect(() => {
  //   lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [props.messages]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    if (props?.sessionId || props?.storeSessionId) {
      socket.auth = { sessionId: props?.sessionId || props?.storeSessionId };
      socket.connect();
    }
    if (!props?.sessionId) {
      socket.auth = { userId: props?.userProfile?.user_id };
      socket.connect();
    }

    socket.on("connection_error", (err) => {
      console.log(err.message);
    });

    socket.on("messageResponse", ({ message, from }) => {
      props.setMessages({ message, fromSelf: false, from });
    });

    socket.on("private_message", ({ message, from }) => {
      props.setMessages({ message, fromSelf: false, from });
    });

    socket.on("users", (users) => {
      const socketId = users.filter((user) => {
        return user.user_id === props?.profile?.user_id;
      });
      dispatch(userActions.setReceiverSocketId(socketId[0]?.socket_id));
      setReciverSocketId(socketId[0]);
    });

    socket.on("session", ({ sessionId, userId }) => {
      socket.auth = { sessionId };
      dispatch(userActions?.setSessionId(sessionId));
      socket.userId = userId;
    });

    return () => {
      socket.off("connection_error");
      socket.off("users");
      socket.off("session");
      socket.off("private_message");
      socket.off("messageResponse");
    };
  }, []);

  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const messageHandler = (message) => {
    props.setMessages({ message, fromSelf: true });
    console.log(props?.storeReceiverSocketId);
    socket.emit("private_message", {
      message,
      to: reciverSocketId?.socket_id || props?.storeReceiverSocketId,
      toId: props?.profile?.user_id,
      from: props?.userProfile?.user_id,
    });
    setMessage("");
  };

  return (
    <Card sx={{ width: "100%", borderRadius: 4, ml: isMobile ? 10 : 0 }}>
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
        title={
          <Typography variant="h5">{props?.profile?.user_name}</Typography>
        }
      ></CardHeader>
      <Divider />
      <CardContent sx={{ height: "380px", overflowY: "scroll" }}>
        <List>
          {props?.messages.map((message, i) => {
            return (
              <ListItem key={i}>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align={
                        message?.sender_id === props?.userProfile?.user_id ||
                        message?.fromSelf
                          ? "right"
                          : "left"
                      }
                      primary={message.message}
                      sx={{
                        color:
                          message?.sender_id === props?.userProfile?.user_id ||
                          message?.fromSelf
                            ? "black"
                            : "#306cce",
                      }}
                    ></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            );
          })}
          <div ref={bottomRef} />
        </List>
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
            value={message}
            onChange={messageChangeHandler}
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
