import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Controls from '../Controls';
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../UseForm';

import CONFIG from '../../config.json';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        width: "70%",
        height: "70%",
        background: 'linear-gradient( #e6e6e6 90%, teal 10%)',
    },
}));

const initialFValues = {
    searchType: '',
    input: '',
}

function BitLocker() {
    const classes = useStyles();
    const [password, setPassword] = useState('');

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialFValues);

    const handleSubmit = e => {
        e.preventDefault()
        setPassword("Liora123");
        window.alert("good Job!")
        resetForm()
    }

    const onReset=()=>{
        resetForm();
        setPassword("");
    }

    return (
        <div className={classes.root}>
            <Paper elevation={20} classes={{ root: classes.paper }}>
                <h1>BitLocker Password</h1>
                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center">
                        <Grid item xs={6}>
                            <Controls.RadioGroup
                                name="searchType"
                                label=""
                                value={values.searchType}
                                onChange={handleInputChange}
                                items={CONFIG.bitLockerItems}
                            />
                            <Controls.Input
                                name="input"
                                label=""
                                value={values.input}
                                onChange={handleInputChange}
                            />
                            <div>
                                <Controls.Button
                                    type="submit"
                                    text="submit" />
                                <Controls.Button
                                    text="Reset"
                                    // color="default"
                                    onClick={onReset} />
                            </div>
                            <h4>סיסמא: {password} </h4>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
        </div >
    )
}

export default BitLocker;

