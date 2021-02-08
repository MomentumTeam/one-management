import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import Grid from '@material-ui/core/Grid';
import { Autorenew } from '@material-ui/icons';
import styles from './style.module.css';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        direction: 'rtl',
        width: '100%',
        height: '100%'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));
function UserManagement() {
    const classes = useStyles();
    const [post, setPost] = useState({})
    const submit = (e) => {
        e.preventDefault()
        console.log(e)
    }
    //   const handleChange = (event) => {
    //     setPost(event.target.value);
    //   };

    return (
        <div className={styles.gridContainer}>
            <div className={styles.search}>
                <Paper component="form" onSubmit={submit} className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="חיפוש משתמש"
                        inputProps={{ 'aria-label': 'חיפוש משתמש' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
            <div className={styles.password}><Paper className={classes.root}></Paper></div>
            <div className={styles.userDisplay}>
                <Paper className={classes.root}></Paper>
            </div>
            <div className={styles.mark}><Paper className={classes.root}></Paper></div>
            <div className={styles.addGroup}><Paper className={classes.root}></Paper></div>
            <div className={styles.groups}><Paper className={classes.root}></Paper></div>
            <div className={styles.users}><Paper className={classes.root}></Paper></div>
        </div>
    );
}

export default UserManagement