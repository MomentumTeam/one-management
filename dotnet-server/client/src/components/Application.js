import React, { lazy, useEffect, useState } from 'react';

const importView = component =>
  lazy(() =>
    import(`./applicationsViews/${component}`).catch(() =>
      import(`./applicationsViews/NullView`)
    )
  );

function Application({ match }) {
  const { applicationName } = match.params;
  const [view, setView] = useState();

  useEffect(() => {
    function loadView() {
      const View = importView(applicationName);
      return <View />;
    }

    const viewToDisplay = loadView();
    setView(viewToDisplay)

  }, [match.params.applicationName]);

  return (
    <React.Suspense fallback="">
      <div className='container' style={{ width: "100%", height: "100%", fontSize: "large" }}>
        {view}
      </div>
    </React.Suspense>
  );
}

export default Application;