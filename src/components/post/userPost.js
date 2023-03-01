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
import { Modal, Box, Divider, Avatar, Button, Typography } from "@mui/material";
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
  border: "1px solid #E2E2E2",
  boxShadow:
    "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
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
      if (response.data.success) Router.reload();
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
              borderColor: "#E2E2E2",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={`data:image/jpeg;base64,${props?.post?.userDetail?.thumbnail_profile_picture}`}
                  sx={{ border: 1, borderColor: "#E2E2E2" }}
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
                        <Typography>Edit</Typography>
                      </Button>
                      <Divider />
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          postDeleteHandler(props.post?.post?.id);
                        }}
                      >
                        <Typography> Delete</Typography>
                      </Button>
                    </Box>
                  </Popover>
                </>
              }
              title={
                <Typography variant="h5">
                  {props?.post?.userDetail?.user_name}
                </Typography>
              }
              sx={{ borderBottom: 1, borderColor: "#E2E2E2" }}
            ></CardHeader>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <List sx={{ height: 400, maxHeight: 400, overflow: "auto" }}>
                {props?.post?.comments.map((comment, i) => {
                  return (
                    <>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            src={`data:image/jpeg;base64,${props?.post?.commenterDetails[i]?.thumbnail_profile_picture}`}
                            sx={{ border: 1, borderColor: "#E2E2E2" }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h6">
                              {props?.post?.commenterDetails[i]?.user_name}
                            </Typography>
                          }
                          secondary={
                            <Typography>{comment?.comment}</Typography>
                          }
                        ></ListItemText>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
              </List>
              <Typography style={{ marginLeft: 18 }}>28 MINUTES AGO</Typography>
            </Box>
          </Box>
          <Box width={500} height={500} sx={{ maxHeight: 500, maxWidth: 500 }}>
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
