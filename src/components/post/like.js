import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
} from "../../utils/likeApi";

const Like = (props) => {
  const [createLike] = useCreateLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const token = useSelector((state) => state.auth.token);
  const [liked, setLiked] = useState(props?.userLiked);

  const likeHandler = async (postId) => {
    try {
      if (!liked) {
        const { data: createLikeResponse } = await createLike({
          token,
          postId,
        });

        if (createLikeResponse.success) {
          setLiked(true);
          props.onLike();
        }
      }

      if (liked) {
        const { data: deleteLikeResponse } = await deleteLike({
          token,
          postId,
        });

        if (deleteLikeResponse.success) {
          setLiked(false);
          props.onLike();
        }
      }
    } catch (error) {
      console.log(error);
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
        {liked ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </>
  );
};

export default Like;
