import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Divider from "@material-ui/core/Divider";
import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(255, 255,255, 0)",
    height: "100%",
  },
}));
export default function UserDetails({ user }) {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="DisplayName" secondary={user && user.displayName? user.displayName : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email" secondary={user && user.mail? user.mail : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="userPrincipalName" secondary={user && user.userPrincipalName? user.userPrincipalName : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LockOpenIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Password Status" secondary={user && user.passwordStatus? user.passwordStatus : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="SAM Account Name" secondary={user && user.sAMAccountName? user.sAMAccountName : ""}/>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LockIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Locked" secondary={user && user.locked? user.locked : ""}/>
        </ListItem>
      </List>
    </Paper>
  );
}
