import React from 'react'
import { TextField } from '@material-ui/core';

import { teal } from '@material-ui/core/colors';
import {
    ThemeProvider,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: teal,
    },
    direction: 'rtl',
});

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5),
        backgroundColor:"white"
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
                id="mui-theme-provider-outlined-input"
                value={value}
                onChange={onChange}
                variant="outlined"
                classes={{ root: classes.root }}
                name={name}
            />
        </ThemeProvider>
    )
}
