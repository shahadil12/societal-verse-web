import * as React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideBar from "../Drawer/SideBar";
import Divider from "@mui/material/Divider";

export default function Profile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <SideBar />
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          width: "65%",
          right: 100,
          display: "flex",
          justifyContent: "space-around",
          alignContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <AccountCircleIcon
          sx={{ fontSize: 170, top: 25, position: "relative" }}
        />
        <Box sx={{ position: "relative", top: 50 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            shah_adil01
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{ ml: 3, mb: 1, fontSize: 11 }}
            >
              Edit Profile
            </Button>
          </Typography>
          <Typography variant="h7" display="inline" sx={{ mr: 4 }}>
            0 posts
          </Typography>
          <Typography variant="h7" display="inline" sx={{ mr: 4 }}>
            0 followers
          </Typography>
          <Typography variant="h7" display="inline" sx={{ mr: 4 }}>
            0 follwing
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ width: "100%", mt: 30 }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Posts" />
            <Tab label="Saved" />
            <Tab label="Tagged" />
          </Tabs>
        </Box>
      </Box>
    </>
  );
}
