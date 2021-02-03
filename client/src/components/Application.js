import React, { lazy, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectAll } from "../features/application/ApplicationSlice";
import ApplicationList from "../features/application/ApplicationList";
import styles from './applicationsViews/style.module.css';
const importView = component =>
  lazy(() =>
    import(`./applicationsViews/${component}`).catch(() =>
      import(`./applicationsViews/NullView`)
    )
  );

function Application({ match }) {
  const { applicatinId } = match.params;
  const [view, setView] = useState();

  useEffect(() => {
     function loadView() {
          const View = importView(applicatinId);
          return <View/>;
    }
    const el = loadView();
    setView(el)
  }, [match.params.applicatinId]);
  return (
    <React.Suspense fallback='Loading views...'>
      <div className={styles.container}>{view}</div>
    </React.Suspense>
  );
}

export default Application;