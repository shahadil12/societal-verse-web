import * as React from "react";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(5),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialog-container": {
    alignItems: "centre",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Search() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        rowSpacing={12}
        direction="column"
        justifyContent="centre"
        alignItems="flex-start"
      >
        <Grid item xs={8}>
          <List>
            <ListItem key="Search" disablePadding>
              <ListItemButton onClick={handleClickOpen}>
                <ListItemIcon>
                  <Tooltip title="Search" placement="top-end">
                    <SavedSearchIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <BootstrapDialog
        onClose={handleClose}
        open={open}
        PaperProps={{ sx: { height: "2000px", width: "450px" } }}
        sx={{
          verticalAlign: "middle",
          display: "inline-flex",
          position: "absolute",
          left: -159,
          top: -30,
        }}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Search
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">Recent</Typography>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
