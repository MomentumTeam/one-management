import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { selectAll } from "../features/application/ApplicationSlice";
import { useSelector } from "react-redux";
import { AlternateEmailTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
    outlinedInput: {
        width: "30%",
        float: "right",
        backgroundColor: "white",
        marginRight: "4%",
    },
    outlinedInputFocused: {

    },
    optionsLabel: {
        fontWeight: "bold",
        color: "black"
    }
});

export default function Search() {
    const classes = useStyles();
    const applications = useSelector(selectAll);
    let history = useHistory();

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
            const app = applications.find(app => app.displayName == value)
            const path = `${app.type}/${app.name}`;
            history.push(path);

        }
    };


    return (
        <Autocomplete
            id="grouped-demo"
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.displayName}
            classes={{
                root: classes.outlinedInput,
                focused: classes.outlinedInputFocused,
                groupLabel: classes.optionsLabel
            }}
            renderInput={(params) =>
                <TextField {...params} placeholder="Search..." variant="outlined" onKeyUp={search}
                />}
        />
    );
}


// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
//     { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
//     { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
//     { title: 'Forrest Gump', year: 1994 },
//     { title: 'Inception', year: 2010 },
//     { title: 'Toy Story 3', year: 2010 },
//     { title: 'Logan', year: 2017 },
//     { title: 'Full Metal Jacket', year: 1987 },
//     { title: 'Dangal', year: 2016 },
//     { title: 'The Sting', year: 1973 },
//     { title: '2001: A Space Odyssey', year: 1968 },
//     { title: "Singin' in the Rain", year: 1952 },
//     { title: 'Toy Story', year: 1995 },
//     { title: 'Bicycle Thieves', year: 1948 },
//     { title: 'The Kid', year: 1921 },
//     { title: 'Inglourious Basterds', year: 2009 },
//     { title: 'Snatch', year: 2000 },
//     { title: '3 Idiots', year: 2009 },
//     { title: 'Monty Python and the Holy Grail', year: 1975 },
// ];