import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SendIcon from "@mui/icons-material/Send";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { Modal, Box, Divider, Avatar, Typography, Button } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { useCreateCommentMutation } from "../../utils/commentApi";
const FullPost = (props) => {
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.user.profile);

  const [comment, setComment] = useState("");
  const [createComment] = useCreateCommentMutation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const commentValueHandler = (event) => {
    setComment(event.target.value);
  };

  const postUploadDate = dayjs(props?.post?.post?.updatedAt)
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 460 : 900,
    bgcolor: "background.paper",
    border: "1px solid #E2E2E2",
    boxShadow:
      "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
  };

  const commentSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const commentResponse = await createComment({
        token: token,
        postId: event.target.postId.value,
        comment: comment,
      });
      if (commentResponse.data.success) {
        props.postRefetch();
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={props.open} onClose={props.close} sx={{ transition: "0.5s" }}>
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
              borderColor: "#E2E2E2",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={`data:image/jpeg;base64,${props?.post?.userDetail?.thumbnail_profile_picture}`}
                  sx={{
                    border: 1,
                    borderColor: "#E2E2E2",
                  }}
                />
              }
              title={
                <Typography variant="h5">
                  {props?.post?.userDetail?.user_name}
                </Typography>
              }
              sx={{ borderBottom: 1, border: 1, borderColor: "#E2E2E2" }}
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
                            sx={{
                              border: 1,
                              borderColor: "#E2E2E2",
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h5">
                              {props?.post?.commenterDetails[i]?.user_name}
                            </Typography>
                          }
                          secondary={
                            <Typography>{comment?.comment}</Typography>
                          }
                        ></ListItemText>
                        {profile.user_id === comment.user_id ? (
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              props.commentDeleteHandler(comment.id);
                            }}
                          >
                            <Typography>Delete</Typography>
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

              <Typography variant="h5" sx={{ ml: 1 }}>
                {props?.post?.likes} likes
              </Typography>

              <Typography sx={{ ml: 1 }}>
                <br />
                {`${postUploadDate}`}
              </Typography>
              <Box component="form" noValidate onSubmit={commentSubmitHandler}>
                <FormControl fullWidth variant="filled">
                  <InputLabel>Comment</InputLabel>
                  <FilledInput
                    value={comment}
                    onChange={commentValueHandler}
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
          </Box>
          <Box
            width={isMobile ? 250 : 500}
            height={500}
            sx={{
              maxHeight: 500,
              maxWidth: isMobile ? 250 : 500,
            }}
          >
            <CardMedia
              component="img"
              image={`data:image/jpeg;base64,${props?.post?.post?.picture}`}
              sx={{
                height: 500,
                width: isMobile ? 250 : 500,
              }}
            />
          </Box>
        </Card>
      </Box>
    </Modal>
  );
};

export default FullPost;
