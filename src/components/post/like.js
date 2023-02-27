import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import client from "../../utils/api";

const Like = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [liked, setLiked] = useState(props?.userLiked);

  const likeHandler = (postId) => {
    if (!liked) {
      client
        .post(
          `/post/like/${postId}`,
          {},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setLiked(true);
            props.onLike(liked);
          }
        })
        .catch(console.log);
    }

    if (liked) {
      client
        .delete(`/post/like/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setLiked(false);
            props.onLike(liked);
          }
        })
        .catch(console.log);
    }
  };

  return (
    <>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          likeHandler(props?.postId);
        }}
      >
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </>
  );
};

export default Like;
