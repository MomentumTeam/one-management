import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, CircularProgress } from '@material-ui/core';
import Controls from "./Controls";
import apis from "../api/applicationsApi";


export default function AddGroup({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(options[0]);
  const [groupToAdd, setGroupToAdd] = useState();
  const [dialog, setDialog] = useState({ open: false, title: '' });
  const [alert, setAlert] = useState({ severity: '', message: '' });
  const [openAlert, setOpenAlert] = useState(false);
  const loading = open && options.length === 0;

  const handleClose = () => {
    setDialog({ open: false, title: '' });
  };

  const handleCloseAlert = (event, reason) => {
    setOpenAlert(false);
  };

  const fetchGropus = async (groupPrefix) => {
    setOpen(true);
    try {
      const groups = await apis.searchGroup(groupPrefix);
      setOptions(groups);
    }
    catch (e) {
      setOpenAlert(true);
      setAlert({ severity: "error", message: e.toString() });
    }
  };

  const saveGroup = async (group) => {
    try {
      let groupToAdd = { userName: user.sAMAccountName, group: group.samAcountName }
      const response = await apis.addGroup(groupToAdd);

      setInputValue(null);
      setValue(null);
      setUser({ ...user, groups: [...user.groups, group.samAcountName] });
      setOpenAlert(true);
      setAlert({ severity: 'success', message: response.log });
    }
    catch (e) {
      setOpenAlert(true);
      setAlert({ severity: "error", message: e.toString() });
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue.length > 2) {
      fetchGropus(newInputValue);
    }
  };

  const handleAdd = async () => {
    saveGroup(groupToAdd)
    setDialog({ open: false, title: '' });
  };

  const handleChange = (event, value, reason) => {
    if (reason === "select-option") {
      setGroupToAdd(value);
      setDialog({ open: true, title: `אישור הוספת קבוצה ${value.name}` });
    }
  }

  return (
    <div>
      <Controls.Alert open={openAlert} handleCloseAlert={handleCloseAlert} alert={alert} />

      <Autocomplete
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        inputValue={inputValue ?? ""}
        onInputChange={handleInputChange}
        value={value ?? ""}
        onChange={handleChange}
        disabled={!user}
        renderInput={(params) => (
          <TextField
            {...params}
            label="הוסף קבוצה"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <Controls.DialogSlide
        open={dialog.open}
        title={dialog.title}
        buttonName="אשר"
        handleClose={handleClose}
        handleClick={handleAdd}
      />
    </div>
  );
}
