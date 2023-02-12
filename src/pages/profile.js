import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageUploading from "react-images-uploading";
import dayjs from "dayjs";
import useInput from "../hooks/useInput";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Router from "next/router";
import { userActions } from "../store/userReducer";
import { authActions } from "../store/authReducer";
import useUser from "../hooks/useUser";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Societal Verse
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#060606",
    },
  },
});

const maxNumber = 1;
const isValidName = /^[a-zA-Z]{1,20}$/;
const isValidUserName = /^[a-zA-Z0-9]{1,20}$/;
const isValidBio = /^.{0,500}$/;
const isValidAge = dayjs("2010-01-01T00:00:00.000");

export default function profileSetupPage() {
  useUser({
    redirectToIfFound: "/homepage",
    redirectToIfNotFound: "/",
    shouldRedirectIfNotFound: true,
    shouldRedirectIfFound: true,
  });
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [gender, setGender] = useState("");
  const [enteredProfilePicture, setEnteredProfilePicture] = useState("");
  const [dateValue, setDateValue] = useState(dayjs(isValidAge));
  const [genderIsValid, setGenderIsValid] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const {
    value: enteredFirstName,
    valueIsValid: enteredFirstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useInput((value) => value.match(isValidName));

  const {
    value: enteredLastName,
    valueIsValid: enteredLastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput((value) => value.match(isValidName));

  const {
    value: enteredUserName,
    valueIsValid: enteredUserNameIsValid,
    hasError: userNameHasError,
    valueChangeHandler: userNameChangeHandler,
    valueBlurHandler: userNameBlurHandler,
    reset: userNameReset,
  } = useInput((value) => value.match(isValidUserName));

  const {
    value: enteredBio,
    hasError: bioHasError,
    valueChangeHandler: bioChangeHandler,
    valueBlurHandler: bioBlurHandler,
    reset: bioReset,
  } = useInput((value) => value.match(isValidBio));

  const dataChangeHandler = (newDateValue) => {
    setDateValue(newDateValue);
  };

  const genderChangeHandler = (event) => {
    setGenderIsValid(true);
    setGender(event.target.value);
  };

  const imageUploadHandler = (imageList) => {
    setImage(imageList);
    if (imageList.length > 0) {
      setEnteredProfilePicture(imageList[0].data_url.split(",")[1]);
    }
  };

  let formIsValid = false;

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredUserNameIsValid &&
    genderIsValid
  ) {
    formIsValid = true;
  }
  const formSubbmissionHandler = async (event) => {
    try {
      event.preventDefault();

      if (!formIsValid) return;

      const profileCreationResponse = await axios({
        method: "post",
        url: "http://localhost:5000/api/profile",
        data: {
          first_name: enteredFirstName,
          last_name: enteredLastName,
          user_name: enteredUserName,
          bio: enteredBio,
          gender,
          profile_picture: enteredProfilePicture,
          dob: dateValue.toISOString(),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        maxBodyLength: 6000000,
        maxContentLength: 6000000,
      });

      console.log(profileCreationResponse.data);
      if (profileCreationResponse.data.error) {
        setHasServerError(true);
        setServerErrorMessage(profileCreationResponse.data.error);
      }

      const profileResponse = await axios({
        method: "get",
        url: "http://localhost:5000/api/profile",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });

      if (profileResponse.data.success) {
        dispatch(userActions.setProfile(profileResponse.data));
      }

      if (profileCreationResponse.data.success) {
        Router.push("/homepage");
      }

      firstNameReset(),
        lastNameReset(),
        userNameReset(),
        bioReset(),
        setDateValue(dayjs("2010-01-01T00:00:00.000")),
        setGender("");
    } catch (error) {
      setHasServerError(true);
      setServerErrorMessage(error.response.data.error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar>
            <AccountCircleIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Typography component="h1" variant="h3">
            Create Profile
          </Typography>
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack>
                    <DesktopDatePicker
                      label="Date of Birth"
                      inputFormat="MM/DD/YYYY"
                      value={dateValue}
                      onChange={dataChangeHandler}
                      maxDate={isValidAge}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel>Gender *</FormLabel>
                  <RadioGroup row onChange={genderChangeHandler}>
                    <FormControlLabel
                      value="FEMALE"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="MALE"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="OTHER"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <ImageUploading
                  multiple={false}
                  value={image}
                  onChange={imageUploadHandler}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                  acceptType={["jpg", "png", "jpeg"]}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemoveAll,
                    isDragging,
                    errors,
                    dragProps,
                  }) => (
                    <>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={isDragging ? { color: "#cebb76" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        {isDragging ? "Drop here please" : "Click or Drop Here"}
                      </Button>
                      {imageList.map((image, index) => (
                        <>
                          <img
                            key={index}
                            src={image["data_url"]}
                            width="150"
                            height="150"
                            className="profile"
                          />
                          <Button
                            variant="contained"
                            onClick={onImageUpdate}
                            sx={{ mr: 2 }}
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            onClick={onImageRemoveAll}
                          >
                            Delete
                          </Button>
                        </>
                      ))}
                      {errors && (
                        <>
                          {errors.maxNumber && (
                            <Alert variant="filled" severity="warning">
                              Number of selected images exceed maxNumber
                            </Alert>
                          )}
                          {errors.acceptType && (
                            <Alert variant="filled" severity="warning">
                              Your selected file type is not allow
                            </Alert>
                          )}
                          {errors.maxFileSize && (
                            <Alert variant="filled" severity="warning">
                              Selected file size exceed maxFileSize
                            </Alert>
                          )}
                          {errors.resolution && (
                            <Alert variant="filled" severity="warning">
                              Selected file is not match your desired resolution
                            </Alert>
                          )}
                        </>
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
                <Typography variant="subtitle1" style={{ color: "#b40e0e" }}>
                  {serverErrorMessage}
                </Typography>
              )}
            </Grid>
            <Button
              type="submit"
              disabled={!formIsValid}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Set Up Profile
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account with profile? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
