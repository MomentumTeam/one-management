import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const AlertMessage = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Alert(props) {
  let displayTime;

  const { open, handleCloseAlert, alert, ...other } = props;

  if (alert.severity == "error") {
    displayTime = 12000;
  }
  else {
    displayTime = 6000;
  }

  return (
    <Snackbar open={open} autoHideDuration={displayTime} onClose={handleCloseAlert}>
      <AlertMessage onClose={handleCloseAlert} severity={alert.severity}>
        {alert.message}
      </AlertMessage>
    </Snackbar>);
}

