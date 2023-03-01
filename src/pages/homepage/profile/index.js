import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SideBar from "../../../components/ui/SideBar";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import { Grid, Avatar } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import client from "../../../utils/api";
import UserPost from "../../../components/post/userPost";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

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
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1, ml: 6 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Profile() {
  const Router = useRouter();
  const token = useSelector((state) => state.auth.token);
  if (!token) Router.push("/");
  const userId = useSelector((state) => state.user.profile.user_id);
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(0);
  const [postIndex, setPostIndex] = useState(0);
  const [profile, setProfile] = useState({});

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
      try {
        const response = await client.get(`/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setProfile(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    profile();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);

  return (
    <Grid container>
      <Grid item>
        <SideBar />
      </Grid>
      <Grid item sx={{ display: "flex", ml: 4 }}>
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
            ml: 13,
          }}
        >
          <Box sx={{ display: "flex", mb: 5 }}>
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
                  onClick={() => Router.push(`/homepage/profile/edit`)}
                >
                  <Typography>Edit Profile</Typography>
                </Button>
                <Brightness5Icon sx={{ mt: 0.5, ml: 0.5 }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  margin: 1,
                  padding: 1,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">{posts?.length} posts</Typography>
                <Typography variant="h5">
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
              <Tabs value={value} onChange={handleChange} centered>
                <Tab
                  label={<Typography variant="h6">Posts</Typography>}
                  {...a11yProps(0)}
                />
                <Tab
                  label={<Typography variant="h6">Saved</Typography>}
                  {...a11yProps(0)}
                />
              </Tabs>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 1,
              }}
            >
              <TabPanel value={value} index={0}>
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
                        style={{ height: "200px" }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <Typography variant="h5">
                  Only you can see what you've saved.
                </Typography>
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
