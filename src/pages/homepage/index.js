import * as React from "react";
import SideBar from "../../components/ui/SideBar/SideBar";
import Post from "../../components/post/Post";
import Grid from "@mui/material/Grid";
import SuggestionList from "../../components/ui/SuggestionList";
import SearchBar from "../../components/ui/Inputs/SearchBar";

export default function HomePage() {
  return (
    <Grid container>
      <Grid item xm={5}>
        <SideBar />
      </Grid>
      <Grid item xm={5}>
        <Post />
      </Grid>
      <Grid item xm={5}>
        <SuggestionList />
      </Grid>
    </Grid>
  );
}
