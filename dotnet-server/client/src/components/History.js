import React from "react";
import { useSelector } from "react-redux";
import { selectHistory } from "../features/application/ApplicationSlice";
import ApplicationList from "../features/application/ApplicationList";

function History({ match }) {
  const applications = useSelector(selectHistory);

  return (
    <div style={{ marginTop: 20, padding: 30, alignSelf: "flex-start" }}>
      <ApplicationList applicationList={applications} />
    </div>
  );
}

export default History;
