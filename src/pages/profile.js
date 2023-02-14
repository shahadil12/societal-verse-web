import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Router from "next/router";
import dayjs from "dayjs";
import { userActions } from "../store/userReducer";
import useUser from "../hooks/useUser";
import Calender from "../components/ui/Inputs/Calender";
import Copyright from "../components/ui/Copyright";
import SelectGender from "../components/ui/Inputs/SelectGender";
import ImageUploader from "../components/ui/Inputs/ImageUploader";

const isValidName = /^[a-zA-Z]{1,20}$/;
const isValidUserName = /^[a-zA-Z0-9]{1,20}$/;
const isValidBio = /^.{0,500}$/;

export default function profileSetupPage() {
  useUser();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [enteredGender, setEnteredGender] = useState("");
  const [genderIsValid, setGenderIsValid] = useState(false);
  const [enteredDate, setDateValue] = useState(
    dayjs("2010-01-01T00:00:00.000")
  );
  const [enteredProfilePicture, setEnteredProfilePicture] = useState("");
  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const genderValue = (gender) => setEnteredGender(gender);
  const genderValid = (genderIsValid) => setGenderIsValid(genderIsValid);
  const dateValue = (date) => setGenderIsValid(date);
  const profilePictureValue = (profilePicture) =>
    setEnteredProfilePicture(profilePicture);

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

  console.log(
    enteredFirstName,
    enteredLastName,
    enteredUserName,
    enteredBio,
    enteredGender,
    enteredDate.toISOString(),
    enteredProfilePicture
  );

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
          gender: enteredGender,
          profile_picture: enteredProfilePicture,
          dob: enteredDate.toISOString(),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        maxBodyLength: 6000000,
        maxContentLength: 6000000,
      });

      if (profileCreationResponse.data.error) {
        setHasServerError(true);
        setServerErrorMessage(profileCreationResponse.data.error);
      }

      if (profileCreationResponse.data.success) {
        const profileResponse = await axios({
          method: "get",
          url: "http://localhost:5000/api/profile",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        });

        if (profileResponse.data.error) {
          setHasServerError(true);
          setServerErrorMessage(profileResponse.data.error);
        }

        if (profileResponse.data.success) {
          dispatch(userActions.setProfile(profileResponse.data));
          Router.push("/homepage");
        }
      }

      firstNameReset();
      lastNameReset();
      userNameReset();
      bioReset();
      setDateValue(dayjs("2010-01-01T00:00:00.000"));
      setGenderIsValid(false);
      setEnteredGender("");
    } catch (error) {
      setHasServerError(true);
      if (error?.response?.data?.error) {
        setServerErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "centre",
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
              <Calender value={dateValue} />
            </Grid>
            <Grid item xs={12}>
              <SelectGender isValid={genderValid} value={genderValue} />
            </Grid>
            <Grid item sm={12}>
              <ImageUploader value={profilePictureValue} />
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
  );
}
