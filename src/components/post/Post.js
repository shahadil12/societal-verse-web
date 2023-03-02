import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
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
import { Avatar, Typography, Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import client from "../../utils/api";
import Like from "./like";

const isValidComment = /^.{0,500}$/;

export default function Post(props) {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  if (!token) router.push("/");
  const [posts, setPosts] = useState([]);
  const [postIndex, setPostIndex] = useState(0);
  const [logOutModalOpen, setLogoutModalOpen] = useState(false);
  const handleClose = () => setLogoutModalOpen(false);
  const [likedChanged, setLikeChanged] = useState(
    posts[postIndex]?.isUserLikedPost
  );
  const likeHandler = (likedChanged) => setLikeChanged(likedChanged);
  const commentChangedHandler = () => {
    setCommentChanged((prevState) => {
      return setCommentChanged(!prevState);
    });
  };
  const [commentChanged, setCommentChanged] = useState(false);
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
  }, [likedChanged, commentChanged]);

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
      if (createComment.data.success) {
        enteredCommentReset();
        setCommentChanged((prevState) => {
          return setCommentChanged(!prevState);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentDeleteHandler = async (commentId) => {
    try {
      const response = await client.delete(`/post/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setCommentChanged((prevState) => {
          return setCommentChanged(!prevState);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const profileShowHandler = (event) => {
    event.preventDefault();
    const userId = event.target.userId.value;
    router.push(`/homepage/profile/${userId}`);
  };

  // const currentTime = new Date().toLocaleTimeString();
  // const postUploadTime = new Date(updatedAt).toLocaleTimeString();

  return (
    <>
      <FullPost
        post={posts[postIndex]}
        open={logOutModalOpen}
        commentDeleteHandler={commentDeleteHandler}
        commentChanged={commentChangedHandler}
        close={handleClose}
      />
      {posts.map((post, i) => {
        return (
          <>
            <Card
              sx={{
                maxWidth: 550,
                width: 550,
                mt: 8,
                borderRadius: 2,
                border: 1,
                borderColor: "#E0E0E0",
                p: 0,
                boxShadow:
                  "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardHeader
                avatar={
                  <Box
                    component="form"
                    noValidate
                    onSubmit={profileShowHandler}
                  >
                    <IconButton type="submit">
                      <Avatar
                        src={`data:image/jpeg;base64,${post?.userDetail?.thumbnail_profile_picture}`}
                        sx={{
                          border: 1,
                          borderColor: "#E0E0E0",
                          height: 45,
                          width: 45,
                        }}
                      />
                    </IconButton>
                    <input
                      name="userId"
                      value={post?.post?.user_id}
                      type="hidden"
                    />
                  </Box>
                }
                subheader={
                  <Typography variant="h5">
                    {post?.userDetail?.user_name}
                  </Typography>
                }
              />
              <CardMedia
                component="img"
                height="350"
                image={`data:image/jpeg;base64,${post?.post?.picture}`}
              />
              <CardActions disableSpacing>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setPostIndex(i);
                  }}
                >
                  <Like
                    userLiked={Boolean(post.isUserLikedPost)}
                    postId={post?.post?.id}
                    onLike={likeHandler}
                  />
                </div>
                <Typography variant="h6">{post?.likes} likes</Typography>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={() => {
                    setLogoutModalOpen(true);
                    setPostIndex(i);
                  }}
                >
                  <ChatBubbleOutlineIcon />
                  <Typography sx={{ ml: 1 }}>
                    View all {post?.comments?.length} comments
                  </Typography>
                </IconButton>
              </CardActions>
              <CardContent>
                <Typography variant="h6">
                  <strong>{post?.userDetail?.user_name} </strong>
                  {post?.post?.caption}
                </Typography>
                <Typography>
                  <br />
                  28 MINUTES AGO
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={commentSubmitHandler}
                  sx={{ width: "100%", mt: 1 }}
                >
                  <FormControl fullWidth variant="filled">
                    <InputLabel>Comment</InputLabel>
                    <FilledInput
                      value={enteredComment}
                      error={enteredCommentHasError}
                      hiddenLabel={
                        !enteredCommentHasError
                          ? "Comment should be less than 500 characters"
                          : ""
                      }
                      onChange={commentChangeHandler}
                      onBlur={commentBlurHandler}
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
