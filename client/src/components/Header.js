import React from 'react'
import Search from './Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        color: 'white',
        width: "10%",
        float: "right",
        fontSize: "150%"
    }
});

function Header(props) {

    const classes = useStyles();

    return (
        <div>
            <b style={{
                color: 'white', float: "left",
                paddingLeft: "5%", paddingTop: "2%"
            }}>
                {props.user.name}
            </b>
            <Search />
        </div>
    )
}

export default Header
