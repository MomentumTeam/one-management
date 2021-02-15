import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Controls from '../Controls';
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../UseForm';

import apis from '../../api/applicationsApi';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        height: "100%",
        background: 'linear-gradient( #e6e6e6 90%, teal 10%)'
    },
}));

const initialValues = {
    computerName: '',
}

function LAPS() {
    const classes = useStyles();
    const [password, setPassword] = useState('');

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialValues);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const computerName = values.computerName;
        const res = await apis.getLapsPassword(computerName);
        setPassword(res.data.password);
        resetForm();
    }

    const onReset = () => {
        resetForm();
        setPassword("");
    }

    return (
        <Paper elevation={24} classes={{ root: classes.paper }} >
            <h1>Local Admin Password</h1>
            <Form onSubmit={handleSubmit}>
                <Grid container spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center">
                    <Grid item xs={6}>
                        <Controls.Input
                            name="computerName"
                            label="שם מחשב"
                            value={values.computerName}
                            onChange={handleInputChange}
                        />
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            <Controls.Button
                                text="Reset"
                                // color="default"
                                onClick={onReset} />
                        </div>
                    </Grid>
                    <h4>סיסמא: {password} </h4>
                </Grid>
            </Form>
        </Paper>
    )
}

export default LAPS;

