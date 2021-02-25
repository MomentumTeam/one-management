import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
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
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ severity: "", message: "" });
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
        const type = "computerName";
        const input = values.input;
        if (!input || !input.replace(/\s/g, '').length) {
            setOpenAlert(true);
            setAlert({ severity: 'error', message: "Value cannot be empty!" });
        }
        else {
            try {
                setLoading(true);
                const response = await apis.getBitLockerPassword(type, input);

                if (response.status === true) {
                    setPassword(response.log);
                    setOpenAlert(true);
                    setAlert({ severity: 'success', message: response.log });
                }
                else {
                    setOpenAlert(true);
                    setAlert({ severity: "error", message: e.response.data });
                }
            }
            catch (e) {
                setOpenAlert(true);
                setAlert({ severity: "error", message: e.toString() });
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
                                    text="submit"
                                    disabled={loading} />
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

