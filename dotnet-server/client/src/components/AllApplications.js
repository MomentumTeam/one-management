import React from "react";
import { useSelector } from "react-redux";
import { selectAll } from "../features/application/ApplicationSlice";
import ApplicationList from "../features/application/ApplicationList";


function AllApplications({ match }) {
  const applications = useSelector(selectAll);
  return (
    <div style={{ marginTop: 20, padding: 30, alignSelf: "flex-start" }}>
      <ApplicationList applicationList={applications} />
    </div>
  );
}

export default AllApplications;