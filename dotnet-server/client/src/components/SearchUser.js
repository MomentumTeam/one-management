import React, { useState } from "react";
import { Grid, TextField, IconButton, CircularProgress } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import Controls from "./Controls";
import apis from "../api/applicationsApi";


export default function SearchUser({ setUser }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(options[0]);
  const [alert, setAlert] = useState({ severity: '', message: '' });
  const [openAlert, setOpenAlert] = useState(false);
  const loading = open && options.length === 0;

  const handleCloseAlert = (event, reason) => {
    setOpenAlert(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue.length > 2) {
      fetchUsers(newInputValue);
    }
    else {
      setUser();
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const selectedUser = value;

    try {
      const userStatus = await apis.getUserStatus(selectedUser.samAcountName);
      setUser(userStatus);
    }
    catch (e) {
      setOpenAlert(true);
      setAlert({ severity: "error", message: e.toString() });
    }
  };

  const fetchUsers = async (userPrefix) => {
    setOpen(true);
    try {
      const searchedUsers = await apis.searchUsers(userPrefix);
      setOptions(searchedUsers);
    }
    catch (e) {
      setOpenAlert(true);
      setAlert({ severity: "error", message: e.toString() });
    }
  };

  return (
    <div>
      <Controls.Alert open={openAlert} handleCloseAlert={handleCloseAlert} alert={alert} />

      <form onSubmit={submit} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={10}>
            <Autocomplete
              open={open}
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
              aria-label="search"
              style={{ color: "teal" }}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </div >
  );
}
