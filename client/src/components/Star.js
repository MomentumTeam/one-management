import React from "react";
import { selectFavorites, AddToFavorites, RemoveFromFavorites } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

function Star({ item }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  if (item.type !== "application") {
    return null;
  } else {
    const star = favorites.includes(item.id) ? (
      <StarIcon
        onClick={() => {
          dispatch(RemoveFromFavorites(item.id));
        }}
      />
    ) : (
      <StarBorderIcon
        onClick={() => {
          dispatch(AddToFavorites(item.id));
        }}
      />
    );
    return star;
  }
}

export default Star;
