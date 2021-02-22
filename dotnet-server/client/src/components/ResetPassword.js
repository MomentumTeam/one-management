import React, { useState } from "react";
import { Button, CircularProgress, Dialog, } from '@material-ui/core';
import apis from "../api/applicationsApi";
import Controls from "./Controls";


export default function ResetPassword({ user, loadUser }) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(false);
  const [dialog, setDialog] = useState({ open: false, content: '' });
  const [alert, setAlert] = useState({ severity: '', message: '' });
  const [openAlert, setOpenAlert] = useState(false);
  
  const handleCloseAlert = (event, reason) => {
    setOpenAlert(false);
  };

  const handleClose = () => {
    setDialog({ open: false, content: '' });
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
      setDialog({ open: true, content: response.log });
    }
    catch (e) {
      setOpenAlert(true);
      setAlert({ severity: "error", message: e.toString() });
    }
    setLoading(false);
  };


  return (
    <div>
      <Controls.Alert open={openAlert} handleCloseAlert={handleCloseAlert} alert={alert} />

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
        open={dialog.open}
        title="הסיסמא שונתה בהצלחה!"
        content={dialog.content}
        buttonName="סגור"
        handleClose={handleClose}
        handleClick={handleClose}
      />
    </div>
  );
}
