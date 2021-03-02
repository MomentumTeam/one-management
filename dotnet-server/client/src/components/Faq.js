import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import {
    Accordion, AccordionSummary, AccordionDetails, Typography, Button, IconButton, Dialog, DialogActions,
    DialogContent, DialogTitle, Slide, TextField,
    List, ListItem, ListItemText
} from '@material-ui/core';
import { selectUserObj } from "../features/user/userSlice";
import { AddToFAQ, RemoveFromFAQ } from "../features/config/configSlice";
import { selectConfig, selectFAQ } from "../features/config/configSlice";
import apis from "../api/applicationsApi";
import Controls from "./Controls";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '60%',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10%",
        fontSize: "200%",
        alignSelf: "flex-start"
    },
    question: {
        fontSize: "70%",
    },
    answer: {
        fontSize: "60%",
    },
    expanded: {
        backgroundColor: "black",
        color: "white",
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(15),
        right: theme.spacing(20),
    },
    ListItem: {
        backgroundColor: "white",
        fontSize: "60%",
    },
    icon: {
        color: "teal",
    },
    editFab: {
        color: "white",
        backgroundColor: "teal",
        "&:hover": {
            backgroundColor: "#1b6767",
        },
    }
}));



function Faq() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const FAQ = useSelector(selectFAQ);
    const user = useSelector(selectUserObj);
    const CONFIG = useSelector(selectConfig);
    const hideSpeedDial = CONFIG.editors.includes(user.userId);
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [toAdd, setToAdd] = useState({ question: "", answer: "" });
    const [toDelete, setToDelete] = useState("");
    const [dialog, setDialog] = useState({ open: false, title: "", content: "" });

    //Dialog Functions
    const onChangeQuestion = (e) => {
        setToAdd({ question: e.target.value, answer: toAdd.answer });
    };

    const onChangeAnswer = (e) => {
        setToAdd({ question: toAdd.question, answer: e.target.value });
    };

    const handleClose = () => {
        setToDelete("");
        setToAdd({ question: "", answer: "" });
        setDialog({ open: false, title: "", content: "" });
    };

    const add = async () => {
        const obj = { Question: toAdd.question, Answer: toAdd.answer }

        const response = await apis.addToFaq(obj)
        toAdd.id = response.log;

        if (response.status === true) {
            dispatch(AddToFAQ(toAdd));
        }

        handleClose();
    }

    const openRemoveDialog = (question) => {
        setToDelete(question);
        setDialog({ open: true, title: `אשר מחיקת שאלה:`, content: question.question });
    }

    const removeQA = async () => {

        const response = await apis.removeFromFaq(toDelete.id);

        if (response.status === true) {
            dispatch(RemoveFromFAQ(toDelete));
        }
        handleClose();
    };

    //speedDial Functions
    const handleOpenSpeedDial = () => {
        setOpenSpeedDial(true);
    };
    const handleCloseSpeedDial = () => {
        setOpenSpeedDial(false);
    };

    //speedDial- actions
    const handleAdd = (e) => {
        e.preventDefault();
        setDeleteMode(false);
        setDialog({ open: true, title: 'הוסף שאלה ותשובה', content: "" });
    };

    const handleRemove = (e) => {
        e.preventDefault();
        setDeleteMode(true);
    };

    const actions = [
        { icon: <SpeedDialIcon />, name: 'Add Q&A', action: handleAdd },
        { icon: <DeleteIcon />, name: 'Delete Q&A', action: handleRemove },
    ];

    return (
        <div className={classes.root}>
            {deleteMode ?
                <div>
                    <List>
                        {FAQ.map((question) => (
                            <ListItem divider={true} className={classes.ListItem}>
                                <IconButton edge="end" aria-label="delete" onClick={() => openRemoveDialog(question)}>
                                    <DeleteIcon className={classes.icon} />
                                </IconButton>
                                <ListItemText primary={question.question} />
                            </ListItem>))}
                    </List>
                    <Controls.Button
                        text="צא ממצב מחיקה"
                        onClick={() => setDeleteMode(false)} />
                    <Controls.DialogSlide
                        open={dialog.open}
                        title={dialog.title}
                        content={dialog.content}
                        buttonName="אשר"
                        handleClose={handleClose}
                        handleClick={removeQA}
                    />
                </div>
                :
                <div>
                    {FAQ.map((question) => (
                        <Accordion >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                classes={{ expanded: classes.expanded }}
                            >
                                <Typography className={classes.question}>{question.question}</Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.answer}>
                                    {question.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    <Dialog
                        open={dialog.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                    >
                        <DialogTitle>{dialog.title}</DialogTitle>
                        <DialogContent>

                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                value={toAdd.question}
                                label={"שאלה"}
                                onChange={onChangeQuestion}
                                fullWidth
                            />
                            <TextField
                                multiline
                                autoFocus
                                required
                                margin="dense"
                                value={toAdd.answer}
                                label={"תשובה"}
                                onChange={onChangeAnswer}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={add} color="primary">
                                הוסף
                    </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }

            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                classes={{ fab: classes.editFab }}
                hidden={!hideSpeedDial}
                icon={<EditIcon />}
                onClose={handleCloseSpeedDial}
                onOpen={handleOpenSpeedDial}
                open={openSpeedDial}
                color="red"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={(e) => {
                            action.action(e);
                        }} />
                ))}
            </SpeedDial>

        </div>
    )
}

export default Faq
