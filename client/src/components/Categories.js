import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "../features/application/ApplicationSlice";

import ApplicationList from "../features/application/ApplicationList";
function Categories({ match }) {
  console.log('match: ', match);
  const categories = useSelector(selectCategories);
  return (
    <div>
      <h1>categories</h1>
      <ApplicationList applicationList={categories} />
    </div>
  );
}

export default Categories;
