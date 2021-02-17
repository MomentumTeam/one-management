import React, { useState } from "react";
import { Snackbar, Button, CircularProgress } from "@material-ui/core";
import Controls from "./Controls";
import apis from "../api/applicationsApi";


export default function ChangeDisplayName({ user, loadUser }) {
    const [loading, setLoading] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [alert, setAlert] = useState({ severity: '', message: '' });  //Alert- [true/false, "severity" ,"message"]
    const [dialog, setDialog] = useState([false, '']);  //dialog- [true/false, "content"]

    const handleCloseAlert = (event, reason) => {
        setAlert({ severity: '', message: '' });
    };

    const onChange = (e) => {
        setNewDisplayName(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await apis.changeDisplayName(user.name, user.dispalyName);

            if (response.status) {
                setAlert({ severity: 'success', message: response.log });
                loadUser();
            }
        }
        catch (e) {
            if (e.response && e.response.data) {
                setAlert({ severity: "error", message: e.response.data });
            }
            else {
                setAlert({ severity: "error", message: e.toString() });
            }
        }
        setNewDisplayName('');
        setDialog([false, '']);
    };

    const handleClose = () => {
        setNewDisplayName('');
        setDialog([false, '']);
    };

    const handelClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        setDialog([true, 'שינוי Display Name']);
        setLoading(false);
    };

    return (
        <div>
            <Snackbar open={alert.severity != ""} autoHideDuration={5000} onClose={handleCloseAlert}>
                <Controls.Alert onClose={handleCloseAlert} severity={alert.severity}>
                    {alert.message}
                </Controls.Alert>
            </Snackbar>
            <Button
                variant="outlined"
                onClick={handelClick}
                color="primary"
                fullWidth
                disabled={!user}
            >
                Unlock
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            </Button>
            <Controls.DialogSlide
                open={dialog[0]}
                title={dialog[1]}
                buttonName="שנה"
                handleClose={handleClose}
                input={{ placeHolder: "New Display Name", value: newDisplayName }}
                handleClick={handleSubmit}
                onChange={onChange}
            />
        </div>
    );
}
