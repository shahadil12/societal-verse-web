import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = (props) => {
  return (
    <Box>
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
    </Box>
  );
};

export default Copyright;
