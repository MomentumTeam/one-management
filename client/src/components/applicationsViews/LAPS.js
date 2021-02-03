import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Controls from '../Controls';
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../UseForm';

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: "blue",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        direction: "rtl"
    },
    paper: {
        backgroundColor: "#D0D0D0",
        width: "70%",
        height: "70%",
        background: 'linear-gradient( #e6e6e6 90%, teal 10%)'

    },

}));

const initialFValues = {
    input: '',
}

function LAPS() {
    const classes = useStyles();

    const [password, setPassword] = useState('');


    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialFValues);


    const handleSubmit = e => {
        e.preventDefault()
        setPassword("12345689");
        window.alert("good Job!");
    }

    return (
        <div className={classes.root}>
            <Paper elevation={24} classes={{ root: classes.paper }} >
                <h1>Local Admin Password</h1>
                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center">
                        <Grid item xs={6}>
                            <Controls.Input
                                name="input"
                                label="שם מחשב"
                                placeHolder="שם מחשב"
                                value={values.input}
                                onChange={handleInputChange}
                            />
                            <div>
                                <Controls.Button
                                    type="submit"
                                    text="Submit" />
                                {/* <Controls.Button
                                    text="Reset"
                                    color="default"
                                    onClick={resetForm} /> */}
                            </div>
                        </Grid>
                        <h4>סיסמא: {password} </h4>
                    </Grid>
                </Form>
            </Paper>
        </div >
    )
}

export default LAPS;

