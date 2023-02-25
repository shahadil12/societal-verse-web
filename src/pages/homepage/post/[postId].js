import SideBar from "../../../components/ui/SideBar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
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
import client from "../../../utils/api";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const maxNumber = 1;
const isValidCaption = /^.{1,500}$/;

const EditPost = () => {
  const router = useRouter();
  const postId = router.query.postId;
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.user.profile);
  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [image, setImage] = useState([]);
  const [picture, setPicture] = useState("");
  const [postUploadedModalOpen, setPostUploadedModalOpen] = useState(false);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    const post = async () => {
      try {
        const response = await client.get(`/post/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          // const buffer = Buffer.from(response.data.post.picture, "base64");
          // const { mime } = await fileTypeFromBuffer(buffer);
          setImage([
            {
              data_url: `data:/image/jpeg;base64,${response.data.post.picture}`,
            },
          ]);
          setCaption(response.data.post.caption);
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
      if (!error.response) {
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
            p: 3,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 70 }} />
          <h3 style={{ marginLeft: 30 }}>Post Updated Successfully.</h3>
        </Box>
      </Box>
    </Modal>
  );

  return (
    <Grid container>
      {modal}
      <Grid item>
        <SideBar />
      </Grid>
      <Grid item>
        <ImageUploading
          multiple={false}
          value={image}
          onChange={imageUploadHandler}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg", "png", "jpeg"]}
        >
          {({ imageList, onImageUpdate, errors }) => (
            <>
              <Box component="form" noValidate onSubmit={formSubmitHandler}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 11,
                    marginLeft: 17,
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
                        ></Avatar>
                      }
                      title={<h4>{profile.user_name}</h4>}
                      sx={{ borderBottom: 1 }}
                    ></CardHeader>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Button variant="contained" onClick={onImageUpdate}>
                        Update
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
                        rows={10}
                        value={caption}
                        sx={{ mb: 0.5 }}
                      />
                      {hasServerError && (
                        <Alert variant="filled" severity="warning">
                          <h3>{serverErrorMessage}</h3>
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
                    sx={{ m: 1, borderLeft: 1, pl: 3 }}
                  >
                    <CardMedia
                      component="img"
                      image={imageList[0]?.data_url}
                      sx={{
                        height: 450,
                        width: 450,
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
