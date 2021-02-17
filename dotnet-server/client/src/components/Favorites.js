import React from "react";
import { useSelector } from "react-redux";
import { selectFavorites } from "../features/application/ApplicationSlice";
import ApplicationList from "../features/application/ApplicationList";

function Favorites() {
  const favorites = useSelector(selectFavorites);

  return (
    <div style={{ marginTop: 20, padding: 30, alignSelf: "flex-start" }}>
      <ApplicationList applicationList={favorites} />
    </div>
  );
}

export default Favorites;
