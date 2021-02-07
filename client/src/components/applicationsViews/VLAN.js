import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Controls from '../Controls';
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../UseForm';

import CONFIG from '../../config.json';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        width: "70%",
        height: "70%",
        background: 'linear-gradient( #e6e6e6 90%, teal 10%)'

    },
}));

const initialFValues = {
    macAddress:'',
    location: '',
    vlan: '',
}

function Vlan() {
    const classes = useStyles();

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialFValues);

    const handleSubmit = e => {
        e.preventDefault()
        window.alert("vlan שונה בהצלחה")
        resetForm()
    }


    return (
        <div className={classes.root}>
            <Paper elevation={20} classes={{ root: classes.paper }}>
                <h1>הכנסה ושינוי Vlan</h1>
                <Form onSubmit={handleSubmit} style={{ backgroundColor: "", }}>
                    <Grid container style={{ backgroundColor: "", }}
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center">
                        <Grid item xs={6} style={{ backgroundColor: "" }} >
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
                                options={CONFIG.locationOptions}
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
        </div>
    )
}

export default Vlan
