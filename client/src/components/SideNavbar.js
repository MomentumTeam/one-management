import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import StarIcon from "@material-ui/icons/Star";
import CategoryIcon from "@material-ui/icons/Category";
import HelpIcon from "@material-ui/icons/Help";
import logo from "../img/logo.png";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useSelector, useDispatch } from "react-redux";
import { switchTo, selectHome, changeTab } from "../features/home/homeSlice";

import Faq from "./Faq";
import Favorites from "./Favorites";
import Catogries from "./Catogries";
import History from "./History";

import { Link, Route, BrowserRouter, Switch } from "react-router-dom";

const useStyles = makeStyles({
  img: {
    width: "100%",
  },
  tabs: {
    marginTop: "10%",
  },
  iconLabelWrapper: {
    flexDirection: "row-reverse",
    fontSize: "large",
  },
  indicator: {
    left: "0px",
    backgroundColor: "white",
  },
  active_tabStyle: {
    color: "black",
    backgroundColor: "white",
  },
});

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function SideNavbar() {
  const page = useSelector(selectHome);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(changeTab(newValue));
  };
  return (
    <BrowserRouter>
      <div>
        <img src={logo} className={classes.img} />
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          classes={{
            root: classes.tabs,
            indicator: classes.indicator,
          }}
        >
          <Tab
            classes={{
              wrapper: classes.iconLabelWrapper,
              selected: classes.active_tabStyle,
            }}
            icon={<StarIcon />}
            label="מועדפים"
            {...a11yProps(0)}
            component={Link}
            to="/one"
          />
          <Tab
            classes={{
              wrapper: classes.iconLabelWrapper,
              selected: classes.active_tabStyle,
            }}
            icon={<QueryBuilderIcon />}
            label="היסטוריה"
            {...a11yProps(1)}
            component={Link}
            to="/two"
          />
          <Tab
            classes={{
              wrapper: classes.iconLabelWrapper,
              selected: classes.active_tabStyle,
            }}
            icon={<CategoryIcon />}
            label="קטגוריות"
            {...a11yProps(2)}
            component={Link}
            to="/three"
          />
          <Tab
            classes={{
              wrapper: classes.iconLabelWrapper,
              selected: classes.active_tabStyle,
            }}
            icon={<HelpIcon />}
            label="FAQ"
            {...a11yProps(3)}
            component={Link}
            to="/four"
          />
        </Tabs>

        <Switch>
          <Route path="/one" component={Favorites} />
          <Route path="/two" component={History} />
          <Route path="/three" component={Catogries} />
          <Route path="/four" component={Faq} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default SideNavbar;
