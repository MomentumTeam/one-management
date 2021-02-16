import React, { useEffect, useState } from "react";
import {
  makeStyles,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import apis from "../api/applicationsApi";

import { Snackbar } from '@material-ui/core';
import Controls from "./Controls";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    direction: "rtl",
  },
}));

const domains = [
  { name: "None", value: "" },
  { name: "Ten", value: 10 },
  { name: "Twenty", value: 20 },
  { name: "Thirty", value: 30 },
];
export default function SearchUser({ setUser }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(options[0]);
  const [domain, setDomain] = useState("");
  const loading = open && options.length === 0;
  const [alert, setAlert] = useState({ severity: '', message: '' });  //Alert- [true/false, "severity" ,"message"]

  const classes = useStyles();

  const handleCloseAlert = (event, reason) => {
    setAlert({ severity: '', message: '' });
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue.length > 2) {
      fetchUsers(newInputValue);
    }
  };

  const submit = async (e) => {
    console.log("submit!");
    e.preventDefault();
    const selectedUser = value;
    console.log("selectedUser", selectedUser);
    try {
      const userStatus = await apis.getUserStatus(selectedUser.samAcountName);
      console.log("userStatus = ", userStatus);
      setUser(userStatus);
    }
    catch (e) {
      setAlert({ severity: "error", message: e.toString() });
    }

  };

  const fetchUsers = async (userPrefix) => {
    console.log("fetch users!");
    setOpen(true);
    try {
      const searchedUsers = await apis.searchUsers(userPrefix);
      setOptions(searchedUsers);
    }
    catch (e) {
      window.alert(e.toString());
    }
  };

  return (
    <div>
      <Snackbar open={alert.severity != ""} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Controls.Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Controls.Alert>
      </Snackbar>
      <form onSubmit={submit} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={10}>
            <Autocomplete
              open={open}
              // onOpen={() => {
              //    // setOpen(true);
              // }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionSelected={(option, value) =>
                option.optionToDisplay === value.optionToDisplay
              }
              getOptionLabel={(option) => option.optionToDisplay}
              options={options}
              loading={loading}
              inputValue={inputValue ?? ""}
              onInputChange={handleInputChange}
              value={value ?? ""}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="הקלד כדי לחפש משתמש"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <IconButton
              type="submit"
              // variant="filled"
              variant="outlined"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </div >
  );
}
