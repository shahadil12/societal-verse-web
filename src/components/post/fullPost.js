import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { Modal, Box, Divider, Avatar, Typography, Button } from "@mui/material";
import client from "../../utils/api";
import { useRouter } from "next/router";
import Like from "./like";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 0,
  margin: 0,
};

const FullPost = (props) => {
  const profile = useSelector((state) => state.user.profile);

  return (
    <Modal open={props.open} onClose={props.close}>
      <Box sx={style}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              borderRight: 1,
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={`data:image/jpeg;base64,${props?.post?.userDetail?.thumbnail_profile_picture}`}
                />
              }
              title={props?.post?.userDetail?.user_name}
              sx={{ borderBottom: 1 }}
            ></CardHeader>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <List sx={{ height: 331, maxHeight: 331, overflow: "auto" }}>
                {props?.post?.comments.map((comment, i) => {
                  return (
                    <>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            src={`data:image/jpeg;base64,${props?.post?.commenterDetails[i]?.thumbnail_profile_picture}`}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <h5>
                              {props?.post?.commenterDetails[i]?.user_name}
                            </h5>
                          }
                          secondary={<h6>{comment?.comment}</h6>}
                        ></ListItemText>
                        {profile.user_id === comment.user_id ? (
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              props.commentDeleteHandler(comment.id);
                            }}
                          >
                            Delete
                          </Button>
                        ) : (
                          ""
                        )}
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
              </List>
              <CardActions disableSpacing>
                <Typography variant="h5">
                  <h5>{props?.post?.likes} likes</h5>
                </Typography>
              </CardActions>
              <h6 style={{ marginLeft: 18 }}>28 MINUTES AGO</h6>
              <FormControl
                fullWidth
                variant="filled"
                onSubmit={(e) => {
                  e.preventDefault();
                  props.commentHandler(e);
                }}
              >
                <InputLabel>Comment</InputLabel>
                <FilledInput
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
                <input
                  name="postId"
                  value={props.post?.post?.id}
                  type="hidden"
                />
              </FormControl>
            </Box>
          </Box>
          <Box
            width={500}
            height={500}
            sx={{ mt: 2, mb: 2, maxHeight: 500, maxWidth: 500 }}
          >
            <CardMedia
              component="img"
              image={`data:image/jpeg;base64,${props?.post?.post?.picture}`}
              sx={{
                height: 500,
                width: 500,
              }}
            />
          </Box>
        </Card>
      </Box>
    </Modal>
  );
};

export default FullPost;
