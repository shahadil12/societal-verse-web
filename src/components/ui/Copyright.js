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
    <>
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <SocialProvider useStyles={useMoonSocialLinkStyles}>
          <SocialLink
            brand={"FacebookCircle"}
            href={"https://www.facebook.com/siriwat.kunaporn/"}
          />
          <SocialLink
            brand={"Twitter"}
            href={"https://twitter.com/siriwatknp"}
          />
          <SocialLink brand={"Instagram"} href={""} />
          <SocialLink
            brand={"LinkedIn"}
            href={"https://www.linkedin.com/in/siriwat-kunaporn-1b4095158/"}
          />
        </SocialProvider>
      </Box>
    </>
  );
};

export default Copyright;
