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
import { Avatar, Divider, IconButton, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

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

const MessageContainer = (props) => {
  const profile = useSelector((state) => state.user.profile);
  const [reciverSocketId, setReciverSocketId] = useState({});
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);

  console.log(messages);

  useEffect(() => {
    socket.auth = { userId: props.profile.user_id };
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("connetion_error", (err) => {
      console.log(err.message);
    });

    socket.on("users", (users) => {
      const socketId = users.filter((user) => {
        return user.userId === props.profile.user_id;
      });
      setReciverSocketId(socketId[0]);
    });

    socket.on("private_message", (message) => {
      console.log("bye");
      setMessages((prevState) => {
        return [...prevState, { message, fromSelf: false }];
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connection_error");
      socket.off("users");
      socket.off("private_message");
    };
  }, []);

  const messageHandler = (message) => {
    setMessages((prevState) => {
      return [...prevState, { message, fromSelf: true }];
    });
    socket.emit("private_message", {
      message,
      to: reciverSocketId.socketID,
      toId: props.profile.userId,
      from: profile.user_id,
    });
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            src={`data:image/jpeg;base64,${props?.profile?.profile_picture}`}
          />
        }
        title={props?.profile.user_name}
      ></CardHeader>
      <Divider />
      <CardContent>
        <ChatMsg
          avatar={""}
          messages={[
            "Hi Jenny, How r u today?",
            "Did you train yesterday",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.",
          ]}
        />
        <ChatMsg
          side={"right"}
          messages={[
            "Great! What's about you?",
            "Of course I did. Speaking of which check this out",
          ]}
        />
        <ChatMsg avatar={""} messages={["Im good.", "See u later."]} />
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
};

export default MessageContainer;