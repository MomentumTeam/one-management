import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from 'react-redux';
import {
    selectAll
  } from './ApplicationSlice';
  import { Link } from "react-router-dom";
function ApplicationList({applicationList}) {

  return (
    <div style={{ marginTop: 20, padding: 30 }}>
      <Grid container spacing={4} justify="center">
        {applicationList.map(application => (
          <Grid item key={application.id}>
            <Card>
              <CardActionArea component={Link}  to={`/application/${application.name}`}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {application.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ApplicationList;
