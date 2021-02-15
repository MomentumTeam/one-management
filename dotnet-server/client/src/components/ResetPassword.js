import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import { Alert, AlertTitle } from "@material-ui/lab";
import apis from "../api/applicationsApi";
import Controls from "./Controls";
import { Snackbar } from '@material-ui/core';

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

export default function ResetPassword({ user, loadUser }) {
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState([false, '']);  //dialog- [true/false, "content"]
  const [password, setPassword] = useState(false);
  const classes = useStyles();
  const [alert, setAlert] = useState([false, '', '']);  //Alert- [true/false, "severity" ,"message"]

  const handleCloseAlert = (event, reason) => {
    setAlert([false, '', '']);
  };

  const handleClose = () => {
    console.log("handleClose");
    setDialog([false, '']);
  };

  const handelClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("user=", user);
    try {
      let ret = await apis.resetPassword(user.sAMAccountName);
      if (ret.status) {
        setPassword(ret.log);
        loadUser();
      }
      setDialog([true, ret.log]);
    }
    catch (e) {
      console.log("blablabla");
      setAlert([true, "error", e.toString()]);
    }

    setLoading(false);
  };

 
  return (
    <div>
      <Snackbar open={alert[0]} autoHideDuration={10000} onClose={handleCloseAlert}>
        <Controls.Alert onClose={handleCloseAlert} severity={alert[1]}>
          {alert[2]}
        </Controls.Alert>
      </Snackbar>
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
      <Controls.AlertDialogSlide
        open={dialog[0]}
        title="הסיסמא שונתה בהצלחה!"
        content={dialog[1]}
        buttonName="סגור"
        handleClose={handleClose}
        input={false}
        handleClick={handleClose}
      />
    </div>
  );
}
