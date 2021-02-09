import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(255, 255,255, 0)",
  },
}));
export default function LinkedBox({ isLinked }) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <FormControlLabel
        disabled={!isLinked}
        control={<Checkbox checked={isLinked} color="primary" />}
        label="מקושרת תיבה"
      />
    </Paper>
  );
}
