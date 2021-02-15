import React from "react";
import { useSelector } from "react-redux";
import { selectByCategorie } from "../features/application/ApplicationSlice";

import ApplicationList from "../features/application/ApplicationList";
function Categories({ match }) {
  const { categorieId } = match.params;
  const applications = useSelector(selectByCategorie(categorieId));

  return (
    <div>
      <ApplicationList applicationList={applications} />
    </div>
  );
}

export default Categories;
