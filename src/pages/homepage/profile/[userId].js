import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SideBar from "../../../components/ui/SideBar";
import { Grid, Avatar } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { client } from "../../../utils/api";
import { useRouter } from "next/router";
import FullPost from "../../../components/post/fullPost";
import { Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  useLazyGetSpecificProfileQuery,
  useFollowMutation,
  useUnfollowMutation,
} from "../../../utils/userApi";
import { useLazyGetSpecificProfilePostQuery } from "../../../utils/postApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 0,
  margin: 0,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" {...other}>
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  );
}

export default function Profile() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const token = useSelector((state) => state.auth.token);
  if (!token) router.push("/");
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(0);
  const [postIndex, setPostIndex] = useState(0);
  const [profile, setProfile] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [getSpecificProfile] = useLazyGetSpecificProfileQuery();
  const [getSpecificProfilePost] = useLazyGetSpecificProfilePostQuery();
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  useEffect(() => {
    if (!router.isReady) return;
    setUserId(router.query.userId);
  }, [router.isReady]);

  useEffect(() => {
    const initailData = async () => {
      if (!userId) return;
      try {
        const { data: profileResponse } = await getSpecificProfile({
          token,
          userId,
        });
        const { data: profilePostResponse } = await getSpecificProfilePost({
          token,
          userId,
        });

        if (profileResponse.success) {
          setProfile(profileResponse);
          setIsFollowing(profileResponse.isUserFollowing);
        }
        if (profilePostResponse.success) {
          setPosts(profilePostResponse.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    initailData();
  }, [userId, isFollowing]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);

  const followHandler = async () => {
    try {
      if (!isFollowing) {
        if (!userId) return;
        const { data: followResponse } = await follow({ token, userId });
        if (followResponse.success) setIsFollowing(true);
      }

      if (isFollowing) {
        const { data: unfollowResponse } = await unfollow(token);
        if (unfollowResponse.success) setIsFollowing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container>
      <Grid item sx={{ position: "fixed" }}>
        <SideBar />
      </Grid>
      <Grid item sx={{ display: "flex", ml: isMobile ? 0 : 30 }}>
        <FullPost
          post={posts[postIndex]}
          open={modalOpen}
          close={handleClose}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: isMobile ? 400 : 800,
            mt: 6,
            ml: 16,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              mb: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginRight: 5,
                ml: 5,
                mt: 4,
              }}
            >
              <Avatar
                src={`data:image/jpeg;base64,${profile?.profile?.profile_picture}`}
                sx={{
                  width: 150,
                  height: 150,
                  border: 1,
                  borderColor: "#E2E2E2",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                maxHeight: 100,
                margin: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  margin: 2,
                  padding: 0,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h3" sx={{ mr: 2 }}>
                  {profile?.profile?.user_name}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ ml: 3 }}
                  onClick={followHandler}
                >
                  <Typography>
                    {isFollowing ? "Following" : "Follow"}
                  </Typography>
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  margin: 1,
                  padding: 1,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" sx={{ mr: 3 }}>
                  {posts?.length} posts
                </Typography>
                <Typography variant="h5" sx={{ mr: 3 }}>
                  {profile?.followers} followers
                </Typography>
                <Typography variant="h5">
                  {profile?.following} following
                </Typography>
              </Box>
              <Box sx={{ ml: 2, mt: 1 }}>
                <Typography variant="h6">{profile?.profile?.bio}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                mt: 1.5,
              }}
            >
              <Tabs centered>
                <Tab label={<Typography variant="h6">Posts</Typography>} />
              </Tabs>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: isMobile ? "" : "center",
                mt: 1,
              }}
            >
              <TabPanel>
                <ImageList
                  sx={{ width: isMobile ? 300 : 700, height: 400, mt: 2 }}
                  cols={isMobile ? 1 : 2}
                  rowHeight={250}
                >
                  {posts.map((post, i) => (
                    <ImageListItem key={i}>
                      <img
                        onClick={() => {
                          setModalOpen(true);
                          setPostIndex(i);
                        }}
                        src={`data:image/jpeg;base64,${post?.post?.picture}`}
                        loading="lazy"
                        style={{ height: "200px" }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
