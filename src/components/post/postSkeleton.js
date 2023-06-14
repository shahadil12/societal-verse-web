import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import useMediaQuery from "@mui/material/useMediaQuery";

const PostSkeleton = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Card
      sx={{
        maxWidth: 550,
        height: isMobile ? 365 : 550,
        width: isMobile ? 365 : 550,
        mt: 8,
        borderRadius: 2,
        border: 1,
        borderColor: "#E0E0E0",
        p: 0,
        boxShadow:
          "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={50}
            height={50}
            style={{ marginTop: 3 }}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={17}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={15} width="40%" />}
      />
      <Skeleton sx={{ height: 320 }} animation="wave" variant="rectangular" />
      <CardContent>
        <>
          <Skeleton
            animation="wave"
            height={17}
            style={{ marginBottom: 6, marginTop: 10 }}
          />
          <Skeleton animation="wave" height={15} width="80%" />
          <Skeleton
            animation="wave"
            height={50}
            width="90%"
            style={{ marginTop: 30 }}
          />
        </>
      </CardContent>
    </Card>
  );
};

export default PostSkeleton;
