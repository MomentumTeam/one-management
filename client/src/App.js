import React from "react";
import SideNavbar from "./components/SideNavbar";
import Home from "./features/home/Home";
import "./App.css";
import Header from './components/Header';
import History from './components/History';
import Faq from './components/Faq';
import Favorites from './components/Favorites';
import Catogries from './components/Catogries';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <div class="grid-container">
        <div class="Header"><Header user={{name:"ליאורה יעקב",age:"19"}}/></div>
        <div class="SideNavBar"> <SideNavbar /></div>
        <div class="Content">
        <Switch>
          <Route exact path="/" component={Favorites} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/history" component={History} />
          <Route exact path="/catogries" component={Catogries} />
          <Route exact path="/faq" component={Faq} />
          <Redirect to="/" />
        </Switch>
          </div>
        <div class="Footer"></div>
      </div>
      </Router>
    </div>
  );
}

export default App;
