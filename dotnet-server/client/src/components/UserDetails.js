import React from "react";
import { Paper, makeStyles, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import ExtensionIcon from '@material-ui/icons/Extension';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(255, 255,255, 0)",
    height: "100%",
    overflowY: "scroll",
    overflowX: "hidden",
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
  },
}));

export default function UserDetails({ user }) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root} >
      <List >
        <ListItem >
          <ListItemAvatar>
            <Avatar>
              <FaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="DisplayName" secondary={user && user.dispalyName ? user.dispalyName : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email" secondary={user && user.mail ? user.mail : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="userPrincipalName" secondary={user && user.userPrincipalName ? user.userPrincipalName : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LockIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Password Status" secondary={user && user.passwordStatus ? user.passwordStatus : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountBoxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="SAM Account Name" secondary={user && user.sAMAccountName ? user.sAMAccountName : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Name" secondary={user && user.name ? user.name : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Given Name" secondary={user && user.givenName ? user.givenName : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ExtensionIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Ex1" secondary={user && user.ex1 ? user.ex1 : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ExtensionIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Ex2" secondary={user && user.ex2 ? user.ex2 : ""} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LockIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Locked" secondary={user && user.locked ? user.locked : ""} />
        </ListItem>
      </List>
    </Paper>
  );
}
