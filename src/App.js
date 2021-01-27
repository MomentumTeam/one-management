import React from "react";
import SideNavbar from "./components/SideNavbar";
import Home from "./features/home/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <SideNavbar />
      <Home />
    </div>
  );
}

export default App;
