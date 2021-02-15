import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import { Alert, AlertTitle } from "@material-ui/lab";
import apis from "../api/applicationsApi";
import { Snackbar } from '@material-ui/core';
import Controls from "./Controls";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ChangeDisplayName({ user, loadUser }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');
    const classes = useStyles();
    const [alert, setAlert] = useState([false, '', '']);  //Alert- [true/false, "severity" ,"message"]
    const [dialog, setDialog] = useState([false, '']);  //dialog- [true/false, "content"]

    const handleCloseAlert = (event, reason) => {
        setAlert([false, '', '']);
    };

    const onChange = (e) => {
        setNewDisplayName(e.target);
    };

    const handleSubmit = () => {
        console.log("handleSubmit")
        try {
            // const response = await apis.setNewDisplayName(newDisaplyName);
            // if (response.status) {
            // setAlert([true, "success", res.log]);
            // loadUser();
            // }

            setAlert([true, "success", "good"]);
        }
        catch (e) {
            if (e.response && e.response.data) {
                setAlert([true, "error", e.response.data]);
            }
            else {
                setAlert([true, "error", e.toString()]);
            }
        }
        setDialog([false, '']);
    };

    const handleClose = () => {
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
            <Snackbar open={alert[0]} autoHideDuration={10000} onClose={handleCloseAlert}>
                <Controls.Alert onClose={handleCloseAlert} severity={alert[1]}>
                    {alert[2]}
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

            <Controls.AlertDialogSlide
                open={dialog[0]}
                title={dialog[1]}
                content=""
                buttonName="סגור"
                handleClose={handleClose}
                input={[true, "New Display Name"]}
                handleClick={handleSubmit}
                onChange={onChange}

            />
        </div>
    );
}
