import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import MessageContain from "./MessageContain";
import { useRouter } from "next/router";

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
  {
    url: "https://plus.unsplash.com/premium_photo-1671111192830-07f8c54b0bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    userName: "Sahil_Ansari",
    message: "Added to thier Story",
  },
  {
    url: "https://images.unsplash.com/photo-1671363332482-d3d2e53808d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    userName: "Rizwan",
    message: "Sent You A Message",
  },
  {
    url: "https://images.unsplash.com/photo-1671025203850-1175e406a7f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    userName: "Aqib",
    message: "Sent You A Message",
  },
  {
    url: "https://images.unsplash.com/photo-1671514187753-fce32cc8b3ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    userName: "Adnan",
    message: "Sent You A Message",
  },
  {
    url: "https://images.unsplash.com/photo-1671400833073-0a066e059f44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    userName: "Amit",
    message: "Sent You A Message",
  },
];

export default function Messages() {
  const router = useRouter();
  const { userName } = router.query;

  return (
    <Box
      sx={{
        border: 1,
        height: "100vh",
        width: "900px",
        position: "absolute",
        right: "133px",
        mt: 3,
      }}
    >
      <MessageContain />
      <List
        sx={{
          width: "350px",
          bgcolor: "white",
          maxHeight: "100%",
          overflow: "auto",
        }}
        subheader={<li />}
      >
        <li>
          <ui>
            <ListSubheader sx={{ display: "flex", justifyContent: "center" }}>
              {userName.toUpperCase()}
            </ListSubheader>
            <Divider />
            {messagers.map((messenger, i) => {
              return (
                <>
                  <ListItem>
                    <ListItemAvatar>
                      <img className="Avatar" src={messenger.url} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ pl: 2 }}
                      primary={messenger.userName}
                      secondary={messenger.message}
                    />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </ui>
        </li>
      </List>
    </Box>
  );
}
