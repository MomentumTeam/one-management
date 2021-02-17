import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import apis from "../api/applicationsApi";
import { Snackbar } from '@material-ui/core';
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
      // border: '1px solid white',
    },
    backgroundColor: "rgba(255, 255,255, 0)",
  },
  title: {
    // margin: theme.spacing(4, 0, 2),
  },
}));


export default function GroupList({ user, setUser }) {
  const classes = useStyles();
  const [dialog, setDialog] = useState([false, '']);  //dialog- [true/false, "content"]
  const [alert, setAlert] = useState({ severity: '', message: '' });  //Alert- [true/false, "severity" ,"message"]
  const [group, setGroupToDelete] = useState();

  const handleClose = () => {
    setDialog([false, '']);
  };

  const handleCloseAlert = (event, reason) => {
    setAlert({ severity: '', message: '' });
  };

  const deleteGroup = async () => {
    try {
      let groupToDelete = { userName: user.sAMAccountName, group }
      const response = await apis.removeGroup(groupToDelete);
      setUser({ ...user, groups: user.groups.filter(item => item !== group) })
      setDialog([false, '']);
      setAlert({ severity: 'success', message: response.log });
    }
    catch (e) {
      setAlert({ severity: "error", message: e.toString() });
    }
  };

  const openDialog = async (deleteGroupName) => {
    setGroupToDelete(deleteGroupName);
    setDialog([true, `אישור מחיקת קבוצה ${deleteGroupName}`]);
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

      <Controls.AlertDialogSlide
        open={dialog[0]}
        title={dialog[1]}
        buttonName="אשר"
        handleClose={handleClose}
        // input={{ placeHolder: "New Display Name", value: newDisplayName }}
        handleClick={deleteGroup}
      />
    </div>
  );
}
