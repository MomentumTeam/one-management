import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAll } from "../features/application/ApplicationSlice";

import ApplicationList from "../features/application/ApplicationList";
function Application({ match }) {

    console.log(match)
//   const applications = useSelector(selectAll);
  return (
    <div>
      <h1>application {match.params.applicatinId}</h1>
      {/* <ApplicationList applicationList={applications} /> */}
    </div>
  );
}

export default Application;