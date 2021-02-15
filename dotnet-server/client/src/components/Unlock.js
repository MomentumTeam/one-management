import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import { Alert, AlertTitle } from "@material-ui/lab";
import apis from "../api/applicationsApi";
import { Snackbar } from '@material-ui/core';
import Controls from "./Controls";

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

export default function Unlock({ user, loadUser }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(false);
  const classes = useStyles();
  const [alert, setAlert] = useState([false, '', '']);  //Alert- [true/false, "severity" ,"message"]

  const handleCloseAlert = (event, reason) => {
    setAlert([false, '', '']);
  };


  const unlockUser = async () => {
    try {
      const response = await apis.unlock(user.sAMAccountName);
      if (response.status) {
        loadUser();
      }
      return response;
    }
    catch (e) {
      if (e.response && e.response.data) {
        setAlert([true, "error", e.response.data]);
      }
      else {
        setAlert([true, "error", e.toString()]);
      }
    }
  };

  const handelClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res=await unlockUser();
    setAlert([true, "success", res.log]);
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
        Unlock
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
      </Button>

    </div>
  );
}
