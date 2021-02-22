import React, { useState } from "react";
import { Paper } from '@material-ui/core';
import { ThemeProvider, createMuiTheme, } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import styles from "./style.module.css";
import Controls from '../Controls';
import SearchUser from "../SearchUser";
import ResetPassword from "../ResetPassword";
import UserDetails from "../UserDetails";
import Unlock from "../Unlock";
// import ChangeDisplayName from "../ChangeDisplayName";
import AddGroup from "../AddGroup";
import GroupList from "../GroupList";
import apis from "../../api/applicationsApi";


const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
  direction: 'rtl',
});

function UserManagement() {
  const [user, setUser] = useState();
  const [alert, setAlert] = useState({ severity: '', message: '' });
  const [openAlert, setOpenAlert] = useState(false);
  
  const handleCloseAlert = (event, reason) => {
    setOpenAlert(false);
  };

  const loadUser = async () => {
    try {
      const userStatus = await apis.getUserStatus(user.sAMAccountName);
      setUser(userStatus);
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

  return (
    <div className={styles.rootDiv}>
      <Controls.Alert open={openAlert} handleCloseAlert={handleCloseAlert} alert={alert} />

      <Paper elevation={24} classes={{ root: styles.paper }}>
        <h1 >ניהול משתמש</h1>
        <div className={styles.flex}>
          <div className={styles.gridContainer}>
            <ThemeProvider theme={theme}>
              <div className={styles.search}>
                <SearchUser setUser={setUser} />
              </div>
              <div className={styles.password}>
                <ResetPassword user={user} loadUser={loadUser} />
              </div>
              <div className={styles.userDisplay}>
                <UserDetails user={user} />
              </div>
              <div className={styles.mark}>
                <Unlock user={user} loadUser={loadUser} />
              </div>
              <div className={styles.addGroup}>
                <AddGroup user={user} setUser={setUser} />
              </div>
              <div className={styles.groups}>
                <GroupList user={user} setUser={setUser} />
              </div>
            </ThemeProvider>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default UserManagement;
