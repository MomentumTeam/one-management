import React, { useEffect } from "react";
import SideNavbar from "./components/SideNavbar";
import Home from "./features/home/Home";
import "./App.css";
import Header from "./components/Header";
import { selectUserObj, selectLoading } from "./features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Redirect, BrowserRouter } from "react-router-dom";
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
      <BrowserRouter>
        <Switch>
          <Redirect to="/api/login" />
        </Switch>
      </BrowserRouter>
    );
  } else {
    return (
      <div className="App">
        <div class="grid-container">
          <div class="Header">
            <Header />
          </div>
          <div class="SideNavBar">
            {" "}
            <SideNavbar />
          </div>
          <div class="Content">
            <Home />
          </div>
          <div class="Footer"></div>
        </div>
      </div>
    );
  }
}

export default App;
