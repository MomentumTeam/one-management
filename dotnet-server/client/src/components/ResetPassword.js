import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import { Alert, AlertTitle } from "@material-ui/lab";
import apis from "../api/applicationsApi";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ResetPassword({ user }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(false);
  const classes = useStyles();

  const resetPassword = async () => {
    // TODO http req
    return new Promise((res, rej) => {
      return setTimeout(() => res("1234567"), 2000);
    });
  };

  const handelClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newPassword = await apis.resetPassword(user.sAMAccountName);

    setPassword(newPassword);
    setLoading(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handelClick}
        color="primary"
        fullWidth
        disabled={!user}
      >
        אפס סיסמא
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          הסיסמא החדשה {password}
        </Alert>
      </Dialog>
    </div>
  );
}
