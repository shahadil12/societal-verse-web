import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {
  SocialProvider,
  SocialLink,
} from "@mui-treasury/components/socialLink";
import { useMoonSocialLinkStyles } from "@mui-treasury/styles/socialLink/moon";
import { Box } from "@mui/system";

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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, p: 2 }}>
        <SocialProvider useStyles={useMoonSocialLinkStyles}>
          <SocialLink brand={"FacebookCircle"} href={""} />
          <SocialLink brand={"Twitter"} href={""} />
          <SocialLink brand={"Instagram"} href={""} />
          <SocialLink brand={"LinkedIn"} href={""} />
        </SocialProvider>
      </Box>
    </Box>
  );
};

export default Copyright;
