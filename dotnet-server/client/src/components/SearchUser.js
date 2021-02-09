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

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(event, newValue);
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    //newInputValue.length > 2 ? setOpen(true) : setOpen(false)

    //TODO get users for autocomplete
    if (newInputValue.length > 2) {
      fetchUsers(newInputValue);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(domain, value);
    //TODO get user
    setUser(value);
  };

  const fetchUsers = async (string) => {
    setOpen(true);
    const response = await fetch(
      "https://country.register.gov.uk/records.json?page-size=5000"
    );
    const countries = await response.json();
    setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
  };

  return (
    <div>
      <div>
        <form onSubmit={submit} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={7}>
              <Autocomplete
                open={open}
                // onOpen={() => {
                //    // setOpen(true);
                // }}
                onClose={() => {
                  setOpen(false);
                }}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
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
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  רשת
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  label="רשת"
                  fullWidth
                >
                  {domains.map((domain) => (
                    <MenuItem key={domain.value} value={domain.value}>
                      {domain.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <IconButton
                type="submit"
                variant="filled"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
