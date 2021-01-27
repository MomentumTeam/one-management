import React from "react";
import { useSelector } from "react-redux";
import { selectHome } from "./homeSlice";

function Home() {
  const homeState = useSelector(selectHome);
  return (
    <div>
      <h1>{homeState.page}</h1>
    </div>
  );
}

export default Home;
