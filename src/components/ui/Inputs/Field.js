import TextField from "@mui/material/TextField";
import { useState } from "react";

const Field = (props) => {
  const [value, setValue] = useState("");
  const [valueTouched, setValueTouched] = useState(false);
  const [valueIsValid, setValueIsValid] = useState(false);

  const valid = props.validateValue(value);
  const enteredValueHasError = !valid && valueTouched;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
    props.reset(reset);
    if (valid) {
      setValueIsValid(true);
      props.isValid(valueIsValid);
    } else {
      setValueIsValid(false);
      props.isValid(valueIsValid);
    }
  };

  const valueBlurHandler = () => {
    setValueTouched(true);
    if (props.validateValue(value)) {
      setValueIsValid(true);
      props.isValid(valueIsValid);
    } else {
      setValueIsValid(false);
      props.isValid(valueIsValid);
    }
  };

  const reset = () => {
    setValue("");
    setValueTouched(false);
  };

  return (
    <TextField
      type={props.type}
      required
      fullWidth
      autoComplete={props.type}
      margin="normal"
      label={props.type}
      name={props.type}
      onChange={valueChangeHandler}
      onBlur={valueBlurHandler}
      value={value}
      error={enteredValueHasError}
      helperText={enteredValueHasError ? `${props.invalidMessage}` : ""}
    />
  );
};

export default Field;
