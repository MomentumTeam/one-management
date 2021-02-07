import React from 'react';
import { useHistory,useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles ,ThemeProvider,createMuiTheme, } from '@material-ui/core/styles';
import { selectAll } from "../features/application/ApplicationSlice";
import { useSelector } from "react-redux";
import { teal } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    outlinedInput: {
        width: "30%",
        backgroundColor: "white",
        margin: theme.spacing(2),
    },
    
}));

const theme = createMuiTheme({
    palette: {
        primary: teal,
    },
    direction: 'rtl',
});

export default function Search() {
    const classes = useStyles();
    const applications = useSelector(selectAll);
    let history = useHistory();
    const location = useLocation();

    const options = applications.map((option) => {
        const firstLetter = option.displayName[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    const search = (e) => {
        const value = e.target.value;
        if (e.keyCode === 13) {
            const app = applications.find(app => app.displayName == value);
            const path = `/${app.type}/${app.name}`;
            if (path != location.pathname) {
                history.push(path);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Autocomplete
                id="grouped-demo"
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.displayName}
                classes={{
                    root: classes.outlinedInput,
                    // focused: classes.outlinedInputFocused,
                }}
                renderInput={(params) =>
                    <TextField {...params}
                        placeholder="חפש..."
                        variant="outlined"
                        onKeyUp={search}
                        classes={{ root: classes.outlinedInputFocused }}
                    />}
            />
        </ThemeProvider>
    );
}