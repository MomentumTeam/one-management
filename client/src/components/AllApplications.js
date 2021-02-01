import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAll } from "../features/application/ApplicationSlice";

import ApplicationList from "../features/application/ApplicationList";
function AllApplications({ match }) {
  const applications = useSelector(selectAll);
  return (
    <div>
      <ApplicationList applicationList={applications} />
    </div>
  );
}

export default AllApplications;