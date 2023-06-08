import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../../hooks/useInput";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { userActions } from "../../../store/userReducer";
import Calender from "../../../components/ui/Inputs/Calender";
import Copyright from "../../../components/ui/Copyright";
import SelectGender from "../../../components/ui/Inputs/SelectGender";
import ImageUploading from "react-images-uploading";
import { client } from "../../../utils/api";
import useSWR from "swr";

const maxNumber = 1;

const isValidName = /^[a-zA-Z]{1,20}$/;
const isValidUserName = /^[a-zA-Z0-9]{1,20}$/;
const isValidBio = /^.{0,500}$/;

export default function profileSetupPage() {
  const Router = useRouter();
  const token = useSelector((state) => state.auth.token);
  if (!token) Router.push("/");
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const [enteredGender, setEnteredGender] = useState("");
  const [enteredProfilePicture, setEnteredProfilePicture] = useState("");
  const [image, setImage] = useState([]);
  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [enteredDate, setDateValue] = useState(dayjs());
  const genderValue = (gender) => setEnteredGender(gender);
  const dateValue = (date) => setDateValue(date);
  const imageUploadHandler = (imageList) => {
    setImage(imageList);
    if (imageList.length > 0) {
      setEnteredProfilePicture(imageList[0].data_url.split(",")[1]);
    }
  };

  const {
    value: enteredFirstName,
    hasError: firstNameHasError,
    setValue: setEnteredFirstName,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.match(isValidName));

  const {
    value: enteredLastName,
    hasError: lastNameHasError,
    setValue: setEnteredLastName,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
  } = useInput((value) => value.match(isValidName));

  const {
    value: enteredUserName,
    hasError: userNameHasError,
    setValue: setEnteredUserName,
    valueChangeHandler: userNameChangeHandler,
    valueBlurHandler: userNameBlurHandler,
  } = useInput((value) => value.match(isValidUserName));

  const {
    value: enteredBio,
    setValue: setEnteredBio,
    hasError: bioHasError,
    valueChangeHandler: bioChangeHandler,
    valueBlurHandler: bioBlurHandler,
  } = useInput((value) => value.match(isValidBio));

  useEffect(() => {
    setImage([
      { data_url: `data:image/jpeg;base64,${profile.profile_picture}` },
    ]);
    setDateValue(dayjs(`${profile.dob}T00:00:00.841Z`));
    setEnteredGender(profile.gender);
    setEnteredProfilePicture(profile.profile_picture);
    setEnteredFirstName(profile.first_name);
    setEnteredLastName(profile.last_name);
    setEnteredUserName(profile.user_name);
    setEnteredBio(profile.bio);
  }, []);

  const formSubbmissionHandler = async (event) => {
    try {
      event.preventDefault();

      const profileUpdationResponse = await client.put(
        "/profile",
        {
          first_name: enteredFirstName,
          last_name: enteredLastName,
          user_name: enteredUserName,
          bio: enteredBio,
          gender: enteredGender,
          profile_picture: enteredProfilePicture,
          dob: enteredDate.toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          maxBodyLength: 6000000,
          maxContentLength: 6000000,
        }
      );

      console.log(profileUpdationResponse);
      if (profileUpdationResponse.data.error) {
        setHasServerError(true);
        setServerErrorMessage(profileUpdationResponse.data.error);
      }

      if (profileUpdationResponse.data.success) {
        Router.push("/homepage/profile");
      }
    } catch (error) {
      setHasServerError(true);
      console.log(error);
      if (error?.response?.data?.error) {
        setServerErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        borderRadius: 7,
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(2px)",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
        },
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "centre",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Avatar>
            <AccountCircleIcon sx={{ fontSize: 60 }} />
          </Avatar>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h3" sx={{ mt: 2 }}>
            Edit Profile
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={formSubbmissionHandler}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                autoFocus
                autoComplete="first-name"
                name="firstName"
                label="First Name"
                value={enteredFirstName}
                onChange={firstNameChangeHandler}
                onBlur={firstNameBlurHandler}
                error={firstNameHasError}
                helperText={firstNameHasError ? "Enter valid first name" : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                autoComplete="last-name"
                label="Last Name"
                name="lastName"
                value={enteredLastName}
                onChange={lastNameChangeHandler}
                onBlur={lastNameBlurHandler}
                error={lastNameHasError}
                helperText={lastNameHasError ? "Enter valid last name " : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="UserName"
                name="userName"
                autoComplete="userName"
                value={enteredUserName}
                onChange={userNameChangeHandler}
                onBlur={userNameBlurHandler}
                error={userNameHasError}
                helperText={userNameHasError ? "Enter valid userName " : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <Calender value={dateValue} />
            </Grid>
            <Grid item xs={12}>
              <SelectGender value={genderValue} />
            </Grid>
            <Grid item sm={12}>
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
                    <Box>
                      <img
                        src={imageList[0]?.data_url}
                        width="150"
                        height="150"
                        style={{
                          borderRadius: "50%",
                          marginLeft: "15px",
                          marginBottom: "5px",
                          border: "0.5px solid",
                          borderColor: "#C2C2C2",
                        }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      onClick={onImageUpdate}
                      sx={{ mr: 2, ml: 6, mb: 2 }}
                    >
                      <Typography>Update</Typography>
                    </Button>
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                autoComplete="bio"
                rows={4}
                multiline
                value={enteredBio}
                onChange={bioChangeHandler}
                onBlur={bioBlurHandler}
                error={bioHasError}
                helperText={
                  bioHasError ? "Bio should be less 500 characters" : ""
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {hasServerError && (
              <Alert variant="filled" severity="warning">
                {serverErrorMessage}
              </Alert>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <Typography>Set Up Profile</Typography>
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
