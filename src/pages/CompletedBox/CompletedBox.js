import * as React from "react";
import "./CompletedBox.scss";
import "./Confetti.js";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Confetti from "./Confetti.js";
import Completed from "../../assets/hoorah.svg";

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

  const [Btn, setBtn] = React.useState(false);

  const handleClose = () => {
    localStorage.setItem("ModalShown", "true");
    setOpen(false);
  };

  return (
    <div>
      {Btn && <Confetti />}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          width: "100%",
          zIndex: 2,
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <div className="completed-title">
            <div className="flex">
              <h2>WooHoo!</h2>
            </div>
            <h3>We're processing your Application</h3>
          </div>
        </BootstrapDialogTitle>
        <DialogContent>
          <div className="completed-svg">
            <img className="hurray-svg" src={Completed}></img>
          </div>
        </DialogContent>
        <DialogActions className="completed-div">
          <h3>You did it!</h3>
          <Button
            style={{ width: "100%" }}
            onClick={() => setBtn(!Btn)}
            variant="contained"
            className="button-welcome"
          >
            Hurray
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
