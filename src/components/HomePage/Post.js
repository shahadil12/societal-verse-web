import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container maxWidth="700px">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <img
              className="profile"
              src="https://images.unsplash.com/photo-1670239510546-5a59f3039d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              width="45"
              height="45"
            ></img>
          }
          subheader="rvcjinsta"
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />

        <CardMedia
          component="img"
          height="350"
          image="https://images.unsplash.com/photo-1662719012928-4017f17d5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h9" color="text.secondary">
            73,458 likes
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography component="div">
              <strong> rvcjinsta </strong>
              Go where you feel most alive. If you love nature, you will find
              beauty anywhere. Adopt the pace of nature.
            </Typography>
            <Typography sx={{ color: "grey" }}>
              View all 280 comments
            </Typography>
            <Typography sx={{ color: "grey" }}>28 MINUTES AGO</Typography>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-comment">
                Comment
              </InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">
                    <TagFacesIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
