import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Grid, Paper } from '@material-ui/core';
import styles from "./style.module.css";
import { selectConfig } from "../../features/config/configSlice";
import Controls from '../Controls';
import { useForm, Form } from '../UseForm';
import apis from '../../api/applicationsApi';

const initialValues = {
    macAddress: '',
    location: '',
    vlan: '',
}

function Vlan() {
    const CONFIG = useSelector(selectConfig);
    const [locationOptions, setLocationOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ severity: '', message: '' });
    const [openAlert, setOpenAlert] = useState(false);

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialValues);

    const handleCloseAlert = (event, reason) => {
        setOpenAlert(false);
    };

    useEffect(async () => {
        try {
            setLoading(true);
            const options = await apis.getLocationOptions();
            setLocationOptions(options);
        }
        catch (e) {
            if (e.response && e.response.data) {
                setOpenAlert(true);
                setAlert({ severity: 'error', message: e.response.data });
            }
            else {
                setOpenAlert(true);
                setAlert({ severity: 'error', message: e.toString() });
            }
        }
        setLoading(false);

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await apis.updateVlan(values.macAddresponses, values.location, values.vlan);

            if (response.status === true) {
                setOpenAlert(true);
                setAlert({ severity: 'success', message: response.log });
            }
            else {
                setOpenAlert(true);
                setAlert({ severity: 'error', message: response.log });
            }
        }
        catch (e) {
            if (e.response && e.response.data) {
                setOpenAlert(true);
                setAlert({ severity: "error", message: e.response.data });
            }
            else {
                setOpenAlert(true);
                setAlert({ severity: "error", message: e.toString() });
            }
        }
        setLoading(false);
        resetForm();
    }

    return (
        <div className={styles.rootDiv}>
            <Controls.Alert open={openAlert} handleCloseAlert={handleCloseAlert} alert={alert} />

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
                                    text="Submit"
                                    disabled={loading} />
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
