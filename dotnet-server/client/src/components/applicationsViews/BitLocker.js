import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Controls from '../Controls';
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../UseForm';
import styles from "./style.module.css";

import apis from '../../api/applicationsApi';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        height: "100%",
        background: 'linear-gradient( #e6e6e6 90%, teal 10%)'
    },
}));

const initialValues = {
    searchType: '',
    input: '',
}

function BitLocker() {
    const classes = useStyles();
    const [password, setPassword] = useState('');

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialValues);

    const handleSubmit = async (e) => {
        // const type = CONFIG.bitLockerItems.find((item) => item.id == values.searchType).title;
        e.preventDefault()
        const type = "computerName";
        const input = values.input;
        if(!input || !input.replace(/\s/g, '').length){
            window.alert("Value cannot be empty!");
        }
        else{
            try{
                const res = await apis.getBitLockerPassword(type, input);
                if(res.status == true){
                    setPassword(res.log);
                }
                else{
                    window.alert(res.log);
                }
            }
            catch(e){
                window.alert(e.toString())
            }
        }
        resetForm()
    }

    const onReset = () => {
        resetForm();
        setPassword("");
    }

    return (
        // <div className={classes.root}>
        <Paper elevation={20} classes={{ root: classes.paper }}>
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
        // </div >
    )
}

export default BitLocker;

