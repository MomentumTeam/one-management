import React from "react";
import Search from "./Search";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectUserObj } from "../features/user/userSlice";

function Header() {
  const userObj = useSelector(selectUserObj);

  return (
    <div>
      <b
        style={{
          color: "white",
          float: "left",
          paddingLeft: "5%",
          paddingTop: "1%",
        }}
      >
        שלום {userObj.name}
      </b>
      <Search />
    </div>
  );
}

export default Header;
