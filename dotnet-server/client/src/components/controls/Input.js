import React from 'react'
import { TextField } from '@material-ui/core';
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';


const theme = createMuiTheme({
    palette: {
        primary: teal,
    },
    direction: 'rtl',
});

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5),
        backgroundColor: "white"
    }
}));

export default function Input(props) {
    const classes = useStyles();
    const { name, label, value, onChange } = props;

    return (
        <ThemeProvider theme={theme}>
            <TextField
                required
                label={label}
                value={value}
                onChange={onChange}
                variant="outlined"
                classes={{ root: classes.root }}
                name={name}
            />
        </ThemeProvider>
    )
}
