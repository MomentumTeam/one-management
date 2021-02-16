import React, { useState } from 'react';
import { Grid, Snackbar, Paper, } from '@material-ui/core';
import Controls from '../Controls';
import { useForm, Form } from '../UseForm';
import apis from '../../api/applicationsApi';
import styles from "./style.module.css";

const initialValues = {
    computerName: '',
}

function LAPS() {
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ severity: '', message: '' });  //Alert- [true/false, "severity" ,"message"]

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialValues);

    const handleCloseAlert = (event, reason) => {
        setAlert({ severity: '', message: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const input = values.computerName;
        if (!input || !input.replace(/\s/g, '').length) {
            setAlert([true, "error", "Value cannot be empty!"]);
        }
        else {
            try {
                const res = await apis.getLapsPassword(input);
                if (res.status) {
                    setPassword(res.log);
                    setAlert({ severity: 'success', message: res.log });
                }
                else {
                    setAlert({ severity: 'error', message: res.log });
                }
            }
            catch (e) {
                setAlert({ severity: "error", message: e.toString() });
            }
        }
        resetForm()
    }

    const onReset = () => {
        resetForm();
        setPassword("");
    }

    return (
        <div className={styles.rootDiv}>
            <Snackbar open={alert.severity != ""} autoHideDuration={5000} onClose={handleCloseAlert}>
                <Controls.Alert onClose={handleCloseAlert} severity={alert.severity}>
                    {alert.message}
                </Controls.Alert>
            </Snackbar>
            <Paper elevation={24} classes={{ root: styles.paper }} >
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
        </div>
    )
}

export default LAPS;

