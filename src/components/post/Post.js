import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import FullPost from "./fullPost";
import useInput from "../../hooks/useInput";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Typography,
  Modal,
  Box,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import client from "../../utils/api";

const isValidComment = /^.{0,500}$/;

export default function Post(props) {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  if (!token) router.push("/");
  const [posts, setPosts] = useState([]);
  const [postIndex, setPostIndex] = useState(0);
  const [logOutModalOpen, setLogoutModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isUserAlreadtLiked, setIsUserAlreadyLiked] = useState(false);
  const handleClose = () => setLogoutModalOpen(false);

  const {
    value: enteredComment,
    valueIsValid: enteredCommentIsValid,
    hasError: enteredCommentHasError,
    valueChangeHandler: commentChangeHandler,
    valueBlurHandler: commentBlurHandler,
    reset: enteredCommentReset,
  } = useInput((value) => value.match(isValidComment));

  let formIsValid = false;
  if (enteredCommentIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    const getPost = async () => {
      try {
        const posts = await client.get("/post", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(posts.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);

  const commentSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const postId = event.target.postId.value;
      const createComment = await client.post(
        `/post/comment/${postId}`,
        {
          comment: enteredComment,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      enteredCommentReset();
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = async (event) => {
    try {
      event.preventDefault();
      const postId = event.target.postId.value;
      if (!liked) {
        const response = await client.post(
          `/post/like/${postId}`,
          {},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLiked(true);
      }

      if (liked) {
        const response = await client.delete(`/post/like/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const currentTime = new Date().toLocaleTimeString();
  // const postUploadTime = new Date(updatedAt).toLocaleTimeString();

  return (
    <>
      <FullPost
        post={posts[postIndex]}
        open={logOutModalOpen}
        close={handleClose}
      />
      {posts.map((post, i) => {
        return (
          <>
            <Card sx={{ maxWidth: 500, ml: 14, mr: 8, mt: 7 }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={`data:image/jpeg;base64,${post?.userDetail?.thumbnail_profile_picture}`}
                  />
                }
                subheader={<h3>{post?.userDetail?.user_name}</h3>}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
              />

              <CardMedia
                component="img"
                height="350"
                image={`data:image/jpeg;base64,${post?.post?.picture}`}
              />
              <CardActions disableSpacing>
                <Box component="form" noValidate onSubmit={likeHandler}>
                  <IconButton type="submit">
                    {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <input name="postId" value={post?.post?.id} type="hidden" />
                </Box>
                <Typography variant="h5">
                  <h5>{post?.likes} likes</h5>
                </Typography>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={() => {
                    setLogoutModalOpen(true);
                    setPostIndex(i);
                  }}
                >
                  <ChatBubbleOutlineIcon />
                  <Typography variant="h5" sx={{ ml: 1 }}>
                    <h5>View all {post?.comments?.length} comments</h5>
                  </Typography>
                </IconButton>
              </CardActions>
              <CardContent>
                <h4>
                  <strong>{post?.userDetail?.user_name}</strong>
                  {post?.post?.caption}
                </h4>
                <h5>
                  <br />
                  28 MINUTES AGO
                </h5>
                <Box
                  component="form"
                  noValidate
                  onSubmit={commentSubmitHandler}
                >
                  <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                    <InputLabel>Comment</InputLabel>
                    <FilledInput
                      value={enteredComment}
                      error={enteredCommentHasError}
                      hiddenLabel={
                        !enteredCommentHasError
                          ? "Comment should be less than 500 characters"
                          : ""
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          <TagFacesIcon />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton type="submit" disabled={!formIsValid}>
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <input name="postId" value={post?.post?.id} type="hidden" />
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          </>
        );
      })}
    </>
  );
}
