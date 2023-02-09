import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PasswordIcon from "@mui/icons-material/Password";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="#060606" href="/">
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

export default function ForgetPassword(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get("pr"),
    };
    props.onForgetPassword(credentials);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            color: "#cebb76",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PasswordIcon
            fontSize="large"
            className="Icon"
            sx={{ color: "white", bgcolor: "#060606", m: 1 }}
          />

          <Typography component="h1" variant="h5" color="#060606">
            Password reset
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item s={12}>
                <TextField
                  autoComplete="given-name"
                  name="pr"
                  required
                  fullWidth
                  id="rp"
                  label="Email,Phone or Username"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send login link
            </Button>
            <Grid container justifyContent="centre">
              <Grid item>
                <Link href="/accounts/signup" variant="body2">
                  Create new account
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
