import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SideBar from "../Drawer/SideBar";
import Post from "./Post";
import Story from "./Story";
import Container from "@mui/material/Container";

const theme = createTheme({
  palette: {
    primary: {
      main: "#060606",
    },
  },
});

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <SideBar></SideBar>
      <Container
        sx={{
          position: "absolute",
          height: "100%",
          width: "82%",
          left: 240,
        }}
      >
        <Story></Story>
        <Post></Post>
      </Container>
    </ThemeProvider>
  );
}
