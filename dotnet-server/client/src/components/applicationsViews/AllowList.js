import React, { useState } from 'react';
import { Grid, Snackbar, Paper } from '@material-ui/core';
import styles from "./style.module.css";
import Controls from '../Controls';
import { useForm, Form } from '../UseForm';
import apis from '../../api/applicationsApi';

const initialValues = {
    macAddress: ''
}

function AllowList() {
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
        e.preventDefault();
        try {
            const response = await apis.addMac(values.macAddress);
            setAlert({ severity: 'success', message: response.log });
        }
        catch (e) {
            if (e.response && e.response.data) {
                setAlert({ severity: "error", message: e.response.data });
            }
            else {
                setAlert({ severity: "error", message: e.toString() });
            }
        }
        resetForm();
    }

    return (
        <div className={styles.rootDiv}>
            <Snackbar open={alert.severity != ""} autoHideDuration={5000} onClose={handleCloseAlert}>
                <Controls.Alert onClose={handleCloseAlert} severity={alert.severity}>
                    {alert.message}
                </Controls.Alert>
            </Snackbar>
            <Paper elevation={20} classes={{ root: styles.paper }}>
                <h1>Allow List</h1>
                <Form onSubmit={handleSubmit}>
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center">
                        <Grid item xs={6}  >
                            <Controls.Input
                                name="macAddress"
                                label="כתובת Mac"
                                value={values.macAddress}
                                onChange={handleInputChange}
                            />
                            <div>
                                <Controls.Button
                                    type="submit"
                                    text="Submit" />
                                <Controls.Button
                                    text="Reset"
                                    // color="default"
                                    onClick={resetForm} />
                            </div>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
        </div>
    )
}

export default AllowList;
