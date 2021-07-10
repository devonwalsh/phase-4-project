import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const NavBar = props => {

    const handleLogout = () => {
        fetch('/logout', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        props.manageLogout()
    }

    if (props.loggedIn) {
        return (
            <Menu>
                <Menu.Item as={NavLink} to="/recipientlist">Your Giftees</Menu.Item>
                <br/>
                <Menu.Item as={NavLink} to="/" onClick={() => handleLogout()}>Log Out</Menu.Item>
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