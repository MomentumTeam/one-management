import React, { useState } from "react";
import { Snackbar, Button, CircularProgress, Dialog, } from '@material-ui/core';
import apis from "../api/applicationsApi";
import Controls from "./Controls";


export default function ResetPassword({ user, loadUser }) {
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState([false, '']);  //dialog- [true/false, "content"]
  const [password, setPassword] = useState(false);
  const [alert, setAlert] = useState({ severity: '', message: '' });  //Alert- [true/false, "severity" ,"message"]

  const handleCloseAlert = (event, reason) => {
    setAlert({ severity: '', message: '' });
  };

  const handleClose = () => {
    setDialog([false, '']);
  };

  const handelClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response = await apis.resetPassword(user.sAMAccountName);
      if (response.status) {
        setPassword(response.log);
        loadUser();
      }
      setDialog([true, response.log]);
    }
    catch (e) {
      setAlert({ severity: "error", message: e.toString() });
    }
    setLoading(false);
  };


  return (
    <div>
      <Snackbar open={alert.severity != ""} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Controls.Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Controls.Alert>
      </Snackbar>
      <Button
        variant="outlined"
        onClick={handelClick}
        color="primary"
        fullWidth
        disabled={!user}>
        אפס סיסמא
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
      </Button>
      <Controls.DialogSlide
        open={dialog[0]}
        title="הסיסמא שונתה בהצלחה!"
        content={dialog[1]}
        buttonName="סגור"
        handleClose={handleClose}
        handleClick={handleClose}
      />
    </div>
  );
}
