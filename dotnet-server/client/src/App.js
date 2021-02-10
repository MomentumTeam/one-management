import React, { useEffect } from "react";
import SideNavbar from "./components/SideNavbar";
import Faq from "./components/Faq";
import Favorites from "./components/Favorites";
import History from "./components/History";
import Categories from "./components/Categories";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import background from './img/background.jpg';
import Header from "./components/Header";
import { selectUserObj, selectLoading } from "./features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./features/user/userSlice";
import AllApplications from "./components/AllApplications";
import Application from "./components/Application";


import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: 'rtl',
});

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (loading) {
    return <div>Waiting for user</div>;
  }
  else {
    return (
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          <div className="App" >
            <Router>
              <div class="grid-container">
                <div class="Header">
                  <Header />
                </div>
                <div class="SideNavBar" >
                  {" "}
                  <SideNavbar />
                </div>
                <div class="Content"
                  style={{
                    backgroundImage: `url(${background})`
                  }}
                >
                  <Switch>
                    <Route exact path="/" component={AllApplications} />
                    <Route exact path="/favorites" component={Favorites} />
                    <Route exact path="/history" component={History} />
                    <Route exact path="/categories/:categorieId" component={Categories} />
                    <Route exact path="/application/:applicationName" component={Application} />
                    <Route exact path="/faq" component={Faq} />
                    <Redirect to="/" />
                  </Switch>
                </div>
                <div class="Footer"></div>
              </div>
            </Router>
          </div>
        </StylesProvider>
      </ThemeProvider>
    );
  }
}

export default App;
