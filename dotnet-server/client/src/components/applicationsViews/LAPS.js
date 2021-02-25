import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import styles from "./style.module.css";
import Controls from '../Controls';
import { useForm, Form } from '../UseForm';
import apis from '../../api/applicationsApi';

const initialValues = {
    computerName: '',
}

function LAPS() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
    const [openAlert, setOpenAlert] = useState(false);

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialValues);

    const handleCloseAlert = (event, reason) => {
        setOpenAlert(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const input = values.computerName;
        if (!input || !input.replace(/\s/g, '').length) {
            setOpenAlert(true);
            setAlert({ open: true, severity: 'error', message: "Value cannot be empty!" });
        }
        else {
            try {
                setLoading(true);
                const response = await apis.getLapsPassword(input);
                
                if (response.status === true) {
                    setPassword(response.log);
                    setOpenAlert(true);
                    setAlert({ open: true, severity: 'success', message: response.log });
                }
                else {
                    setOpenAlert(true);
                    setAlert({ open: true, severity: 'error', message: response.log });
                }
            }
            catch (e) {
                setOpenAlert(true);
                setAlert({ open: true, severity: "error", message: e.toString() });
            }
        }
        setLoading(false);
        resetForm();
    }

    const onReset = () => {
        resetForm();
        setPassword("");
    }

    return (
        <div className={styles.rootDiv}>
            <Controls.Alert open={openAlert} handleCloseAlert={handleCloseAlert} alert={alert} />

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
                                    text="Submit"
                                    disabled={loading} />
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

