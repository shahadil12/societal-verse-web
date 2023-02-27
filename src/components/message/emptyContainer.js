import MapsUgcIcon from "@mui/icons-material/MapsUgc";
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
      <h3>Send private photos and messages to a friend.</h3>
    </Box>
  );
};

export default EmptyContainer;
