import React from 'react';
import { Button as MuiButton, makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { teal } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2.5),
        backgroundColor: "white"
    },
    label: {
        textTransform: 'none'
    },
}))

const theme = createMuiTheme({
    palette: {
        primary: teal,
    },
});

export default function Button(props) {
    const classes = useStyles();
    const { text, size, color, variant, onClick, ...other } = props

    return (
        <ThemeProvider theme={theme}>
            <MuiButton
                variant="outlined"
                // variant={variant || "contained"}
                size={size || "large"}
                color={color || "primary"}
                onClick={onClick}
                {...other}
                classes={{ root: classes.root, label: classes.label }}>
                {text}
            </MuiButton>
        </ThemeProvider>
    )
}
