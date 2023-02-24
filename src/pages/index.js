import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import client from "../utils/api";
import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import useUser from "../hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { authActions } from "../store/authReducer";
import { userActions } from "../store/userReducer";
import Copyright from "../components/ui/Copyright";
import { Avatar, Alert } from "@mui/material";

const isValidEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isValidPassword = /^.{8,16}$/;

export default function loginPage() {
  useUser({ redirectTo: "/homepage", redirectIfFound: true });
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

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) formIsValid = true;

  const formSubmissionHandler = async (event) => {
    try {
      event.preventDefault();

      if (!formIsValid) return;

      const loginResponse = await client.post(
        "/auth/login",
        {
          email: enteredEmail,
          password: enteredPassword,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (loginResponse.data.error) {
        setHasServerError(true);
        setServerErrorMessage(loginResponse.data.error);
        return;
      }
      if (loginResponse.data.success) {
        dispatch(authActions.setToken(loginResponse.data.token));
        const profileResponse = await client.get("/profile", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${loginResponse.data.token}`,
          },
        });
        console.log(profileResponse);
        if (profileResponse.data.success) {
          setHasProfile(true);
          dispatch(userActions.setProfile(profileResponse.data));
        }
        hasProfile ? Router.push("/homepage") : Router.push("/profile");
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
        <Avatar>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" sx={{ mt: 1 }}>
          <h4>Log in</h4>
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
                  <h3>{serverErrorMessage}</h3>
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
              <Link href="/" variant="body2">
                <h3>Don't hava an account? Sign up</h3>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
