import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectAll } from "./ApplicationSlice";
import Star from "../../components/Star";
import { selectFavorites, AddToFavorites, RemoveFromFavorites } from "../user/userSlice";

function ApplicationList({ applicationList }) {
  // applicationList = applicationList || useSelector(selectAll);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  let star;

  return (
    <div style={{ marginTop: 20, padding: 30 }}>
      <Grid container spacing={4} justify="center">
        {applicationList.map((application) => (
          <Grid item key={application.id}>
            <Card>
              <Star item={application}></Star>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {application.name}
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
