import * as React from "react";
import SideBar from "../../components/ui/SideBar";
import Post from "../../components/post/Post";
import Grid from "@mui/material/Grid";
import SuggestionList from "../../components/ui/SuggestionList";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HomePage() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  if (!token) router.push("/");
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Grid container columnSpacing={11}>
      <Grid item sx={{ position: "fixed" }}>
        <SideBar />
      </Grid>
      <Grid item sx={{ ml: isMobile ? 14 : 45 }}>
        <Post />
      </Grid>
      <Grid item sx={{ display: isMobile ? "none" : "" }}>
        <SuggestionList />
      </Grid>
    </Grid>
  );
}
