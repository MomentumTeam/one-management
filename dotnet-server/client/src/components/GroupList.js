import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Snackbar, Paper, Grid, IconButton, ListItemText,
  ListItemSecondaryAction, ListItem, List
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import apis from "../api/applicationsApi";
import Controls from "./Controls";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(255, 255,255, 0)",
  },
  demo: {
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#D3D3D3'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'teal',
      borderRadius: '20px',
    },
    backgroundColor: "rgba(255, 255,255, 0)",
  }
}));


export default function GroupList({ user, setUser }) {
  const classes = useStyles();
  const [group, setGroupToDelete] = useState();
  const [dialog, setDialog] = useState({ open: false, title: '' });
  const [alert, setAlert] = useState({ severity: '', message: '' });  

  const handleClose = () => {
    setDialog({ open: false, title: '' });
  };

  const handleCloseAlert = (event, reason) => {
    setAlert({ severity: '', message: '' });
  };

  const deleteGroup = async () => {
    try {
      let groupToDelete = { userName: user.sAMAccountName, group }
      const response = await apis.removeGroup(groupToDelete);
      setUser({ ...user, groups: user.groups.filter(item => item !== group) })
      setDialog({ open: false, title: '' });
      setAlert({ severity: 'success', message: response.log });
    }
    catch (e) {
      setAlert({ severity: "error", message: e.toString() });
    }
  };

  const openDialog = async (deleteGroupName) => {
    setGroupToDelete(deleteGroupName);
    setDialog({ open: true, title: `אישור מחיקת קבוצה ${deleteGroupName}`});
  };

  return (
    <div>
      <Snackbar open={alert.severity != ""} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Controls.Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Controls.Alert>
      </Snackbar>
      <Paper variant="outlined" className={classes.root}>
        {user ?
          <Grid item xs={12} md={12}>
            <div className={classes.demo} style={{ maxHeight: 200, overflow: 'auto' }}>
              {user.groups.length > 0 ?
                <List dense={true}>
                  {user.groups.map((item, index) => {
                    return (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={() => openDialog(item)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })}
                </List> : "אין קבוצות מקושרות"}
            </div>
          </Grid>
          : null}
      </Paper>
      <Controls.DialogSlide
        open={dialog.open}
        title={dialog.title}
        buttonName="אשר"
        handleClose={handleClose}
        handleClick={deleteGroup}
      />
    </div>
  );
}
