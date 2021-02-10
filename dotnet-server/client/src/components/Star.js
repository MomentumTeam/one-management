import React from "react";
import { selectFavorites, AddToFavorites, RemoveFromFavorites, updateHistory, updateFavorites } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

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
          console.log("clicked on star to add to favorites");
          dispatch(RemoveFromFavorites(item.id));
          dispatch(updateFavorites(favorites));
        }}
      />
    ) : (
        <StarBorderIcon
          onClick={() => {
            console.log("clicked on star to add to favorites");
            dispatch(AddToFavorites(item.id));
            dispatch(updateFavorites(favorites));
          }}
        />
      );

    return star;
  }
}

export default Star;
