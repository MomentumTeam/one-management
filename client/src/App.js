import React from "react";
import SideNavbar from "./components/SideNavbar";
import Home from "./features/home/Home";
import "./App.css";
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <div class="grid-container">
        <div class="Header"><Header user={{name:"ליאורה יעקב",age:"19"}}/></div>
        <div class="SideNavBar"> <SideNavbar /></div>
        <div class="Content"><Home /></div>
        <div class="Footer"></div>
      </div>
      
    </div>
  );
}

export default App;
