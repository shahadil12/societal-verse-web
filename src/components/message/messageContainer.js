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

const MessageContainer = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [reciverSocketId, setReciverSocketId] = useState({});
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);

  console.log(messages);
  console.log(reciverSocketId);

  useEffect(() => {
    const sessionId = async () => {
      try {
        const response = await client.post(
          "/user/sessionId",
          {
            userId: props.userProfile.user_id,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.data.session) {
          socket.auth = { sessionId: response.data.session.id };
        }
        if (!response.data.session) {
          socket.auth = { userId: props?.userProfile?.user_id };
        }
      } catch (error) {
        console.log(error);
      }
    };
    sessionId();
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

    socket.on("private_message", ({ message, from }) => {
      console.log("hii");
      setMessages((prevState) => {
        return [...prevState, { message, fromSelf: false, from }];
      });
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
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connection_error");
      socket.off("session");
      socket.off("private_message");
    };
  }, []);

  const messageHandler = (message) => {
    setMessages((prevState) => {
      return [...prevState, { message, fromSelf: true }];
    });
    socket.emit("private_message", {
      message,
      to: reciverSocketId.socket_id,
      toId: props.profile.user_id,
      from: props.userProfile.user_id,
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
