import CreateIcon from "@mui/icons-material/Create";
import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CollectionsIcon from "@mui/icons-material/Collections";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#060606",
    },
  },
});

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

export default function Create() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        rowSpacing={12}
        direction="column"
        justifyContent="centre"
        alignItems="flex-start"
      >
        <Grid item xs={8}>
          <List>
            <ListItem key="Create" disablePadding>
              <ListItemButton onClick={handleClickOpen}>
                <ListItemIcon>
                  <Tooltip title="Create" placement="top-end">
                    <CreateIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Create" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ verticalAlign: "middle", display: "inline-flex", left: 100 }}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Create new Post
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <CollectionsIcon
            sx={{
              fontSize: 80,
              ml: 16,
              mb: 1,
            }}
          />
          <Typography variant="h5" sx={{ ml: 10 }}>
            Drag photos here
          </Typography>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              color="primary"
              variant="contained"
              sx={{ mr: 5, ml: 5 }}
            >
              Select from computer
            </Button>
          </DialogActions>
        </DialogContent>
      </BootstrapDialog>
    </ThemeProvider>
  );
}
