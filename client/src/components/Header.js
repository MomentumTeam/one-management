import React from "react";
import Search from "./Search";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectUserObj } from "../features/user/userSlice";

const useStyles = makeStyles({
  root: {
    color: "white",
    width: "10%",
    float: "right",
    fontSize: "150%",
  },
});

function Header() {
  const userObj = useSelector(selectUserObj);
  const classes = useStyles();

  return (
    <div>
      <b
        style={{
          color: "white",
          float: "left",
          paddingLeft: "5%",
          paddingTop: "2%",
        }}
      >
        שלום {userObj.name}
      </b>
      <Search />
    </div>
  );
}

export default Header;
