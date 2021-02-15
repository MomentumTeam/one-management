import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Controls from "../Controls";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../UseForm";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import SearchUser from "../SearchUser";
import ResetPassword from "../ResetPassword";
import { Autorenew } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Modal from "../Modal";
import styles from "./style.module.css";
import LinkedBox from "../LinkedBox";
import UserDetails from "../UserDetails";
import AddGroup from "../AddGroup";
import { stubFalse } from "lodash";
import Unlock from "../Unlock";
import apis from "../../api/applicationsApi";

const useStyles = makeStyles((theme) => ({
  paper: {
    // backgroundColor: "#D0D0D0",
    width: "100%",
    height: "100%",
    background: "linear-gradient( #e6e6e6 90%, teal 10%)",

  },
}));

const initialValues = {
  input: "",
};

function UserManagement() {
  const classes = useStyles();

  const [user, setUser] = useState();

  const submit = (e) => {
    e.preventDefault();
  };

  const { values, handleInputChange, resetForm } = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const loadUser = async () => {
    try{
      const userStatus = await apis.getUserStatus(user.sAMAccountName);
      setUser(userStatus);
    }
    catch(e){
      if(e.response && e.response.data){
        window.alert(e.response.data);
      }
      else{
        window.alert(e.toString());
      }
      
    }

  };

  return (
    <Paper elevation={24} classes={{ root: classes.paper }}>
      <h1 >ניהול משתמש</h1>
      <div className={styles.flex}>
        <div className={styles.gridContainer}>
          <div className={styles.search}>
            <SearchUser setUser={setUser} />
          </div>

            <div className={styles.password}>
              <ResetPassword user={user} loadUser={loadUser}/>
            </div>
            <div className={styles.userDisplay}>
              <UserDetails user={user} />
            </div>
            <div className={styles.mark}>
              {/* <LinkedBox isLinked={false} /> */}
              <Unlock user={user} loadUser={loadUser}/>
            </div>
            <div className={styles.addGroup}>
              <AddGroup user={user} />
            </div>
            {/* <div className={styles.groups}>
              <Paper className={classes.root}>ergfer</Paper>
            </div> */}
        </div>
      </div>
    </Paper>
  );
}

export default UserManagement;
