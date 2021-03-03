import React from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Slide, TextField
} from '@material-ui/core';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogSlide(props) {

    const { open, title, content, buttonName, handleClose, input, handleClick, onChange } = props;

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content ?
                    <DialogContentText>
                        {content}
                    </DialogContentText> : null
                }
                {input ? <TextField
                    autoFocus
                    required
                    margin="dense"
                    value={input.value}
                    label={input.placeHolder}
                    onChange={onChange}
                    fullWidth
                /> : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClick} color="primary">
                    {buttonName}
                </Button>
            </DialogActions>
        </Dialog>
    );
}