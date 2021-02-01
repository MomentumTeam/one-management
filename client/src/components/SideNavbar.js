import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Route } from "react-router-dom";
import logo from "../img/logo.png";
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Star, History, Category } from "@material-ui/icons";
import HelpIcon from "@material-ui/icons/Help";
import HomeIcon from "@material-ui/icons/Home";

const ListItem = withStyles({
  root: {
    textAlign: "right",
    "&$selected": {
      backgroundColor: "white",
      color: "black",
    },
    "&$selected:hover": {
      backgroundColor: "gray",
      color: "white",
    },
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
  selected: {},
})(MuiListItem);

const routes = [
  {
    name: "הכל",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    name: "מועדפים",
    link: "/favorites",
    icon: <Star />,
  },
  {
    name: "היסטוריה",
    link: "/history",
    icon: <History />,
  },
  {
    name: "קטגוריות",
    link: "/categories",
    icon: <Category />,
  },
  {
    name: "FAQ",
    link: "/faq",
    icon: <HelpIcon />,
  },
];

function SideNavbar() {
  return (
    <div>
      <img src={logo} style={{ width: "50%" }} />
      <List component="nav" aria-label="main mailbox folders">
        {routes.map((route) => {
          return (
            <ListItem button component={NavLink} exact to={route.link} activeStyle={{ backgroundColor: "white", color: "black" }}>
              <ListItemText primary={route.name} />
              {route.icon}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default SideNavbar;
