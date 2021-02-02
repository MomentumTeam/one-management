import React from 'react'
import { TextField } from '@material-ui/core';

import { green } from '@material-ui/core/colors';
import {
    ThemeProvider,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

export default function Input(props) {

    const { name, label, value, onChange } = props;
    return (

        <ThemeProvider theme={theme}>
            <TextField
                label={label}
                id="mui-theme-provider-outlined-input"
                value={value}
                onChange={onChange}
                variant="outlined"
                name={name}



            />
            {/* <TextField
          className={classes.margin}
          label={label}    
                variant="outlined"
          id="mui-theme-provider-outlined-input"             value={value}

          onChange={onChange}

        /> */}
        </ThemeProvider>

        // <TextField
        //     variant="outlined"
        //     label={label}
        //     name={name}
        //     value={value}
        //     onChange={onChange}

        // />
    )
}
