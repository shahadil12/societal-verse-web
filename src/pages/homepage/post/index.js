import SideBar from "../../../components/ui/SideBar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Grid,
  Box,
  TextField,
  Avatar,
  Button,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import ImageUploading from "react-images-uploading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Alert from "@mui/material/Alert";
import useUser from "../../../hooks/useUser";
import useInput from "../../../hooks/useInput";
import client from "../../../utils/api";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";

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
  p: 2,
};

const maxNumber = 1;
const isValidCaption = /^.{1,500}$/;

const CreatePost = (props) => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  if (!token) router.push("/");
  const profile = useSelector((state) => state.user.profile);
  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [image, setImage] = useState([]);
  const [picture, setPicture] = useState("");
  const [postUploadedModalOpen, setPostUploadedModalOpen] = useState(false);

  const imageUploadHandler = (imageList) => {
    setImage(imageList);
    if (imageList.length > 0) {
      setPicture(imageList[0].data_url.split(",")[1]);
    }
  };

  const {
    value: enteredCaption,
    valueIsValid: enteredCaptionIsValid,
    hasError: enteredCaptionHasError,
    valueChangeHandler: captionChangeHandler,
    valueBlurHandler: captionBlurHandler,
    reset: enteredCaptionReset,
  } = useInput((value) => value.match(isValidCaption));

  let formIsValid = false;
  if (enteredCaptionIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const response = await client.post(
        "/post",
        {
          caption: enteredCaption,
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

      enteredCaptionReset();
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
          <Typography variant="h4" sx={{ ml: 4 }}>
            Post Uploaded Successfully.
          </Typography>
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
          acceptType={["jpeg"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemoveAll,
            errors,
          }) => (
            <>
              {!(image.length > 0) && (
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 16,
                    marginLeft: 32,
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
                  <CardHeader
                    title={
                      <Typography sx={{ ml: 16 }} variant="h4">
                        Create New Post
                      </Typography>
                    }
                  ></CardHeader>
                  <Divider />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        height: "300px",
                        width: "450px",
                      }}
                    >
                      <CloudUploadIcon
                        sx={{
                          height: "100px",
                          width: "100px",
                          mb: 1,
                        }}
                      />
                      <Button variant="contained" onClick={onImageUpload}>
                        <Typography>
                          Click Here To Upload Picture from Your Device
                        </Typography>
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              )}
              {imageList.length > 0 && (
                <Box component="form" noValidate onSubmit={formSubmitHandler}>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      marginTop: 9,
                      marginLeft: 17,
                      borderRadius: 5,
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
                        title={profile.user_name}
                        sx={{ borderBottom: 2, borderColor: "#E2E2E2" }}
                      ></CardHeader>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Button variant="contained" onClick={onImageUpdate}>
                          <Typography>Upload</Typography>
                        </Button>
                        <Button variant="contained" onClick={onImageRemoveAll}>
                          <Typography>Delete</Typography>
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
                          value={enteredCaption}
                          error={enteredCaptionHasError}
                          onChange={captionChangeHandler}
                          onBlur={captionBlurHandler}
                          helperText={
                            enteredCaptionHasError
                              ? "Caption should be less then 500 characters"
                              : ""
                          }
                          sx={{ mb: 0.5 }}
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
                          disabled={!formIsValid}
                          sx={{ mt: 2 }}
                        >
                          <Typography>Upload</Typography>
                        </Button>
                      </Box>
                    </Box>
                    <Box
                      width={500}
                      height={500}
                      sx={{
                        m: 1,
                        borderLeft: 1,
                        borderColor: "#E2E2E2",
                        pl: 3,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={imageList[0]["data_url"]}
                        sx={{
                          height: 450,
                          width: 450,
                          mb: 1,
                          mt: 3,
                          border: 1,
                          borderRadius: 3,
                          borderColor: "#E2E2E2",
                        }}
                      />
                    </Box>
                  </Card>
                </Box>
              )}
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

export default CreatePost;
