import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import logo from "../img/logo.png";
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Star , History, Category} from '@material-ui/icons';

const ListItem = withStyles({
  root: {
    textAlign:"right",
    "&$selected": {
      backgroundColor: "white",
      color: "black"
    },
    "&$selected:hover": {
      backgroundColor: "gray",
      color: "white"
    },
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    }
  },
  selected: {}
})(MuiListItem);
const ruotes = [
  {
    name: "הכל",
    link: "/",
    icon: <Star />
  },
  {
    name: "מועדפים",
    link: "/favorites",
    icon: <Star />
},
{
  name: "היסטוריה",
  link: "/history",
  icon: <History />
},
{
  name: "קטגוריות",
  link: "/catogries",
  icon: <Category />
},
{
  name: "FAQ",
  link: "/faq",
  icon: <Star />
},
]

function SideNavbar() {

  return (
      <div>
        <img src={logo} style={{width: "50%"}} />
        <List component="nav" aria-label="main mailbox folders">
          {ruotes.map((ruote) => {
             return  <ListItem button component={NavLink} exact to={ruote.link} activeStyle={{backgroundColor:"white", color:"black"}}>
             <ListItemText primary={ruote.name} />
              {ruote.icon} 
           </ListItem>
          })}
      </List>
      </div>
  );
}

export default SideNavbar;
