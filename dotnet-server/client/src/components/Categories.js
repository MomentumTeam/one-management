import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectByCategorie } from "../features/application/ApplicationSlice";

import ApplicationList from "../features/application/ApplicationList";
function Categories({ match }) {
  const { categorieId } = match.params;
  const applications = useSelector(selectByCategorie(categorieId));
  console.log(applications)
  return (
    <div>
      <h1>categories</h1>
      <ApplicationList applicationList={applications} />
    </div>
  );
}

export default Categories;
