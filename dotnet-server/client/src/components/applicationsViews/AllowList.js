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
        width: "100%",
        height: "100%",
        background: 'linear-gradient( #e6e6e6 90%, teal 10%)'
    },
}));

const initialFValues = {
    macAddress: ''
}

function AllowList() {
    const classes = useStyles();
    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialValues);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await apis.addMac(values.macAddress);
            window.alert(res.log);
        }
        catch(e){
            if(e.response && e.response.data){
                window.alert(e.response.data);
              }
              else{
                window.alert(e.toString());
              }
        }
        

        resetForm();
    }


    return (
        <div className={classes.root}>
            <Paper elevation={20} classes={{ root: classes.paper }}>
                <h1>Allow List</h1>
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
                </Grid>
            </Form>
        </Paper>
    )
}

export default AllowList
