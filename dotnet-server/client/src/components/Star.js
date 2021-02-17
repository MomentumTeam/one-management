import React from "react";
import { useSelector, useDispatch } from "react-redux";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { selectFavorites, AddToFavorites, RemoveFromFavorites, updateFavorites } from "../features/user/userSlice";


function Star({ item }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  if (item.type !== "application") {
    return null;
  }
  else {
    const star = favorites.includes(item.id) ? (
      <StarIcon
        onClick={() => {
          dispatch(RemoveFromFavorites(item.id));
          dispatch(updateFavorites(favorites));
        }}
      />
    ) : (
        <StarBorderIcon
          onClick={() => {
            dispatch(AddToFavorites(item.id));
            dispatch(updateFavorites(favorites));
          }}
        />
      );

    return star;
  }
}

export default Star;
