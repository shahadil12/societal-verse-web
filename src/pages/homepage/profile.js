import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideBar from "../../components/ui/SideBar/SideBar";
import Divider from "@mui/material/Divider";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import { Grid, Modal, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import useUser from "../../hooks/useUser";
import { useSelector } from "react-redux";
import client from "../../utils/api";

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

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
];

const comments = [
  {
    url: "https://images.unsplash.com/photo-1577611473531-542453710a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    userName: "Altamash Samani",
    comment: "Sent You A Message",
  },
  {
    url: "https://images.unsplash.com/photo-1671425155082-be2b52959dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    userName: "Hussain Shaikh",
    comment: "You Reacted to Their Story",
  },
  {
    url: "https://images.unsplash.com/photo-1542655071-b312770dc237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    userName: "Ovais Raza",
    comment: "Liked Your Message",
  },
  {
    url: "https://images.unsplash.com/photo-1669817683129-869ca3c0bd3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    userName: "RIZWANSHAIKH",
    comment: "Sent You A Message",
  },
];

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
  useUser({ redirectTo: "/" });
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.user.profile);
  const followers = useSelector((state) => state.user.followers);
  const following = useSelector((state) => state.user.following);
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(0);

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

  const modal = (
    <Modal open={modalOpen} onClose={handleClose}>
      <Box sx={style}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              borderRight: 1,
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={`data:image/jpeg;base64,${profile.thumbnail_profile_picture}`}
                />
              }
              title={profile.user_name}
              sx={{ borderBottom: 1 }}
            ></CardHeader>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <List sx={{ height: 331, maxHeight: 331, overflow: "auto" }}>
                {comments.map((comment, i) => {
                  return (
                    <>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar src={comment.url} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<h5>{comment.userName}</h5>}
                          secondary={<h6>{comment.comment}</h6>}
                        ></ListItemText>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
              </List>
              <CardActions disableSpacing>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
                <Typography variant="h5">
                  <h5> likes</h5>
                </Typography>
              </CardActions>
              <h6 style={{ marginLeft: 18 }}>28 MINUTES AGO</h6>
              <FormControl fullWidth variant="filled">
                <InputLabel>Comment</InputLabel>
                <FilledInput
                  startAdornment={
                    <InputAdornment position="start">
                      <TagFacesIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>
          <Box
            width={500}
            height={500}
            sx={{ mt: 2, mb: 2, maxHeight: 500, maxWidth: 500 }}
          >
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1675601785141-3ac666ed2047?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              sx={{
                height: 500,
                width: 500,
              }}
            />
          </Box>
        </Card>
      </Box>
    </Modal>
  );

  return (
    <Grid container>
      <Grid item>
        <SideBar />
      </Grid>
      <Grid item sx={{ display: "flex", mt: 4, ml: 22 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {modal}
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
                <Button variant="contained" sx={{ ml: 3 }}>
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
                <h4>0 posts</h4>
                <h4>{followers} followers</h4>
                <h4>{following} following</h4>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Post" {...a11yProps(0)} />
                <Tab label="Saved" {...a11yProps(0)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ImageList
                sx={{ width: 500, height: 450, mt: 2 }}
                cols={2}
                rowHeight={250}
              >
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      onClick={() => setModalOpen(true)}
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
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
      </Grid>
    </Grid>
  );
}
