import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import dayjs from "dayjs";
import Calender from "../components/ui/Inputs/Calender";
import Copyright from "../components/ui/Copyright";
import SelectGender from "../components/ui/Inputs/SelectGender";
import ImageUploader from "../components/ui/Inputs/ImageUploader";
import {
  useCreateProfileMutation,
  useLazyGetProfileQuery,
} from "../utils/userApi";

const isValidName = /^[a-zA-Z]{1,20}$/;
const isValidUserName = /^[a-zA-Z0-9]{1,20}$/;
const isValidBio = /^.{0,500}$/;

export default function profileSetupPage() {
  const token = useSelector((state) => state.auth.token);
  const [enteredGender, setEnteredGender] = useState("");
  const [genderIsValid, setGenderIsValid] = useState(false);
  const [enteredDate, setDateValue] = useState(
    dayjs("2010-01-01T00:00:00.000")
  );
  const [enteredProfilePicture, setEnteredProfilePicture] = useState("");
  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [createProfile] = useCreateProfileMutation();
  const [getProfile] = useLazyGetProfileQuery();

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

      const { data: profileCreateResponse } = await createProfile({
        token: token,
        firstName: enteredFirstName,
        lastName: enteredLastName,
        userName: enteredUserName,
        bio: enteredBio,
        gender: enteredGender,
        profilePicture: enteredProfilePicture,
        dob: enteredDate.toISOString(),
      });

      if (profileCreateResponse.success) {
        const { data: profileResponse } = await getProfile(token);
        if (profileResponse.success) {
          Router.push("/homepage");
          return;
        }
      }

      if (!profileCreateResponse.success) {
        setHasServerError(true);
        setServerErrorMessage(profileCreateResponse.error);
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
          marginTop: 3,
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
            Create Profile
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
              <Alert variant="filled" severity="warning" sx={{ mt: 1 }}>
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
