import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import SideBar from "../../components/ui/SideBar/SideBar";
import { Avatar, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg";
import useUser from "../../hooks/useUser";

const messagers = [
  {
    url: "https://images.unsplash.com/photo-1577611473531-542453710a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    userName: "Altamash Samani",
    message: "Sent You A Message",
  },
  {
    url: "https://images.unsplash.com/photo-1671425155082-be2b52959dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    userName: "Hussain Shaikh",
    message: "You Reacted to Their Story",
  },
  {
    url: "https://images.unsplash.com/photo-1542655071-b312770dc237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    userName: "Ovais Raza",
    message: "Liked Your Message",
  },
  {
    url: "https://images.unsplash.com/photo-1669817683129-869ca3c0bd3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    userName: "RIZWANSHAIKH",
    message: "Sent You A Message",
  },
];

const messageContainer = (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      height: "550px",
      width: "700px",
    }}
  >
    <MapsUgcIcon
      sx={{
        height: "100px",
        width: "100px",
        mb: 1,
      }}
    />
    <h3>Send private photos and messages to a friend.</h3>
  </Box>
);

const messageSender = (
  <Card>
    <CardHeader avatar={<Avatar>R</Avatar>} title="Shah Adil"></CardHeader>
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
      <FilledInput
        startAdornment={
          <InputAdornment position="start">
            <TagFacesIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  </Card>
);

export default function Inbox() {
  useUser({ redirectTo: "/" });

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
                  <h2>Shah Adil</h2>
                </ListSubheader>
                <Divider />
              </>
            }
          >
            {messagers.map((messenger, i) => {
              return (
                <>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        src={messenger.url}
                        sx={{ width: 55, height: 55 }}
                      />
                    </ListItemAvatar>
                    <h4 style={{ paddingLeft: 10, paddingBottom: 20 }}>
                      {messenger.userName}
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
          {messageSender}
        </Box>
      </Grid>
    </Grid>
  );
}
