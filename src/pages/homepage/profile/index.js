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
  const profile = useSelector((state) => state.user.profile);
  const followers = useSelector((state) => state.user.followers);
  const following = useSelector((state) => state.user.following);
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(0);
  const [postIndex, setPostIndex] = useState(0);

  useEffect(() => {
    const posts = async () => {
      try {
        const response = await client.get("/profile/posts", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    posts();
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
                src={`data:image/jpeg;base64,${profile.profile_picture}`}
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
                <h2>{profile.user_name}</h2>
                <Button
                  variant="contained"
                  sx={{ ml: 3 }}
                  onClick={() => Router.push(`/homepage/profile/edit`)}
                >
                  <h5>Edit Profile</h5>
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
                <h4>{posts.length} posts</h4>
                <h4>{followers} followers</h4>
                <h4>{following} following</h4>
              </Box>
              <Box sx={{ ml: 2, mt: 1 }}>
                <h4>{profile.bio}</h4>
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
                <Tab label="Post" {...a11yProps(0)} />
                <Tab label="Saved" {...a11yProps(0)} />
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
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <h4>Only you can see what you've saved.</h4>
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
