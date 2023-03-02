import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";
import client from "../utils/api";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authReducer";
import useUser from "../hooks/useUser";
import Copyright from "../components/ui/Copyright";
import { Avatar } from "@mui/material";

const isValidName = /^[a-zA-Z ]{1,20}$/;

const isValidEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isValidPassword = /^.{8,16}$/;

export default function SignUpPage() {
  const Router = useRouter();
  const dispatch = useDispatch();
  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState(false);

  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: enteredNameReset,
  } = useInput((value) => value.match(isValidName));

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

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubbmissionHandler = async (event) => {
    try {
      event.preventDefault();

      if (!formIsValid) return;

      const response = await client.post(
        "/auth/register",
        {
          full_name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      if (response.data.error) {
        setHasServerError(true);
        setServerErrorMessage(response.data.error);
        return;
      }
      if (response.data.success) {
        dispatch(authActions.setToken(response.data.token));
        Router.push("/profile");
      }

      setHasServerError(false);
      enteredNameReset();
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
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ mt: 2 }}>
          <LoginIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" sx={{ mt: 1 }}>
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formSubbmissionHandler}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                autoComplete="given-name"
                name="fullname"
                label="Full Name"
                value={enteredName}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                error={enteredNameHasError}
                helperText={
                  enteredNameHasError
                    ? "Full name should be less than 20 characters"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                error={enteredEmailHasError}
                helperText={
                  enteredEmailHasError ? "Please enter valid email" : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
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
                  {serverErrorMessage}
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body1">
                <Typography>Already have an account? Log in</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
