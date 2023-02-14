import * as React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(5),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(3),
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

export default function Notification() {
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
            <ListItem key="Notification" disablePadding>
              <ListItemButton onClick={handleClickOpen}>
                <ListItemIcon>
                  <Tooltip title="Notifications" placement="top-end">
                    <NotificationsNoneIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Notification" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{ sx: { height: "1800px", width: "450px" } }}
        sx={{
          verticalAlign: "middle",
          display: "inline-flex",
          position: "absolute",
          left: -159,
          top: -30,
        }}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Notifications
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography variant="h7">Today</Typography>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
