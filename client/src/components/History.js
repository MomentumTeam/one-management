import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectHistory
  } from '../features/application/ApplicationSlice';
  import ApplicationList from "../features/application/ApplicationList"
function History({match}) {
    const applications = useSelector(selectHistory);

    return (
        <div>
            <h1>history </h1>
            {applications.map((item ) => item.name)}
            <ApplicationList applicationList={applications}/>
        </div>
    )
}

export default History
