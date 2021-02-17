import React from "react";
import { useSelector } from "react-redux";
import { selectUserObj } from "./userSlice";

function User() {
  const userObj = useSelector(selectUserObj);

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
        {userObj.name}
      </b>
    </div>
  );
}

export default User;
