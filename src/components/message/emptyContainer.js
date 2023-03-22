import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

const EmptyContainer = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "550px",
        width: isMobile ? 275 : 700,
        ml: isMobile ? 10 : 0,
      }}
    >
      <MapsUgcIcon
        sx={{
          height: "100px",
          width: "100px",
          mb: 1,
        }}
      />
      <Typography variant={isMobile ? "h5" : "h3"}>
        Send private messages to a friend.
      </Typography>
    </Box>
  );
};

export default EmptyContainer;
