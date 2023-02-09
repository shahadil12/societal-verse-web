import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import CakeIcon from "@mui/icons-material/Cake";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

const dates = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = [
  2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
  2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001,
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#060606",
    },
  },
});

export default function Addbirthday() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [year, setYear] = React.useState("");

  const yearHandleChange = (event) => {
    setYear(event.target.value);
  };

  const [month, setMonth] = React.useState("");

  const monthHandleChange = (event) => {
    setMonth(event.target.value);
  };

  const [date, setDate] = React.useState("");

  const dateHandleChange = (event) => {
    setDate(event.target.value);
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
            justifyContent: "centre",
          }}
        >
          <CakeIcon
            fontSize="large"
            className="Icon"
            sx={{ color: "white", bgcolor: "#060606", m: 1 }}
          />
          <Typography component="h1" variant="h5" color="#060606">
            Add Your BirthDay
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Month
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={month}
                  onChange={monthHandleChange}
                  autoWidth
                  label="Month"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {months.map((month, i) => {
                    return (
                      <MenuItem key={i} value={i + 1}>
                        {month}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Date
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={date}
                  onChange={dateHandleChange}
                  autoWidth
                  label="Date"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {dates.map((date, i) => (
                    <MenuItem key={i} value={i + 1}>
                      {date}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Year
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={year}
                  onChange={yearHandleChange}
                  autoWidth
                  label="Year"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {years.map((year, i) => {
                    return (
                      <MenuItem key={i} value={1 + i}>
                        {year}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
            <Grid container justifyContent="centre">
              <Grid item>
                <Link href="/accounts/signup" variant="body2">
                  Go Back
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
