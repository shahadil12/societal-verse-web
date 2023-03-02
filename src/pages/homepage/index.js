import * as React from "react";
import SideBar from "../../components/ui/SideBar";
import Post from "../../components/post/Post";
import Grid from "@mui/material/Grid";
import SuggestionList from "../../components/ui/SuggestionList";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Box } from "@mui/system";

export default function HomePage() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  if (!token) router.push("/");

  return (
    <Grid container columnSpacing={11}>
      <Grid item sx={{ position: "fixed" }}>
        <SideBar />
      </Grid>
      <Grid item sx={{ ml: 45 }}>
        <Post />
      </Grid>
      <Grid item>
        <SuggestionList />
      </Grid>
    </Grid>
  );
}
