import React, { useEffect } from "react";
import SideNavbar from "./components/SideNavbar";
import Faq from './components/Faq';
import Favorites from './components/Favorites';
import Catogries from './components/Catogries';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from "./components/Header";
import { selectUserObj, selectLoading } from "./features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch();
  const userObj = useSelector(selectUserObj);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (loading) {
    return <div>Waiting for user</div>;
  }

  if (JSON.stringify(userObj) === "{}") {
    return (
      <Router>
        <Switch>
          <Redirect to="/api/login" />
        </Switch>
      </Router>
    );
  } else {
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
}

export default App;
