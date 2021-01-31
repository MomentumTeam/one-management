import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHistory, selectFavorites, selectUserObj, GetUser } from "./userSlice";
console.log("selectUserObj: ", selectUserObj);

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
