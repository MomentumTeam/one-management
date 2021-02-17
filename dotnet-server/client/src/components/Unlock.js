import React, { useState } from "react";
import { Snackbar, Button, CircularProgress } from '@material-ui/core';
import apis from "../api/applicationsApi";
import Controls from "./Controls";


export default function Unlock({ user, loadUser }) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ severity: '', message: '' });  //Alert- [true/false, "severity" ,"message"]

  const handleCloseAlert = (event, reason) => {
    setAlert({ severity: '', message: '' });
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
        setAlert({ severity: "error", message: e.response.data });
      }
      else {
        setAlert({ severity: "error", message: e.toString() });
      }
    }
  };

  const handelClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await unlockUser();
    setAlert({ severity: 'success', message: res.log });
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
        disabled={(!user) || (user.locked === "true")}
      >
        Unlock
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
      </Button>

    </div>
  );
}
