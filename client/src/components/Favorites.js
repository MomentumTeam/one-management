import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    selectFavorite
  } from '../features/application/ApplicationSlice';

import ApplicationList from "../features/application/ApplicationList"
function Favorites({match}) {

    const applications = useSelector(selectFavorite);
    return (
        <div>
            <h1>Favorites</h1>
            {applications.map((item ) => item.name)}
            <ApplicationList applicationList={applications}/>
        </div>
    )
}

export default Favorites
