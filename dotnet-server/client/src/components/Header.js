import React from "react";
import { useSelector } from "react-redux";
import { selectUserObj } from "../features/user/userSlice";
import Search from "./Search";

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
        {userObj.userId}
      </b>
      <Search />
    </div>
  );
}

export default Header;
