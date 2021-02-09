import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { Star, History, Category, DesktopWindows, PermIdentity, Email } from "@material-ui/icons";
import HelpIcon from "@material-ui/icons/Help";
import HomeIcon from "@material-ui/icons/Home";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Route } from "react-router-dom";
import oneAmanLogo2 from "../img/oneAmanLogo2.png";

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
    children: [
      {
        name: "ניהול משתמש",
        id: "a",
        icon: <PermIdentity />,
        link: "/categories/a",
      },
      {
        name: "ניהול עמדה",
        id: "b",
        icon: <DesktopWindows />,
        link: "/categories/b",
      },
      {
        name: "הרשאות ומידור",
        id: "d",
        icon: <DesktopWindows />,
        link: "/categories/d",
      },
      {
        name: "ניהול מייל",
        id: "e",
        icon: <Email />,
        link: "/categories/e",
      },
    ],
  },
  {
    name: "FAQ",
    link: "/faq",
    icon: <HelpIcon />,
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    // // maxWidth: 360,
    // color: "white",
    // // backgroundColor: theme.palette.background.paper,
    // // "&$selected": {
    // //   backgroundColor: "white",
    // //   color: "black"
    // // },
    // // "&$selected:hover": {
    // //   backgroundColor: "red",
    // //   color: "white"
    // // }
  },
  icon: {
    color: 'teal',
    // // "&:hover": {
    // //   color: "black",
    // // },
  },
  nested: {
    paddingLeft: theme.spacing(5)
  }
}));

const ListItem = withStyles({
  root: {
    // color: "white",
    "&$selected": {
      backgroundColor: "pink",
      color: "black",
    },
    "&$selected:hover": {
      backgroundColor: "gray",
      color: "white",
    },
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      "&$icon": {
        color: "red"
      }
    },
  },
  nested: {
    paddingRight: '20%',
  },
  selected: {},
})(MuiListItem);

export default function SideNavbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>

      <img src={oneAmanLogo2} style={{ width: "50%", marginTop: "10%" }} />

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        {routes.map((route, index) => {
          return (
            <div>
              {!route.children ? <ListItem button component={NavLink} key={index} exact to={route.link} activeStyle={{ backgroundColor: "white", color: "black" }}>
                <ListItemIcon className={classes.icon}>
                  {route.icon}
                </ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItem> :
                <>
                  <ListItem button onClick={handleClick}>
                    <ListItemIcon className={classes.icon}>
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText primary={route.name} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="nav" disablePadding>
                      {route.children.map((route, index) => {
                        return (
                          <ListItem button className={classes.nested} component={NavLink} key={index} exact to={route.link} activeStyle={{ backgroundColor: "white", color: "black" }}>
                            <ListItemIcon className={classes.icon}>
                              {route.icon}
                            </ListItemIcon>
                            <ListItemText primary={route.name} />
                          </ListItem>
                        )
                      })}
                    </List>
                  </Collapse>
                </>
              }

            </div>
          );
        })}
      </List>
    </div>
  );
}

