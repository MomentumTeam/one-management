import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues) {

    const [values, setValues] = useState(initialFValues);

    const handleInputChange = e => {
        const { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm = () => {
        setValues(initialFValues);
    }


    return {
        values,
        handleInputChange,
        resetForm

    }
}


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "",
        height: "50%",
        width: "50%",    
        marginTop: "5%",
        display: "inline-block",
        position: "relative",

    }

}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    console.log('props: ', props);

    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
};