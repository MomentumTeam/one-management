import React, { useState, useEffect } from 'react';
import { Grid, Snackbar, Paper } from '@material-ui/core';
import { useForm, Form } from '../UseForm';
import Controls from '../Controls';
import apis from '../../api/applicationsApi';
import styles from "./style.module.css";
import CONFIG from '../../config.json';

const initialValues = {
    macAddress: '',
    location: '',
    vlan: '',
}

function Vlan() {
    const [locationOptions, setLocationOptions] = useState([]);
    const [alert, setAlert] = useState([false, "", ""]);  //Alert- [true/false, "severity" ,"message"]

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialValues);

    useEffect(async () => {
        try {
            const options = await apis.getLocationOptions();
            setLocationOptions(options);
        }
        catch (e) {
            if (e.response && e.response.data) {
                setAlert([true, "error", e.response.data]);
            }
            else {
                setAlert([true, "error", e.toString()]);
            }
        }
    }, []);

    const handleCloseAlert = (event, reason) => {
        setAlert([false, "", ""]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await apis.updateVlan(values.macAddress, values.location, values.vlan);
            if (res.status) {
                setAlert([true, "success", res.log]);
            }
            else {
                setAlert([true, "error", res.log]);
            }
        }
        catch (e) {
            if (e.response && e.response.data) {
                setAlert([true, "error", e.response.data]);
            }
            else {
                setAlert([true, "error", e.toString()]);
            }
        }
        resetForm();
    }

    return (
        <div className={styles.rootDiv}>
            <Snackbar open={alert[0]} autoHideDuration={10000} onClose={handleCloseAlert}>
                <Controls.Alert onClose={handleCloseAlert} severity={alert[1]}>
                    {alert[2]}
                </Controls.Alert>
            </Snackbar>
            <Paper elevation={20} classes={{ root: styles.paper }}>
                <h1>הכנסה ושינוי Vlan</h1>
                <Form onSubmit={handleSubmit} >
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center">
                        <Grid item xs={6} >
                            <Controls.Input
                                name="macAddress"
                                label="כתובת Mac"
                                value={values.macAddress}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={6} >
                            <Controls.Select
                                name="location"
                                label="מיקום"
                                value={values.location}
                                onChange={handleInputChange}
                                options={locationOptions}
                            />
                      
                            <Controls.Select
                                name="vlan"
                                label="Vlan"
                                value={values.vlan}
                                onChange={handleInputChange}
                                options={CONFIG.vlanOptions}
                            />
                        </Grid>
                        <Grid item xs={6} >
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

export default Vlan
