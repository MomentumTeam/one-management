import React, { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import Controls from "./Controls";
import apis from "../api/applicationsApi";


export default function ChangeDisplayName({ user, loadUser }) {
    const [loading, setLoading] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [dialog, setDialog] = useState({ open: false, title: '' });
    const [alert, setAlert] = useState({ severity: '', message: '' });
    const [openAlert, setOpenAlert] = useState(false);

    const handleCloseAlert = (event, reason) => {
        setOpenAlert(false);
    };

    const onChange = (e) => {
        setNewDisplayName(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await apis.changeDisplayName(user.name, user.dispalyName);

            if (response.status) {
                setOpenAlert(true);
                setAlert({ severity: 'success', message: response.log });
                loadUser();
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
        setNewDisplayName('');
        setDialog({ open: false, title: '' });
    };

    const handleClose = () => {
        setNewDisplayName('');
        setDialog({ open: false, title: '' });
    };

    const handelClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        setDialog({ open: true, title: 'שינוי Display Name' });
        setLoading(false);
    };

    return (
        <div>
            <Controls.Alert open={openAlert} handleCloseAlert={handleCloseAlert} alert={alert} />

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
                open={dialog.open}
                title={dialog.title}
                buttonName="שנה"
                handleClose={handleClose}
                input={{ placeHolder: "New Display Name", value: newDisplayName }}
                handleClick={handleSubmit}
                onChange={onChange}
            />
        </div>
    );
}
