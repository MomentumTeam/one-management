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
    textAlign: "center",
    direction: 'rtl', 

});


export default function Input(props) {

    const { name, label, placeHolder, value, onChange } = props;
    return (
        <ThemeProvider theme={theme}>
            <TextField
                required
                placeholder={placeHolder}
                // label={label}
                id="mui-theme-provider-outlined-input"
                value={value}
                onChange={onChange}
                variant="outlined"
                name={name}
            />
        </ThemeProvider>
    )
}
