import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    const handleInputChange = e => {
        const { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm = () => {
        setValues(initialValues);
    }

    return {
        values,
        handleInputChange,
        resetForm

    }
}

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "10%"
    }
}))

export function Form(props) {
    const classes = useStyles();
    const { children, ...other } = props;

    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
};