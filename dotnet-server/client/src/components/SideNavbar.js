import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { List, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import { Star, History, Category, DesktopWindows, PermIdentity, ExpandMore, ExpandLess } from "@material-ui/icons";
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import RssFeedOutlinedIcon from '@material-ui/icons/RssFeedOutlined';
import HelpIcon from "@material-ui/icons/Help";
import HomeIcon from "@material-ui/icons/Home";
import oneAmenLogo3 from "../img/oneAmenLogo3.png";
import CONFIG from "../config.json";

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
        link: `/categories/${CONFIG.categories[0].name}`,
      },
      {
        name: "ניהול עמדה",
        id: "b",
        icon: <DesktopWindows />,
        link: `/categories/${CONFIG.categories[1].name}`,
      },
      {
        name: "ניהול רשת",
        id: "c",
        icon: <RssFeedOutlinedIcon />,
        link: `/categories/${CONFIG.categories[2].name}`,
      },
      {
        name: "הרשאות ומידור",
        id: "d",
        icon: <GroupAddOutlinedIcon />,
        link: `/categories/${CONFIG.categories[3].name}`,
      }
    ],
  },
  {
    name: "FAQ",
    link: "/faq",
    icon: <HelpIcon />,
  },
];

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'teal',
  }
}));

const ListItem = withStyles({
  root: {
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

      <img src={oneAmenLogo3} style={{ width: "70%", marginTop: "10%" }} />

      <List
        component="nav"
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
                          <ListItem button component={NavLink} key={index} exact to={route.link} activeStyle={{ backgroundColor: "white", color: "black" }}>
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

