import * as React from "react";
import SideBar from "../../components/Drawer/SideBar";
import Post from "../../components/HomePage/Post";
import Story from "../../components/HomePage/Story";
import Container from "@mui/material/Container";

export default function HomePage() {
  return (
    <>
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
    </>
  );
}
