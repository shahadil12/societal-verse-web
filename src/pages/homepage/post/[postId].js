import SideBar from "../../../components/ui/SideBar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

// import { fileTypeFromBuffer } from "file-type";
import {
  Grid,
  Box,
  TextField,
  Avatar,
  Button,
  Divider,
  Modal,
} from "@mui/material";
import ImageUploading from "react-images-uploading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Alert from "@mui/material/Alert";
import { client } from "../../../utils/api";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  useLazyGetUserPostQuery,
  useUpdatePostMutation,
} from "../../../utils/postApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #E2E2E2",
  boxShadow:
    "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
};

const maxNumber = 1;
const isValidCaption = /^.{1,500}$/;

const EditPost = () => {
  const router = useRouter();
  const postId = router.query.postId;
  const token = useSelector((state) => state.auth.token);
  if (!token) router.push("/");
  const profile = useSelector((state) => state.user.profile);
  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [image, setImage] = useState([]);
  const [picture, setPicture] = useState("");
  const [postUploadedModalOpen, setPostUploadedModalOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [getUserPost] = useLazyGetUserPostQuery();
  const [updatePost] = useUpdatePostMutation();
  const captionChangeHandler = (event) => {
    setCaption(event.target.value);
  };

  useEffect(() => {
    const post = async () => {
      try {
        const { data: userPostResponse } = await getUserPost({ token, postId });
        if (userPostResponse.success) {
          setImage([
            {
              data_url: `data:/image/jpeg;base64,${userPostResponse.post.picture}`,
            },
          ]);
          setPicture(userPostResponse.post.picture);
          setCaption(userPostResponse.post.caption);
        }
      } catch (error) {
        console.log(error);
      }
    };
    post();
  }, []);

  const imageUploadHandler = (imageList) => {
    setImage(imageList);
    if (imageList.length > 0) {
      setPicture(imageList[0].data_url.split(",")[1]);
    }
  };

  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      // const { data: response } = await updatePost({
      //   token,
      //   caption,
      //   picture,
      // });
      const response = await client.put(
        `post/${postId}`,
        {
          caption: caption,
          picture: picture,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.error) {
        setHasServerError(true);
        setServerErrorMessage(response.data.error);
      }
      if (response.data.success) {
        setPostUploadedModalOpen(true);
        router.push("/homepage/profile");
      }

      setCaption("");
    } catch (error) {
      setHasServerError(true);
      console.log(error);
      if (!error?.response) {
        setServerErrorMessage("Can't connect to server");
      }
      if (error?.response?.data?.error) {
        setServerErrorMessage(error.response.data.error);
      }
    }
  };

  const modal = (
    <Modal open={postUploadedModalOpen}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 70 }} />
          <Typography variant="h4" sx={{ ml: 4 }}>
            Post Updated Successfully.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );

  return (
    <Grid container>
      {modal}
      <Grid item sx={{ position: "fixed" }}>
        <SideBar />
      </Grid>
      <Grid item>
        <ImageUploading
          multiple={false}
          value={image}
          onChange={imageUploadHandler}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpeg"]}
        >
          {({ imageList, onImageUpdate, errors }) => (
            <>
              <Box component="form" noValidate onSubmit={formSubmitHandler}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 10,
                    marginLeft: isMobile ? 10 : 55,
                    borderRadius: 4,
                    border: 1,
                    borderColor: "#E2E2E2",
                    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(2px)",
                      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      m: 1,
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          src={`data:image/jpeg;base64,${profile.profile_picture}`}
                          sx={{ border: 1, borderColor: "#E2E2E2" }}
                        ></Avatar>
                      }
                      title={<h4>{profile.user_name}</h4>}
                      sx={{ borderBottom: 1, borderColor: "#E2E2E2" }}
                    ></CardHeader>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Button variant="contained" onClick={onImageUpdate}>
                        <Typography>Update</Typography>
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        label="Caption"
                        multiline
                        rows={12}
                        onChange={captionChangeHandler}
                        value={caption}
                        sx={{ mb: 1 }}
                      />
                      {hasServerError && (
                        <Alert variant="filled" severity="warning">
                          <Typography>{serverErrorMessage}</Typography>
                        </Alert>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                      >
                        Upload
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    width={500}
                    height={500}
                    sx={{ m: 1, borderLeft: 1, borderColor: "#E2E2E2", pl: 3 }}
                  >
                    <CardMedia
                      component="img"
                      image={imageList[0]?.data_url}
                      sx={{
                        height: 450,
                        width: isMobile ? 300 : 450,
                        mb: 1,
                        mt: 3,
                      }}
                    />
                  </Box>
                </Card>
              </Box>
              {errors && (
                <div>
                  {errors.maxNumber && (
                    <Alert
                      key="maxNumberError"
                      variant="filled"
                      severity="warning"
                    >
                      Number of selected images exceed maxNumber
                    </Alert>
                  )}
                  {errors.acceptType && (
                    <Alert
                      key="fileTypeError"
                      variant="filled"
                      severity="warning"
                    >
                      Your selected file type is not allow
                    </Alert>
                  )}
                  {errors.maxFileSize && (
                    <Alert
                      key="maxfileSizeError"
                      variant="filled"
                      severity="warning"
                    >
                      Selected file size exceed maxFileSize
                    </Alert>
                  )}
                  {errors.resolution && (
                    <Alert
                      key="resolutionError"
                      variant="filled"
                      severity="warning"
                    >
                      Selected file is not match your desired resolution
                    </Alert>
                  )}
                </div>
              )}
            </>
          )}
        </ImageUploading>
      </Grid>
    </Grid>
  );
};

export default EditPost;
