import React, { lazy, useEffect, useState } from 'react';
import "../App.css";
import AllowList from "./applicationsViews/AllowList";
import BitLocker from "./applicationsViews/BitLocker";
import LAPS from "./applicationsViews/LAPS";
import NullView from "./applicationsViews/NullView";
import UserManagement from "./applicationsViews/UserManagement";
import VLAN from "./applicationsViews/VLAN";
import styles from "./applicationsViews/style.module.css";


function Application({ match }) {
  const { applicationName } = match.params;
  const [view, setView] = useState();

  useEffect(() => {
    function loadView() {
      let View;

      switch (applicationName) {
        case "AllowList":
          View = AllowList;
          break;
        case "BitLocker":
          View = BitLocker;
          break;
        case "LAPS":
          View = LAPS;
          break;
        case "NullView":
          View = NullView;
          break;
        case "UserManagement":
          View = UserManagement;
          break;
        case "VLAN":
          View = VLAN;
          break;
        default:
          View = NullView;
      }

      return <View />;
    }

    const viewToDisplay = loadView();
    setView(viewToDisplay)

  }, [match.params.applicationName]);
  console.log('styles', styles)
  return (
    <div className="applicationPaperContainer">
      {view}
    </div>
  );
}

export default Application;