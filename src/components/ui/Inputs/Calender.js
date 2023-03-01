import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { useState } from "react";
const isValidAge = dayjs("2010-01-01T00:00:00.000");

const Calender = (props) => {
  const [dateValue, setDateValue] = useState(isValidAge);
  const dataChangeHandler = (newDateValue) => {
    setDateValue(dayjs(newDateValue));
    props.value(dayjs(newDateValue));
  };

  return (
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
  );
};

export default Calender;
