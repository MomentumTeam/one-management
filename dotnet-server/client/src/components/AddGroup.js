import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import apis from "../api/applicationsApi";
import Controls from "./Controls";
import { Snackbar } from '@material-ui/core';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AddGroup({ user, setUser }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(options[0]);
  const loading = open && options.length === 0;
  const [dialog, setDialog] = useState([false, '']);  //dialog- [true/false, "content"]
  const [alert, setAlert] = useState({ severity: '', message: '' });  //Alert- [true/false, "severity" ,"message"]
  const [groupToAdd, setGroupToAdd] = useState();

  const handleClose = () => {
    setDialog([false, '']);
  };

  const handleCloseAlert = (event, reason) => {
    setAlert({ severity: '', message: '' });
  };

  const fetchGropus = async (groupPrefix) => {
    setOpen(true);
    try {
      const groups = await apis.searchGroup(groupPrefix);
      setOptions(groups);
    }
    catch (e) {
      setAlert({ severity: "error", message:  e.toString() });
    }
  };

  const saveGroup = async (group) => {
    try {
      console.log('saveGroup')
      console.log('group', group)

      let groupToAdd = { userName: user.sAMAccountName, group: group.samAcountName }
      const response = await apis.addGroup(groupToAdd);
      console.log('response', response)
      setInputValue(null)
      setValue(null)
      setUser({ ...user, groups: [...user.groups, group.samAcountName] })
      setAlert({ severity: 'success', message: response.log });
    }
    catch (e) {
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
    console.log('dialog ', dialog)
    console.log('value', groupToAdd)
    console.log('handleAdd')
    saveGroup(groupToAdd)


    setDialog([false, '']);
  };

  const handleChange = (event, value, reason) => {
    console.log('value', value)
    console.log('handleChange')
    console.log('dialog ', dialog)

    if (reason === "select-option") {
      console.log('reason', reason);
      setGroupToAdd(value);
      setDialog([true, `אישור הוספת קבוצה ${value.name}`]);

    }
  }



  return (
    <div>
      <Snackbar open={alert.severity != ""} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Controls.Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Controls.Alert>
      </Snackbar>
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

      <Controls.AlertDialogSlide
        open={dialog[0]}
        title={dialog[1]}
        buttonName="אשר"
        handleClose={handleClose}
        // input={{ placeHolder: "New Display Name", value: newDisplayName }}
        handleClick={handleAdd}
      />
    </div>
  );
}
