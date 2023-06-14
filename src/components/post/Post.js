import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { Avatar, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Like from "./like";
import dayjs from "dayjs";
import PostSkeleton from "./postSkeleton";
import { useGetPostQuery } from "../../utils/postApi";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "../../utils/commentApi";

const isValidComment = /^.{0,500}$/;

export default function Post() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  if (!token) router.push("/");

  const [postIndex, setPostIndex] = useState(0);
  const [logOutModalOpen, setLogoutModalOpen] = useState(false);
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const {
    data: postData,
    isLoading,
    refetch: postRefetch,
  } = useGetPostQuery(token);
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleClose = () => setLogoutModalOpen(false);

  const likeHandler = () => postRefetch();
  const commentChangedHandler = () => postRefetch();

  const {
    value: enteredComment,
    valueIsValid: enteredCommentIsValid,
    hasError: enteredCommentHasError,
    valueChangeHandler: commentChangeHandler,
    valueBlurHandler: commentBlurHandler,
    reset: enteredCommentReset,
  } = useInput((value) => value.match(isValidComment));

  let formIsValid = false;
  if (enteredCommentIsValid) formIsValid = true;

  const commentSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const commentResponse = await createComment({
        token: token,
        postId: event.target.postId.value,
        comment: enteredComment,
      });
      if (commentResponse.data.success) {
        postRefetch();
        enteredCommentReset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentDeleteHandler = async (commentId) => {
    try {
      const { data: deleteCommentResponse } = await deleteComment({
        token,
        commentId,
      });
      if (deleteCommentResponse.success) postRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  const profileShowHandler = (event) => {
    event.preventDefault();
    const userId = event.target.userId.value;
    router.push(`/homepage/profile/${userId}`);
  };

  const postUploadDate = dayjs(postData?.posts[postIndex]?.post?.updatedAt)
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ");

  if (isLoading) return <PostSkeleton />;
  return (
    <>
      <FullPost
        post={postData.posts[postIndex]}
        open={logOutModalOpen}
        commentDeleteHandler={commentDeleteHandler}
        postRefetch={postRefetch}
        close={handleClose}
      />
      {postData.posts.map((post, i) => {
        return (
          <>
            <Card
              sx={{
                maxWidth: 550,
                width: isMobile ? 365 : 550,
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
                  {`${postUploadDate} `}
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
