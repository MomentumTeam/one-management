import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Controls from '../Controls';
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../UseForm';

import apis from '../../api/applicationsApi';

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
    computerName: '',
}

function LAPS() {
    const classes = useStyles();
    const [password, setPassword] = useState('');

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialFValues);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const input = values.computerName;
        if(!input || !input.replace(/\s/g, '').length){
            window.alert("Value cannot be empty!");
        }
        else{
            try{
                const res = await apis.getLapsPassword(input);
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

    const onReset=()=>{
        resetForm();
        setPassword("");
    }

    return (
        <div className={classes.root}>
            <Paper elevation={24} classes={{ root: classes.paper }} >
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
                                    text="Submit" />
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
        </div >
    )
}

export default LAPS;

