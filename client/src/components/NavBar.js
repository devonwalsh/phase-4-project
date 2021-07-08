import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const NavBar = props => {
    if (props.loggedIn) {
        return (
            <Menu>
                <Menu.Item as={NavLink} to="/logout">Log Out</Menu.Item>
            </Menu>
        )
    }
    else {
        return (
            <Menu>
                <Menu.Item as={NavLink} to="/login">Log In</Menu.Item>
                <br/>
                <Menu.Item as={NavLink} to="/signup">Sign Up</Menu.Item>
            </Menu>
        )
    }
}

export default NavBar;