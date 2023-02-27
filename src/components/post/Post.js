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
import { Avatar, Typography, Box } from "@mui/material";
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
        commentHandler={commentSubmitHandler}
        commentDeleteHandler={commentDeleteHandler}
        close={handleClose}
      />
      {posts.map((post, i) => {
        return (
          <>
            <Card sx={{ maxWidth: 500, ml: 14, mr: 8, mt: 7 }}>
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
                      />
                    </IconButton>
                    <input
                      name="userId"
                      value={post?.post?.user_id}
                      type="hidden"
                    />
                  </Box>
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
