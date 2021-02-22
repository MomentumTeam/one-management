import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { StylesProvider, jssPreset, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import "./App.css";
import background from './img/background.jpg';
import { selectLoading, getUser } from "./features/user/userSlice";
import { getConfig, selectConfig } from "./features/config/configSlice";
import { Init, selectAll } from "./features/application/ApplicationSlice";
import Header from "./components/Header";
import SideNavbar from "./components/SideNavbar";
import AllApplications from "./components/AllApplications";
import Favorites from "./components/Favorites";
import History from "./components/History";
import Categories from "./components/Categories";
import Application from "./components/Application";
import Faq from "./components/Faq";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: 'rtl',
});

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const config = useSelector(selectConfig);
  const applications = useSelector(selectAll);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getConfig());
  }, []);

  if (loading || !config || Object.keys(config).length ===0 || !applications || applications.length ===0) {
    return <div>Waiting for user/config</div>;
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
                    backgroundImage: `url(${background}`
                  }}
                >
                  <Switch>
                    <Route exact path="/" component={AllApplications} />
                    <Route exact path="/favorites" component={Favorites} />
                    <Route exact path="/history" component={History} />
                    <Route exact path="/categories/:categorieId" component={Categories} />
                    <Route exact path="/application/:applicationName" component={Application} />
                    <Route exact path="/faq" component={Faq}/>
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
