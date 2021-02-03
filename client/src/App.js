import React, { useEffect } from "react";
import SideNavbar from "./components/SideNavbar";
import Faq from "./components/Faq";
import Favorites from "./components/Favorites";
import History from "./components/History";
import Categories from "./components/Categories";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header";
import { selectUserObj, selectLoading } from "./features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./features/user/userSlice";
import AllApplications from "./components/AllApplications";
import Application from "./components/Application";
import Cookies from 'js-cookie';


function App() {
  const dispatch = useDispatch();
  // const userObj = useSelector(selectUserObj);
  const loading = useSelector(selectLoading);
  const cookie = Cookies.get('SignInSecret');

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (loading) {
    return <div>Waiting for user</div>;
  }

  if (!cookie) {
    window.location = "http://localhost:4000/api/login";
  } else {
    return (
      <div className="App">
        <Router>
          <div class="grid-container">
            <div class="Header">
              <Header />
            </div>
            <div class="SideNavBar" >
              {" "}
              <SideNavbar />
            </div>
            <div class="Content" style={{
              backgroundImage: `url("https://coloringhome.com/coloring/dc8/xXk/dc8xXknBi.png")`
            }}>
              <Switch>
                <Route exact path="/" component={AllApplications} />
                <Route exact path="/favorites" component={Favorites} />
                <Route exact path="/history" component={History} />
                <Route exact path="/categories/:categorieId" component={Categories} />
                <Route exact path="/application/:applicatinId" component={Application} />
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
}

export default App;
