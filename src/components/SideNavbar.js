import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import StarIcon from "@material-ui/icons/Star";
import CategoryIcon from "@material-ui/icons/Category";
import HelpIcon from "@material-ui/icons/Help";
import Kermit from "../img/kermit.png";
import { useSelector, useDispatch } from "react-redux";
import { switchTo, selectHome } from "../features/home/homeSlice";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "50%",
    height: "50%",
  },

  root: {
    // width: "100%",
    // height: "100%",
    // maxWidth: 150,
    backgroundColor: "red",
    direction: "rtl",
  },
}));

function SideNavbar() {
  const page = useSelector(selectHome);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClick = (page) => {
    console.log("input page: ", page);
    dispatch(switchTo(page));
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <img className={classes.img} src={Kermit}></img>
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem
        button
        onClick={() => {
          handleClick("favorites");
        }}
      >
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="מועדפים" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          handleClick("history");
        }}
      >
        <ListItemIcon>
          <QueryBuilderIcon />
        </ListItemIcon>
        <ListItemText primary="היסטוריה" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          handleClick("categories");
        }}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="קטגוריות" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          handleClick("faq");
        }}
      >
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="FAQ" />
      </ListItem>
    </List>
  );
}

export default SideNavbar;
