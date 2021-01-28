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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useSelector, useDispatch } from "react-redux";
import { switchTo, selectHome,changeTab } from "../features/home/homeSlice";

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
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
function SideNavbar() {
  const page = useSelector(selectHome);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(changeTab(newValue))
  };
  return (
    <Tabs
    orientation="vertical"
    variant="scrollable"
    value={value}
    onChange={handleChange}
    aria-label="Vertical tabs example"
    className={classes.tabs}
  >
    <Tab label="Item One" {...a11yProps(0)} />
    <Tab label="Item Two" {...a11yProps(1)} />
    <Tab label="Item Three" {...a11yProps(2)} />
    <Tab label="Item Four" {...a11yProps(3)} />
  </Tabs>
  );
}

export default SideNavbar;
