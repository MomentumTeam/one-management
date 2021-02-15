import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TextField } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function AlertDialogSlide(props) {

    const { open, title, content, buttonName, handleClose, input,handleClick,onChange} = props;

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {content}
                </DialogContentText>
                {input[0] ? <TextField
                    autoFocus
                    required
                    margin="dense"
                    // id="displayName"
                    label={input[1]}
                    onChange={onChange}
                    fullWidth
                /> :null}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClick} color="primary">
                    {buttonName}
                </Button>
            </DialogActions>
        </Dialog>
    );
}