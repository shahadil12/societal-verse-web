import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Grid,
  Container,
  Typography,
  Avatar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useLazyGetLoginQuery } from "../utils/authApi";
import { useLazyGetProfileQuery } from "../utils/userApi";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { authActions } from "../store/authReducer";
import { userActions } from "../store/userReducer";
import Copyright from "../components/ui/Copyright";

const isValidEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isValidPassword = /^.{8,16}$/;

export default function loginPage() {
  const Router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: enteredEmailReset,
  } = useInput((value) => value.match(isValidEmail));

  const {
    value: enteredPassword,
    valueIsValid: enteredPasswordIsValid,
    hasError: enteredPasswordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: enteredPasswordReset,
  } = useInput((value) => value.match(isValidPassword));
  const [getProfile] = useLazyGetProfileQuery();
  const [getLogin] = useLazyGetLoginQuery();
  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) formIsValid = true;

  const formSubmissionHandler = async (event) => {
    try {
      event.preventDefault();
      if (!formIsValid) return;

      const { data: loginResponse } = await getLogin({
        email: enteredEmail,
        password: enteredPassword,
      });

      if (loginResponse.error) {
        setHasServerError(true);
        setServerErrorMessage(loginResponse.data.error);
        return;
      }
      if (loginResponse.success) {
        dispatch(authActions.setToken(loginResponse.token));
        const { data: profileResponse } = await getProfile(loginResponse.token);

        if (profileResponse.success) {
          setHasProfile(true);
          dispatch(userActions.setProfile(profileResponse));
          Router.push("/homepage");
          return;
        }
      }

      // setHasServerError(false);
      enteredEmailReset();
      enteredPasswordReset();
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

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        borderRadius: 6,
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
          marginTop: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ mt: 2 }}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography variant="h3" sx={{ mt: 1 }}>
          Log in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formSubmissionHandler}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                autoComplete="email"
                margin="normal"
                label="Email"
                name="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                error={enteredEmailHasError}
                helperText={enteredEmailHasError ? "Invalid Email" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
                error={enteredPasswordHasError}
                helperText={
                  enteredPasswordHasError
                    ? "Password must be between 8 to 16 characters"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              {hasServerError && (
                <Alert variant="filled" severity="warning">
                  <Typography>{serverErrorMessage}</Typography>
                </Alert>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            disabled={!formIsValid}
            sx={{ mt: 3, mb: 2 }}
          >
            <Typography variant="h6">Sign Up</Typography>
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                <Typography variant="h5">
                  Don't hava an account? Sign up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
