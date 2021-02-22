import React from 'react';
import { useSelector } from "react-redux";
import { selectConfig } from "../features/config/configSlice"; 
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '60%',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10%",
        color: "pink",
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
    }
}));

function Faq() {
    const classes = useStyles();
    const CONFIG = useSelector(selectConfig);
    return (
        <div className={classes.root}>
            {CONFIG.questions.map((question) => (
                <Accordion>
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
        </div>
    )
}

export default Faq
