import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import { Modal, Box, Divider, Avatar, Button } from "@mui/material";
import { useState } from "react";
import client from "../../utils/api";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

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

const UserPost = (props) => {
  const Router = useRouter();
  const postId = Router.query.postId;
  const token = useSelector((state) => state.auth.token);
  const [anchorEL, setAnchorEl] = useState(null);
  const popOverOpenHandler = (event) => setAnchorEl(event.currentTarget);
  const popOverCloseHandler = () => setAnchorEl(null);
  const open = Boolean(anchorEL);

  const postEditHandler = async (postId) => {
    Router.push(`/homepage/post/${postId}`);
  };

  const postDeleteHandler = async (postId) => {
    try {
      const response = await client.delete(`/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) Router.push("/homepage/profile");
    } catch (error) {
      console.log(error);
    }
  };
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
              action={
                <>
                  <IconButton onClick={popOverOpenHandler}>
                    <MoreVertIcon />
                  </IconButton>
                  <Popover
                    open={open}
                    anchorEl={anchorEL}
                    onClose={popOverCloseHandler}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    anchorPosition={{
                      top: 50,
                      left: 100,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          postEditHandler(props?.post?.post?.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Divider />
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          postDeleteHandler(props.post?.post?.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Popover>
                </>
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
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
              </List>
              <h6 style={{ marginLeft: 18 }}>28 MINUTES AGO</h6>
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

export default UserPost;
