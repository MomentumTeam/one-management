import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Controls from '../Controls';
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../UseForm';
import styles from "./style.module.css";

import CONFIG from '../../config.json';
import apis from '../../api/applicationsApi';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "70%",
        height: "70%",
        background: 'linear-gradient( #e6e6e6 90%, teal 10%)'

    },
}));

const initialValues = {
    macAddress: '',
    location: '',
    vlan: '',
}

function Vlan() {
    const classes = useStyles();
    const [locationOptions, setLocationOptions] = useState([]);

    useEffect(async () => {
        const options = await apis.getLocationOptions();
        setLocationOptions(options);
    }, []);

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialValues);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await apis.updateVlan(values.macAddress, values.location, values.vlan);
        window.alert(res.data.message)
        resetForm()
    }


    return (
        <Paper elevation={20} classes={{ root: classes.paper }}>
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
    )
}

export default Vlan
