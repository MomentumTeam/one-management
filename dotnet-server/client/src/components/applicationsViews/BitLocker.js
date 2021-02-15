import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Snackbar,Paper } from '@material-ui/core';
import Controls from '../Controls';
import { useForm, Form } from '../UseForm';
import apis from '../../api/applicationsApi';
import styles from "./style.module.css";

const initialValues = {
    searchType: '',
    input: '',
}

function BitLocker() {
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState([false, '', '']);  //Alert- [true/false, "severity" ,"message"]

    const {
        values,
        handleInputChange,
        resetForm
    } = useForm(initialValues);

    const handleCloseAlert = (event, reason) => {
        setAlert([false, '', '']);
    };

    const handleSubmit = async (e) => {
        // const type = CONFIG.bitLockerItems.find((item) => item.id == values.searchType).title;
        e.preventDefault()
        const type = "computerName";
        const input = values.input;
        if (!input || !input.replace(/\s/g, '').length) {
            setAlert([true, "error", "Value cannot be empty!"]);
        }
        else {
            try {
                const res = await apis.getBitLockerPassword(type, input);
                if (res.status) {
                    setPassword(res.log);
                    setAlert([true, "success", res.log]);
                }
                else {
                    setAlert([true, "error", res.log]);
                }
            }
            catch (e) {
                setAlert([true, "error", e.toString()]);
            }
        }
        resetForm()
    }

    const onReset = () => {
        resetForm();
        setPassword("");
    }

    return (
        <div className={styles.rootDiv}>
            <Snackbar open={alert[0]} autoHideDuration={10000} onClose={handleCloseAlert}>
                <Controls.Alert onClose={handleCloseAlert} severity={alert[1]}>
                    {alert[2]}
                </Controls.Alert>
            </Snackbar>
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
        </div >
    )
}

export default BitLocker;

