import React from "react";
import { useSelector } from "react-redux";
import { selectByCategorie } from "../features/application/ApplicationSlice";
import ApplicationList from "../features/application/ApplicationList";


function Categories({ match }) {
  const { categorieId } = match.params;
  console.log('categorieId', categorieId)
  const applications = useSelector(selectByCategorie(categorieId));
  console.log('applications', applications)

  return (
    <div style={{ marginTop: 20, padding: 30, alignSelf: "flex-start" }}>
      <ApplicationList applicationList={applications} />
    </div>
  );
}

export default Categories;
