import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SideBar from "../../../components/ui/SideBar";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import { Grid, Avatar } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import client from "../../../utils/api";
import UserPost from "../../../components/post/userPost";
import { useRouter } from "next/router";
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

export default function Profile() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(0);
  const [postIndex, setPostIndex] = useState(0);
  const [profile, setProfile] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    setUserId(router.query.userId);
  }, [router.isReady]);

  useEffect(() => {
    const posts = async () => {
      try {
        const response = await client.get("/profile/posts", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setPosts(response.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    posts();

    const profile = async () => {
      if (!userId) return;
      try {
        const response = await client.get(`/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        if (response.data.success) {
          setProfile(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    profile();
  }, [userId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);

  const followHandler = async () => {
    try {
      if (!isFollowing) {
        if (!userId) return;
        const response = await client.post(
          `/user/follow/${userId}`,
          {},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setIsFollowing(true);
          router.reload();
        }
      }

      if (isFollowing) {
        const response = await client.delete("/user/follow", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setIsFollowing(false);
          router.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container>
      <Grid item>
        <SideBar />
      </Grid>
      <Grid item sx={{ display: "flex" }}>
        <UserPost
          post={posts[postIndex]}
          open={modalOpen}
          close={handleClose}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 800,
            mt: 6,
            ml: 15,
          }}
        >
          <Box sx={{ display: "flex", mb: 5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginRight: 5,
              }}
            >
              <Avatar
                src={`data:image/jpeg;base64,${profile?.profile?.profile_picture}`}
                sx={{ width: 150, height: 150 }}
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
                <h2>{profile?.profile?.user_name}</h2>
                <Button
                  variant="contained"
                  sx={{ ml: 3 }}
                  onClick={followHandler}
                >
                  <h5>{isFollowing ? "Following" : "Follow"}</h5>
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
                <h4>{posts.length} posts</h4>
                <h4>{profile?.followers} followers</h4>
                <h4>{profile?.following} following</h4>
              </Box>
              <Box sx={{ ml: 2, mt: 1 }}>
                <h4>{profile?.profile?.bio}</h4>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 1,
              }}
            >
              <ImageList
                sx={{ width: 700, height: 400, mt: 2 }}
                cols={3}
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
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
