import * as React from "react";
import "./WelcomeBox.scss";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Welcome from "../../assets/welcome.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    background: "#fff !important",
  },
  "& .MuiPaper-root": {
    background: "#6ECFF6",
  },
}));

const BootstrapDialogTitle = (props) => {
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
          }}
        ></IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function WelcomeBox() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    localStorage.setItem("ModalShown", "true");
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        className="welcome-"
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          width: "100%",
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <div className="welcome-title">
            <div className="flex">
              <h1>CSI</h1>
              <h2>RECRUITMENT</h2>
            </div>
            <h3>First Year Representatives 2022-2023</h3>
          </div>
        </BootstrapDialogTitle>
        <DialogContent className="welcome-svg">
          <img className="hello-svg" src={Welcome} />
        </DialogContent>
        <DialogActions className="button-div">
          <h3>"Participation is what Matters"</h3>
          <Button
            style={{ width: "100%" }}
            variant="contained"
            onClick={handleClose}
            className="button-welcome"
          >
            Lets Go
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
