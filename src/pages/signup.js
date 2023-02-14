import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
import qs from "qs";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authReducer";
import useUser from "../hooks/useUser";
import Copyright from "../components/ui/Copyright";

const isValidName = /^[a-zA-Z ]{1,20}$/;

const isValidEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isValidPassword = /^.{8,16}$/;

export default function SignUpPage() {
  useUser();
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

      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/auth/register",
        data: qs.stringify({
          full_name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.data.error) {
        setHasServerError(true);
        setServerErrorMessage(response.data.error);
        return;
      }
      if (response.data.success) {
        dispatch(authActions.setToken(response.data.token));
        localStorage.setItem("token", Json.stringify(response.data.token));
        Router.push("/profile");
      }

      setHasServerError(false);
      enteredNameReset();
      enteredEmailReset();
      enteredPasswordReset();
    } catch (error) {
      setHasServerError(true);
      if (error?.response?.data?.error) {
        setServerErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LoginIcon
          fontSize="large"
          className="Icon"
          sx={{ color: "white", bgcolor: "#060606", m: 1 }}
        />

        <Typography component="h1" variant="h5" color="#060606">
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
            {hasServerError && (
              <Typography variant="subtitle1" style={{ color: "#b40e0e" }}>
                {serverErrorMessage}
              </Typography>
            )}
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
              <Link href="/" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
