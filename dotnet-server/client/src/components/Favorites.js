import React from "react";
import { useSelector } from "react-redux";
import { selectFavorites } from "../features/application/ApplicationSlice";

import ApplicationList from "../features/application/ApplicationList";
function Favorites({ match }) {
  const favorites = useSelector(selectFavorites);
  return (
    <div>
      <h1>Favorites</h1>
      <ApplicationList applicationList={favorites} />
    </div>
  );
}

export default Favorites;
