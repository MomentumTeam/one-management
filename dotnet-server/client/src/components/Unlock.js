import React, { useState } from "react";
import { Button, CircularProgress } from '@material-ui/core';
import apis from "../api/applicationsApi";
import Controls from "./Controls";


export default function Unlock({ user, loadUser }) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ severity: '', message: '' });
  const [openAlert, setOpenAlert] = useState(false);
  
  const handleCloseAlert = (event, reason) => {
    setOpenAlert(false);
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
        setOpenAlert(true);
        setAlert({ severity: "error", message: e.response.data });
      }
      else {
        setOpenAlert(true);
        setAlert({ severity: "error", message: e.toString() });
      }
    }
  };

  const handelClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await unlockUser();
    setOpenAlert(true);
    setAlert({ severity: 'success', message: res.log });
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
        disabled={(!user) || (user.locked === "true")}
      >
        Unlock
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
      </Button>

    </div>
  );
}
