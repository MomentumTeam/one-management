import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Star from "../../components/Star";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AddToHistory, updateHistory } from "../user/userSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    minHeight: 150,
    background: "linear-gradient( #e6e6e6 90%, teal 10%)",
  },
  media: {
    height: 140,
  },
});

function ApplicationList({ applicationList }) {
  const classes = useStyles();
  console.log("applicationList: ", applicationList);
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: 20, padding: 30 }}>
      <Grid container spacing={4} justify="center">
        {applicationList.map((application) => (
          <Grid item key={application.id}>
            <Card className={classes.root}>
              <Star item={application}></Star>
              <CardActionArea
                onClick={() => {
                  dispatch(AddToHistory(application.id));
                  dispatch(updateHistory());
                }}
                className={classes.root}
                component={Link}
                to={`/application/${application.name}`}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {application.displayName}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions></CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ApplicationList;
