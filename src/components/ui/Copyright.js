import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = (props) => {
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
};

export default Copyright;
