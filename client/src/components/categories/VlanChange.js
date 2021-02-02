import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Controls from '../Controls';
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../UseForm';

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: "blue",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",  
        direction:"rtl"    
    },
    paper: {
        backgroundColor: "#D0D0D0",
        width: "70%",
        height: "70%",
    },
}));

const initialFValues = {
    macAddress: '',
    location: '',
    vlan: '',

}

  const vlanOptions = [
        { id: '1', title: 'Development' },
        { id: '2', title: 'Marketing' },
        { id: '3', title: 'Accounting' },
        { id: '4', title: 'HR' },
    ];

    const locationOptions = [
        { id: '1', title: 'A' },
        { id: '2', title: 'B' },
        { id: '3', title: 'C' },
        { id: '4', title: 'D' },
    ];

function VlanChange() {
    const classes = useStyles();

  

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialFValues);

    const handleSubmit = e => {
        e.preventDefault()
        window.alert("good Job!")
        resetForm()
    }

    return (
        <div className={classes.root}>
            <Paper elevation={20} classes={{ root: classes.paper }}>
                <h1>הכנסה ושינוי Vlan</h1>
                <Form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Controls.Input
                                name="macAddress"
                                label="macAddress"
                                value={values.macAddress}
                                onChange={handleInputChange}
                            />
                            <Controls.Select
                                name="location"
                                label="Location"
                                value={values.location}
                                onChange={handleInputChange}
                                options={locationOptions}
                            />
                            <Controls.Select
                                name="vlan"
                                label="Vlan"
                                value={values.vlan}
                                onChange={handleInputChange}
                                options={vlanOptions}
                            />
                            <div>
                                <Controls.Button
                                    type="submit"
                                    text="Submit" />
                                <Controls.Button
                                    text="Reset"
                                    color="default"
                                    onClick={resetForm} />
                            </div>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
        </div>
    )
}

export default VlanChange
