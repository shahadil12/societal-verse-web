import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import qs from "qs";
import { useState } from "react";
import useInput from "../hooks/useInput";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="#060606" href="#">
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

const isValidEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isValidPassword = /^.{8,16}$/;

export default function loginPage() {
  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState(false);

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

      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/auth/login",
        data: qs.stringify({ email: enteredEmail, password: enteredPassword }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.data.error) {
        setServerError(true);
        setServerErrorMessage(response.data.error);
        return;
      }

      setServerError(false);
      enteredEmailReset();
      enteredPasswordReset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url("../../Picsart_22-11-14_16-17-25-225.png" )`,
            backgroundRepeat: "no-repeat",
            backgroundColor: "black",
            backgroundSize: "460px 350px",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{ bgcolor: "#cebb76" }}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LockOutlinedIcon
              className="Icon"
              sx={{ color: "white", bgcolor: "#060606", m: 1 }}
            />
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formSubmissionHandler}
              sx={{ mt: 1 }}
            >
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
                  enteredEmailHasError
                    ? "Password must be between 8 to 16 characters"
                    : ""
                }
              />
              {serverError && (
                <Typography variant="subtitle1" style={{ color: "#b40e0e" }}>
                  {serverErrorMessage}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!formIsValid}
                sx={{ mt: 3, mb: 2, color: "white" }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
