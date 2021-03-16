import React, { useEffect, useState } from 'react';
import "../App.css";
import BitLocker from "./applicationsViews/BitLocker";
import LAPS from "./applicationsViews/LAPS";
import UserManagement from "./applicationsViews/UserManagement";
import AllowList from "./applicationsViews/AllowList";

function Application({ match }) {
  const { applicationName } = match.params;
  const [view, setView] = useState();

  useEffect(() => {
    function loadView() {
      let View;

      switch (applicationName) {
        case "BitLocker":
          View = BitLocker;
          break;
        case "LAPS":
          View = LAPS;
          break;
        case "UserManagement":
          View = UserManagement;
          break;
        case "AllowList":
          View = AllowList;
          break;
      }

      return <View />;
    }

    const viewToDisplay = loadView();
    setView(viewToDisplay)

  }, [match.params.applicationName]);

  return (
    <div className="applicationPaperContainer">
      {view}
    </div>
  );
}

export default Application;