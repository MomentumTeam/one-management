import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { teal } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2.5),
        backgroundColor: "white"
    },
}))

const theme = createMuiTheme({
    palette: {
        primary: teal,
    },
    direction:"rtl"


});

export default function Select(props) {
    const classes = useStyles();
    const { name, label, value, onChange, options } = props;

    return (
        <ThemeProvider theme={theme}>
            <FormControl variant="outlined" style={{ minWidth: 120 }} classes={{ root: classes.root}}>
                <InputLabel>{label}</InputLabel>
                <MuiSelect
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}>
                    <MenuItem value="">None</MenuItem>
                    {
                        options.map(
                            item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                        )
                    }
                </MuiSelect>
            </FormControl>
        </ThemeProvider>

    )
}
