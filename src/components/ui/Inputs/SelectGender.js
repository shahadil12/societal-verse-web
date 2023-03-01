import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const SelectGender = (props) => {
  const genderChangeHandler = (event) => {
    props.value(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>Gender *</FormLabel>
      <RadioGroup row onChange={genderChangeHandler} defaultValue={props.value}>
        <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
        <FormControlLabel value="MALE" control={<Radio />} label="Male" />
        <FormControlLabel value="OTHER" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
};

export default SelectGender;
