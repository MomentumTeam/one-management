import React, { useState } from 'react';
import { Grid, Snackbar, Paper } from '@material-ui/core';
import styles from "./style.module.css";
import Controls from '../Controls';
import { useForm, Form } from '../UseForm';
import apis from '../../api/applicationsApi';

const initialValues = {
    searchType: '',
    input: '',
}

function BitLocker() {
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ severity: '', message: '' }); 

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialValues);

    const handleCloseAlert = (event, reason) => {
        setAlert({ severity: '', message: '' });
    };

    const handleSubmit = async (e) => {
        // const type = CONFIG.bitLockerItems.find((item) => item.id == values.searchType).title;
        e.preventDefault()
        const type = "computerName";
        const input = values.input;
        if (!input || !input.replace(/\s/g, '').length) {
            setAlert([true, "error", "Value cannot be empty!"]);
        }
        else {
            try {
                const response = await apis.getBitLockerPassword(type, input);
                if (response.status) {
                    setPassword(response.log);
                    setAlert({ severity: 'success', message: response.log });
                }
                else {
                    setAlert({ severity: "error", message: e.response.data });
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
            <Paper elevation={20} classes={{ root: styles.paper }}>
                <h1>BitLocker Password</h1>
                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center">
                        <Grid item xs={6}>
                            <Controls.Input
                                name="input"
                                label="שם מחשב"
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

