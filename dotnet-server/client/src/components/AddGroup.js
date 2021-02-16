import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import apis from "../api/applicationsApi";
import { isNull } from "lodash";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AddGroup({ user, setUser }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(options[0]);
  const loading = open && options.length === 0;

  const fetchGropus = async (groupPrefix) => {
    setOpen(true);
    try{
      const groups = await apis.searchGroup(groupPrefix);
      setOptions(groups);
    }
    catch(e){
      window.alert(e.toString());
    }    
  };

  const saveGroup = async (group) => {
    try{
      let groupToAdd = {userName: user.sAMAccountName, group: group.samAcountName}
      const resp = await apis.addGroup(groupToAdd);
      setInputValue(null)
      setValue(null)
      setUser({...user, groups: [...user.groups, group.samAcountName]})
    }
    catch(e){
      window.alert(e.toString());
    }    
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue.length > 2) {
      fetchGropus(newInputValue);
    }
  };

  const  handleChange = (event, value, reason) => {
    if(reason === "select-option"){
        saveGroup(value)
    }
  }



  return (
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
    renderInput={(params) => (
      <TextField
        {...params}
        label="Asynchronous"
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
  );
}
