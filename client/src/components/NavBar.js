import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = props => {
    if (props.loggedIn) {
        return (
            <div>
                <Link to="/logout">Log Out</Link>
            </div>
        )
    }
    else {
        return (
            <div>
                <Link to="/login">Log In</Link>
                <br/>
                <Link to="/signup">Sign Up</Link>
            </div>
        )
    }
}

export default NavBar;