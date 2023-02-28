import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const EmptyContainer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "550px",
        width: "700px",
      }}
    >
      <MapsUgcIcon
        sx={{
          height: "100px",
          width: "100px",
          mb: 1,
        }}
      />
      <Typography variant="h3">Send private messages to a friend.</Typography>
    </Box>
  );
};

export default EmptyContainer;
