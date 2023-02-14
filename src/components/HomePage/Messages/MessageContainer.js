import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function MessageContainer() {
  return (
    <Container
      sx={{
        width: 400,
        position: "absolute",
        left: 400,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SendIcon
        sx={{
          height: "100px",
          width: "100px",
          border: 1,
          borderRadius: "50%",
          mb: 1,
        }}
      />
      <Typography varient="h6">
        Send private photos and messages to a friend.
      </Typography>
    </Container>
  );
}
