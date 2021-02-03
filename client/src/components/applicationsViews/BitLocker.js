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

    const items = [
        { id: '1', title: 'KeyID' },
        { id: '2', title: 'שם מחשב' },
    ];

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
                                items={items}
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
                                    text="שלח" />
                                {/* <Controls.Button
                                    text="אפס"
                                    color="default"
                                    onClick={resetForm} /> */}
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

